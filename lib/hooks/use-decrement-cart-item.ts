import axios from '@/config/axios';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const decrementCartItem = async (cartItem: ICart) => {
  const response = await axios.put(`/users/me/cart/${cartItem._id}/decrement`);

  return response.data;
};

const useDecrementCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['decrement cart item'],
    mutationFn: decrementCartItem,
    onMutate: async (cartItem) => {
      await queryClient.cancelQueries('get current user cart');
      await queryClient.cancelQueries([
        'get cart item by product ID',
        cartItem.product._id,
      ]);
      await queryClient.cancelQueries('get cart summary');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      const previous_cart_item_data = queryClient.getQueryData<'' | ICart>([
        'get cart item by product ID',
        cartItem.product._id,
      ]);

      const previous_cart_summary_data =
        queryClient.getQueryData<ICartSummary>('get cart summary');

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {
          const updatedPages = previous_cart_data.pages.map((page) => {
            // Determine if the item exists in the current page
            const itemIndex = page.data.findIndex(
              (item) => item._id === cartItem._id
            );

            if (itemIndex === -1) return page; // Item not found, return the page unchanged

            const item = page.data[itemIndex];

            if (item.quantity === 1) {
              // If quantity is 1, remove the item from the data
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
            } else {
              // If quantity is greater than 1, just decrement it
              const newData = page.data.map((item) => {
                if (item._id === cartItem._id) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item; // Leave other items unchanged
              });

              return {
                ...page,
                data: newData,
              };
            }
          });

          return {
            ...previous_cart_data,
            pages: updatedPages,
          };
        }
      );

      queryClient.setQueryData(
        ['get cart item by product ID', cartItem.product._id],
        ''
      );

      queryClient.setQueryData(
        'get cart summary',
        // @ts-ignore
        (previous_cart_summary_data: ICartSummary | undefined) => {
          if (!previous_cart_summary_data) return previous_cart_summary_data;

          if (cartItem.quantity > 1) {
            return {
              total_items: previous_cart_summary_data.total_items - 1,
              total_amount:
                previous_cart_summary_data.total_amount -
                cartItem.product.price,
            };
          } else {
            return {
              total_items: previous_cart_summary_data.total_items - 1,
              total_amount:
                previous_cart_summary_data.total_amount -
                cartItem.product.price,
            };
          }
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

export default useDecrementCartItem;
