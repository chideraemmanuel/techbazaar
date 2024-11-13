import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const completePasswordReset = async (data: {
  email: string;
  OTP: string;
  new_password: string;
}) => {
  const response = await axios.put('/auth/reset-password', data);

  return response.data;
};

const useCompletePasswordReset = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['complete password reset'],
    mutationFn: completePasswordReset,
    onSuccess: (data) => {
      toast.success('Password reset successfully');

      router.replace('/auth/login');
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

export default useCompletePasswordReset;
