import { APIErrorResponse } from '@/types';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export interface IBrandData {
  name: string;
  logo?: File;
}

interface IParams {
  axios: AxiosInstance;
  data: IBrandData;
}

const addBrand = async ({ axios, data }: IParams) => {
  const response = await axios.post('/brands', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

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
