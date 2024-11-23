import { APIErrorResponse } from '@/types';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const restoreBrand = async ({
  axios,
  id,
}: {
  axios: AxiosInstance;
  id: string;
}) => {
  const response = await axios.put<{ message: string }>(
    `/brands/${id}/restore`
  );

  return response.data;
};

const useRestoreBrand = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['restore brand'],
    mutationFn: restoreBrand,
    onSuccess: (response) => {
      toast.success('Brand restored successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to restore brand'
      );
    },
  });
};

export default useRestoreBrand;
