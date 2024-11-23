import { APIErrorResponse } from '@/types';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const restoreProduct = async ({
  axios,
  id,
}: {
  axios: AxiosInstance;
  id: string;
}) => {
  const response = await axios.put<{ message: string }>(
    `/products/${id}/restore`
  );

  return response.data;
};

const useRestoreProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['restore product'],
    mutationFn: restoreProduct,
    onSuccess: (response) => {
      toast.success('Product restored successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to restore product'
      );
    },
  });
};

export default useRestoreProduct;
