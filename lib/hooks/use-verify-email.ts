import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const verifyEmail = async (credentials: { email: string; OTP: string }) => {
  const response = await axios.post<APISuccessResponse<UserTypes>>(
    '/auth/verify-email',
    credentials
  );

  return response.data;
};

const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['verify email'],
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      toast.success('Email verified successfully');

      router.replace('/');
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Verification failed - Something went wrong'
      );
    },
  });
};

export default useVerifyEmail;
