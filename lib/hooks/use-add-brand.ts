import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const addBrand = async (data: { name: string; logo?: File }) => {
  const response = await axios.post('/brands', data);

  return response.data;
};

const useAddBrand = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['add brand'],
    mutationFn: addBrand,
    onSuccess: (data) => {
      toast.success('Brand added successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error || error?.message || 'Failed to add brand'
      );
    },
  });
};

export default useAddBrand;
