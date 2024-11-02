import { useMutation } from 'react-query';
import { IProductData } from './use-add-product';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { useRouter } from 'next/navigation';
import axios from '@/config/axios';
import { ProductTypes } from '@/types/product';

interface IParams {
  id: string;
  data: Partial<IProductData>;
}

const editProduct = async ({ id, data }: IParams) => {
  const response = await axios.put<APISuccessResponse<ProductTypes>>(
    `/products/${id}`,
    data
  );

  return response.data;
};

const useEditProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['edit product'],
    mutationFn: editProduct,
    onSuccess: (response) => {
      toast.success('Product updated successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to update product'
      );
    },
  });
};

export default useEditProduct;
