import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { OrderStatus } from '@/types/cart';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface Params {
  orderId: string;
  status: OrderStatus;
}

const updateOrderStatus = async ({ orderId, status }: Params) => {
  const response = await axios.put(`/orders/${orderId}`, { status });

  return response.data;
};

const useUpdateOrderStatus = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['update order status'],
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      toast.success('Order status updated successfully');

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

export default useUpdateOrderStatus;
