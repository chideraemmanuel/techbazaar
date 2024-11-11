import { BillingInformationFormTypes } from '@/app/(store)/user/cart/_components/billing-information-form';
import axios from '@/config/axios';
import {
  APIErrorResponse,
  APIPaginatedResponse,
  APISuccessResponse,
} from '@/types';
import { ICart, IOrder } from '@/types/cart';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

interface Params {
  billing_information?: Partial<BillingInformationFormTypes>;
  use_saved_billing_information?: boolean;
}

const placeOrder = async ({
  billing_information,
  use_saved_billing_information,
}: Params) => {
  const url = billing_information?.save_billing_information
    ? '/users/me/orders?save_billing_information=true'
    : '/users/me/orders';

  const data = use_saved_billing_information
    ? { use_saved_billing_information }
    : { billing_information };

  console.log('data?', data);

  const response = await axios.post<APISuccessResponse<IOrder>>(url, data);

  return response.data;
};

const usePlaceOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['place order'],
    mutationFn: placeOrder,
    onSuccess: async (response) => {
      toast.success('Order placed successfully');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>> | undefined
      >('get current user cart');

      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries('get cart summary');

      if (previous_cart_data) {
        for (const page of previous_cart_data.pages) {
          const { data } = page;

          for (const cart_item of data) {
            await queryClient.invalidateQueries([
              'get cart item by product ID',
              cart_item.product._id,
            ]);
          }
        }
      }

      router.replace(`/user/orders/${response.data?._id}`);
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );
    },
  });
};

export default usePlaceOrder;
