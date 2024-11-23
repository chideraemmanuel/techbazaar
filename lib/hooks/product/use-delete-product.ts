import { APIErrorResponse } from '@/types';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const deleteProduct = async ({
  axios,
  id,
}: {
  axios: AxiosInstance;
  id: string;
}) => {
  const response = await axios.delete<{ message: string }>(`/products/${id}`);

  return response.data;
};

const useDeleteProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['delete product'],
    mutationFn: deleteProduct,
    onSuccess: (response) => {
      toast.success('Product deleted successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to delete product'
      );
    },
  });
};

export default useDeleteProduct;
