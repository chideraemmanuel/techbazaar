import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { AxiosError, AxiosInstance } from 'axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { BrandTypes } from '@/types/product';
import { IBrandData } from './use-add-brand';

interface IParams {
  axios: AxiosInstance;
  id: string;
  data: Partial<IBrandData>;
}

const editBrand = async ({ axios, id, data }: IParams) => {
  const response = await axios.put<APISuccessResponse<BrandTypes>>(
    `/brands/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

const useEditBrand = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['edit brand'],
    mutationFn: editBrand,
    onSuccess: (response) => {
      toast.success('Brand updated successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to update brand'
      );
    },
  });
};

export default useEditBrand;
