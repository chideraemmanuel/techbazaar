import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const logoutUser = async () => {
  const response = await axios.delete<APISuccessResponse<UserTypes>>(
    '/auth/logout'
  );

  return response.data;
};

const useLogoutUser = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['logout user'],
    mutationFn: logoutUser,
    onSuccess: (data) => {
      toast.success('Logout successful');
      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Logout failed - Something went wrong'
      );
    },
  });
};

export default useLogoutUser;
