import axios from '@/config/axios';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { AxiosError, AxiosInstance } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const removeItemFromCart = async ({
  cartItem,
  axios,
}: {
  axios: AxiosInstance;
  cartItem: ICart;
}) => {
  const response = await axios.delete(`/users/me/cart/${cartItem._id}`);

  return response.data;
};

const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove item from cart'],
    mutationFn: removeItemFromCart,
    onMutate: async ({ axios, cartItem }) => {
      await queryClient.cancelQueries(['get current user cart', axios]);
      await queryClient.cancelQueries([
        'get cart item by product ID',
        cartItem.product._id,
        axios,
      ]);
      await queryClient.cancelQueries(['get cart summary', axios]);

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >(['get current user cart', axios]);

      const previous_cart_item_data = queryClient.getQueryData<'' | ICart>([
        'get cart item by product ID',
        cartItem.product._id,
        axios,
      ]);

      const previous_cart_summary_data = queryClient.getQueryData<ICartSummary>(
        ['get cart summary', axios]
      );

      queryClient.setQueryData(
        ['get current user cart', axios],
        // @ts-ignore
        (
          previous_cart_data:
            | InfiniteData<APIPaginatedResponse<ICart>>
            | undefined
        ) => {
          if (!previous_cart_data) return previous_cart_data;

          const updatedPages = previous_cart_data.pages.map((page) => {
            // Determine if the item exists in the current page
            const itemIndex = page.data.findIndex(
              (item) => item._id === cartItem._id
            );

            if (itemIndex === -1) return page; // Item not found, return the page unchanged

            // Filter out the cart item being removed
            const newData = page.data.filter(
              (item) => item._id !== cartItem._id
            );

            // Return the updated page with the item removed and the total_records adjusted
            return {
              ...page,
              data: newData,
              pagination: {
                ...page.pagination,
                total_records: page.pagination.total_records - 1, // Decrement total count
              },
            };
          });

          return {
            ...previous_cart_data,
            pages: updatedPages,
          };
        }
      );

      queryClient.setQueryData(
        ['get cart item by product ID', cartItem.product._id, axios],
        ''
      );

      queryClient.setQueryData(
        ['get cart summary', axios],
        // @ts-ignore
        (previous_cart_summary_data: ICartSummary | undefined) => {
          if (!previous_cart_summary_data) return previous_cart_summary_data;

          return {
            total_items:
              previous_cart_summary_data.total_items - cartItem.quantity,
            total_amount:
              previous_cart_summary_data.total_amount -
              cartItem.product.price * cartItem.quantity,
          };
        }
      );

      return {
        previous_cart_data,
        previous_cart_item_data,
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
        'get cart item by product ID',
        context?.previous_cart_item_data
      );

      queryClient.setQueryData(
        'get cart summary',
        context?.previous_cart_summary_data
      );
    },
    onSettled: async (data, error, { axios, cartItem }) => {
      await queryClient.invalidateQueries(['get current user cart', axios]);
      await queryClient.invalidateQueries([
        'get cart item by product ID',
        cartItem.product._id,
        axios,
      ]);
      await queryClient.invalidateQueries(['get cart summary', axios]);
    },
  });
};

export default useRemoveItemFromCart;
