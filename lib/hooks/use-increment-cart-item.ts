import axios from '@/config/axios';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const incrementCartItem = async (cartItem: ICart) => {
  const response = await axios.put(`/users/me/cart/${cartItem._id}/increment`);

  return response.data;
};

const useIncrementCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['increment cart item'],
    mutationFn: incrementCartItem,
    onMutate: async (cartItem) => {
      await queryClient.cancelQueries('get current user cart');
      await queryClient.cancelQueries('get cart summary');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      const previous_cart_summary_data =
        queryClient.getQueryData<ICartSummary>('get cart summary');

      console.log('previous_cart_data', previous_cart_data);

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {}
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
      await queryClient.invalidateQueries('get cart item by product ID');
      await queryClient.invalidateQueries('get cart summary');
    },
  });
};

export default useIncrementCartItem;
