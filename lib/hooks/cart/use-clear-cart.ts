import axios from '@/config/axios';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const clearCart = async () => {
  const response = await axios.delete(`/users/me/cart`);

  return response.data;
};

const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['increment cart item'],
    mutationFn: clearCart,
    onMutate: async () => {
      await queryClient.cancelQueries('get current user cart');
      await queryClient.cancelQueries('get cart summary');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      const previous_cart_summary_data =
        queryClient.getQueryData<ICartSummary>('get cart summary');

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

      return {
        previous_cart_data,
        previous_cart_summary_data,
      };
    },
    onError: (error: AxiosError<APIErrorResponse>, cartItem, context) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );

      queryClient.setQueryData(
        'get current user cart',
        context?.previous_cart_data
      );

      queryClient.setQueryData(
        'get cart summary',
        context?.previous_cart_summary_data
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries('get cart summary');
    },
  });
};

export default useClearCart;
