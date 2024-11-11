import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const cancelOrder = async (orderId: string) => {
  const response = await axios.delete<{ message: string }>(
    `/users/me/orders/${orderId}`
  );

  return response.data;
};

const useCancelOrder = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['cancel order'],
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      toast.success('Order cancelled successfully');

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

export default useCancelOrder;
