import { ONE_DAY, setCookie } from '@/lib/cookie';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError, AxiosInstance } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface ICredentials {
  email: string;
  password: string;
}

interface IParams {
  axios: AxiosInstance;
  credentials: ICredentials;
}

const loginUser = async ({ axios, credentials }: IParams) => {
  const response = await axios.post<
    APISuccessResponse<{ user: UserTypes; session_id: string }>
  >('/auth/login', credentials);

  return response.data;
};

const useLoginUser = () => {
  const router = useRouter();
  const return_to = useSearchParams().get('return_to');

  return useMutation({
    mutationKey: ['login user'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Login successful');

      setCookie('session_id', data.data?.session_id as string, ONE_DAY);

      return_to
        ? router.replace(decodeURIComponent(return_to))
        : router.refresh();
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
