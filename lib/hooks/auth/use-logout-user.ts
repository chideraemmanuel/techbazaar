import axios from '@/config/axios';
import {
  APIErrorResponse,
  APIPaginatedResponse,
  APISuccessResponse,
} from '@/types';
import { ICart } from '@/types/cart';
import { UserTypes } from '@/types/user';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const logoutUser = async () => {
  const response = await axios.delete<APISuccessResponse<UserTypes>>(
    '/auth/logout'
  );

  return response.data;
};

const useLogoutUser = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['logout user'],
    mutationFn: logoutUser,
    onSuccess: async (data) => {
      toast.success('Logout successful');

      queryClient.setQueryData(
        'get cart summary',
        // @ts-ignore
        (previous_cart_summary_data: ICartSummary | undefined) => {
          if (!previous_cart_summary_data) return previous_cart_summary_data;

          return {
            total_items: 0,
            total_amount: 0,
          };
        }
      );

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {
          if (!previous_cart_data) return previous_cart_data;

          const clearedPages = previous_cart_data.pages.map((page) => ({
            ...page,
            data: [], // Clear all items from the data array
            pagination: {
              ...page.pagination,
              total_records: 0, // Set total_records to 0
            },
          }));

          return {
            ...previous_cart_data,
            pages: clearedPages,
          };
        }
      );

      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries('get cart summary');

      await queryClient.invalidateQueries('get cart item by product ID');
      await queryClient.invalidateQueries('get wishlist item by product ID');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Logout failed - Something went wrong'
      );
    },
  });
};

export default useLogoutUser;
