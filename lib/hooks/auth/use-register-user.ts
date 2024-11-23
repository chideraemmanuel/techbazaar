import { ONE_DAY, setCookie } from '@/lib/cookie';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface ICredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface IParams {
  axios: AxiosInstance;
  credentials: ICredentials;
}

const registerUser = async ({ axios, credentials }: IParams) => {
  const response = await axios.post<
    APISuccessResponse<{ user: UserTypes; session_id: string }>
  >('/auth/register', credentials);

  return response.data;
};

const useRegisterUser = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['register user'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('Registration successful');

      setCookie('session_id', data.data?.session_id as string, ONE_DAY);

      // router.replace('/auth/verify-email');
      router.refresh();
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
