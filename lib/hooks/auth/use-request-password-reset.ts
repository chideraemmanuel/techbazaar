import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const requestPasswordReset = async (email: string) => {
  const response = await axios.post<{ message: string }>(
    '/auth/request-password-reset',
    {
      email,
    }
  );

  return { response: response.data, email };
};

const useRequestPasswordReset = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['request password reset'],
    mutationFn: requestPasswordReset,
    onSuccess: ({ email }) => {
      toast.success('Password reset email sent');

      router.push(
        `/auth/reset-password/verify?email=${encodeURIComponent(email)}`
      );
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

export default useRequestPasswordReset;
