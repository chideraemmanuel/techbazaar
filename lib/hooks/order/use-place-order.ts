import { BillingInformationFormTypes } from '@/app/(store)/user/cart/_components/billing-information-form';
import {
  APIErrorResponse,
  APIPaginatedResponse,
  APISuccessResponse,
} from '@/types';
import { ICart, IOrder } from '@/types/cart';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

interface Params {
  axios: AxiosInstance;
  billing_information?: Partial<BillingInformationFormTypes>;
  use_saved_billing_information?: boolean;
}

const placeOrder = async ({
  axios,
  billing_information,
  use_saved_billing_information,
}: Params) => {
  const url = billing_information?.save_billing_information
    ? '/users/me/orders?save_billing_information=true'
    : '/users/me/orders';

  const data = use_saved_billing_information
    ? { use_saved_billing_information }
    : { billing_information };

  const response = await axios.post<APISuccessResponse<IOrder>>(url, data);

  return response.data;
};

const usePlaceOrder = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['place order'],
    mutationFn: placeOrder,
    onSuccess: async (response, { axios }) => {
      toast.success('Order placed successfully');

      queryClient.setQueryData(
        ['get current user cart', axios],
        // @ts-ignore
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {
          if (!previous_cart_data) return previous_cart_data;

          const clearedPages = previous_cart_data.pages.map((page) => ({
            ...page,
            data: [], // Clear all items from the data array
            pagination: {
              ...page.pagination,
              total_records: 0, // Set total_records to 0
            },
          }));

          return {
            ...previous_cart_data,
            pages: clearedPages,
          };
        }
      );

      queryClient.setQueryData(
        ['get cart summary', axios],
        // @ts-ignore
        (previous_cart_summary_data: ICartSummary | undefined) => {
          if (!previous_cart_summary_data) return previous_cart_summary_data;

          return {
            total_items: 0,
            total_amount: 0,
          };
        }
      );

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>> | undefined
      >(['get current user cart', axios]);

      await queryClient.invalidateQueries(['get current user cart', axios]);
      await queryClient.invalidateQueries(['get cart summary', axios]);

      if (previous_cart_data) {
        for (const page of previous_cart_data.pages) {
          const { data } = page;

          for (const cart_item of data) {
            await queryClient.invalidateQueries([
              'get cart item by product ID',
              cart_item.product._id,
              axios,
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
