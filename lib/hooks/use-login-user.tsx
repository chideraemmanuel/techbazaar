import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post<APISuccessResponse<UserTypes>>(
    '/auth/login',
    credentials
  );

  return response.data;
};

const useLoginUser = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['login user'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Login successful');
      //   router.replace('/');
      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Login failed - Something went wrong'
      );
    },
  });
};

export default useLoginUser;
