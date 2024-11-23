import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserRole, UserTypes } from '@/types/user';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface Params {
  axios: AxiosInstance;
  userId: string;
  updates: {
    role?: UserRole;
    disabled?: boolean;
  };
}

const updateUserStatus = async ({ axios, userId, updates }: Params) => {
  const response = await axios.put<APISuccessResponse<UserTypes>>(
    `users/${userId}`,
    updates
  );

  return response.data;
};

const useUpdateUserStatus = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['update user status'],
    mutationFn: updateUserStatus,
    onSuccess: (data) => {
      toast.success('Update successful');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );
    },
  });
};

export default useUpdateUserStatus;
