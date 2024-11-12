import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IUpdates {
  first_name?: string;
  last_name?: string;
  password?: string;
}

const updateProfile = async (updates: IUpdates) => {
  const response = await axios.put('/users/me', updates);

  return response.data;
};

const useUpdateProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['update profile'],
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success('Update successful');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Update failed - Something went wrong'
      );
    },
  });
};

export default useUpdateProfile;
