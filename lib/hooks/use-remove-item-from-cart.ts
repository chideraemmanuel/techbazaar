import axios from '@/config/axios';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ICart } from '@/types/cart';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const removeItemFromCart = async (cartItemId: string) => {
  const response = await axios.delete(`/users/me/cart/${cartItemId}`);

  return response.data;
};

const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove item from cart'],
    mutationFn: removeItemFromCart,
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries('get current user cart');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      console.log('previous_cart_data', previous_cart_data);

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (
          previous_cart_data:
            | InfiniteData<APIPaginatedResponse<ICart>>
            | undefined
        ) => {
          const new_cart_data_pages = previous_cart_data?.pages.filter(
            (item, index) => {
              return index !== previous_cart_data.pages.length - 1;
            }
          );

          console.log('new_cart_data_pages', new_cart_data_pages);

          return {
            ...previous_cart_data,
            pages: [
              ...(new_cart_data_pages ? new_cart_data_pages : []),
              {
                ...previous_cart_data?.pages?.[
                  previous_cart_data?.pages.length - 1
                ],
                data: [
                  ...(previous_cart_data?.pages?.[
                    previous_cart_data?.pages.length - 1
                  ]?.data
                    ? previous_cart_data?.pages?.[
                        previous_cart_data?.pages.length - 1
                      ]?.data.filter((item, index) => {
                        return (
                          index !==
                          previous_cart_data?.pages?.[
                            previous_cart_data?.pages.length - 1
                          ]?.data.length -
                            1
                        );
                      })
                    : []),
                ],
                pagination: {
                  next_page:
                    previous_cart_data?.pages[
                      previous_cart_data?.pages.length - 1
                    ].pagination.next_page,
                  current_page:
                    previous_cart_data?.pages[
                      previous_cart_data?.pages.length - 1
                    ].pagination.current_page,
                  previous_page:
                    previous_cart_data?.pages[
                      previous_cart_data?.pages.length - 1
                    ].pagination.previous_page,
                  total_pages:
                    previous_cart_data?.pages[
                      previous_cart_data?.pages.length - 1
                    ].pagination.total_pages,
                  total_records:
                    previous_cart_data?.pages?.[
                      previous_cart_data?.pages.length - 1
                    ]?.pagination?.total_records &&
                    previous_cart_data?.pages?.[
                      previous_cart_data?.pages.length - 1
                    ]?.pagination?.total_records - 1,
                },
              },
            ],
          };
        }
      );

      return { previous_cart_data };
    },
    onError: (error: AxiosError<APIErrorResponse>, cartItemId, context) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );

      queryClient.setQueryData(
        'get current user cart',
        context?.previous_cart_data
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries('get current user cart');
      await queryClient.invalidateQueries('get cart item by product ID');
    },
  });
};

export default useRemoveItemFromCart;
