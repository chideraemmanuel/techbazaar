import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface Credentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const registerUser = async (credentials: Credentials) => {
  const response = await axios.post<APISuccessResponse<UserTypes>>(
    '/auth/register',
    credentials
  );

  return response.data;
};

const useRegisterUser = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['register user'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('Registration successful');
      router.replace('/auth/verify-email');
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Registration failed - Something went wrong'
      );
    },
  });
};

export default useRegisterUser;
