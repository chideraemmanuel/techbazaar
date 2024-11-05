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
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {
          if (!previous_cart_data) return previous_cart_data;

          const updatedPages = previous_cart_data.pages.map((page) => {
            return {
              ...page,
              data: page.data.map((item) => {
                if (item._id === cartItem._id) {
                  // Increment the quantity of the matched cart item
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item; // Leave other items unchanged
              }),
            };
          });

          return {
            ...previous_cart_data,
            pages: updatedPages,
          };
        }
      );

      queryClient.setQueryData(
        'get cart summary',
        // @ts-ignore
        (previous_cart_summary_data: ICartSummary | undefined) => {
          if (!previous_cart_summary_data) return previous_cart_summary_data;

          return {
            total_items: previous_cart_summary_data.total_items + 1,
            total_amount:
              previous_cart_summary_data.total_amount + cartItem.product.price,
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
    onSettled: async (data, error, product) => {
      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries([
        'get cart item by product ID',
        product._id,
      ]);
      await queryClient.invalidateQueries('get cart summary');
    },
  });
};

export default useIncrementCartItem;
