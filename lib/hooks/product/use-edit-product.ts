import { useMutation } from 'react-query';
import { IProductData } from './use-add-product';
import { toast } from 'sonner';
import { AxiosError, AxiosInstance } from 'axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { ProductTypes } from '@/types/product';

interface IParams {
  axios: AxiosInstance;
  id: string;
  data: Partial<IProductData>;
}

const editProduct = async ({ axios, id, data }: IParams) => {
  const response = await axios.put<APISuccessResponse<ProductTypes>>(
    `/products/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
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
