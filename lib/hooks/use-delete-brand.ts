import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const deleteBrand = async (id: string) => {
  const response = await axios.delete<{ message: string }>(`/brands/${id}`);

  return response.data;
};

const useDeleteBrand = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['delete brand'],
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      toast.success('Brand deleted successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to delete brand'
      );
    },
  });
};

export default useDeleteBrand;
