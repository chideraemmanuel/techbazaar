import { useMutation } from 'react-query';
import { IBrandData } from './brand/use-add-brand';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { useRouter } from 'next/navigation';
import axios from '@/config/axios';
import { BrandTypes } from '@/types/product';

interface IParams {
  id: string;
  data: Partial<IBrandData>;
}

const editBrand = async ({ id, data }: IParams) => {
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
