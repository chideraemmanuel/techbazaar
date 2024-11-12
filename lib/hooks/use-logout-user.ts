import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const logoutUser = async () => {
  const response = await axios.delete<APISuccessResponse<UserTypes>>(
    '/auth/logout'
  );

  return response.data;
};

const useLogoutUser = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout user'],
    mutationFn: logoutUser,
    onSuccess: async (data) => {
      toast.success('Logout successful');
      // TODO: clear these by setting queries' data..?
      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries('get cart item by product ID');
      await queryClient.invalidateQueries('get wishlist item by product ID');
      await queryClient.invalidateQueries('get cart summary');

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
