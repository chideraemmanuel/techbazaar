import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { AxiosError, AxiosInstance } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const clearCart = async (axios: AxiosInstance) => {
  const response = await axios.delete(`/users/me/cart`);

  return response.data;
};

const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['increment cart item'],
    mutationFn: clearCart,
    onMutate: async (axios) => {
      await queryClient.cancelQueries(['get current user cart', axios]);
      await queryClient.cancelQueries(['get cart summary', axios]);

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >(['get current user cart', axios]);

      const previous_cart_summary_data = queryClient.getQueryData<ICartSummary>(
        ['get cart summary', axios]
      );

      queryClient.setQueryData(
        ['get current user cart', axios],
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
        ['get cart summary', axios],
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
    onSettled: async (data, error, axios) => {
      await queryClient.invalidateQueries(['get current user cart', axios]);
      await queryClient.invalidateQueries(['get cart summary', axios]);
    },
  });
};

export default useClearCart;
