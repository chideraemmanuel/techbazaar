import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const resendVerificationOTP = async (email: string) => {
  const response = await axios.post('/auth/resend-otp', { email });

  return response.data;
};

const useResendVerificationOTP = () => {
  return useMutation({
    mutationKey: ['resend verification OTP'],
    mutationFn: resendVerificationOTP,
    onSuccess: (data) => {
      toast.success('OTP resent successfully');
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error || error?.message || 'Failed to resend OTP'
      );
    },
  });
};

export default useResendVerificationOTP;
