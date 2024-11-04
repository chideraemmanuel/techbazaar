import axios from '@/config/axios';
import { APIPaginatedResponse, APISuccessResponse } from '@/types';
import { ICart } from '@/types/cart';
import { IAvailableProduct } from '@/types/product';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';

const addItemToCart = async (product: IAvailableProduct) => {
  const response = await axios.post<Required<APISuccessResponse<ICart>>>(
    '/users/me/cart',
    { product: product._id }
  );

  return response.data;
};

const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add item to cart'],
    mutationFn: addItemToCart,
    onMutate: async (product) => {
      await queryClient.cancelQueries('get current user cart');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      console.log({ previous_cart_data });

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (previous_cart_data: InfiniteData<APIPaginatedResponse<ICart>>) => {
          return {
            ...previous_cart_data,
            pages: [
              ...previous_cart_data.pages,
              {
                data: [{ product, quantity: 1 }],
                pagination: {
                  next_page:
                    previous_cart_data.pages[
                      previous_cart_data.pages.length - 1
                    ].pagination.next_page,
                  current_page:
                    previous_cart_data.pages[
                      previous_cart_data.pages.length - 1
                    ].pagination.current_page,
                  previous_page:
                    previous_cart_data.pages[
                      previous_cart_data.pages.length - 1
                    ].pagination.previous_page,
                  total_pages:
                    previous_cart_data.pages[
                      previous_cart_data.pages.length - 1
                    ].pagination.total_pages,
                  total_records:
                    previous_cart_data.pages[
                      previous_cart_data.pages.length - 1
                    ].pagination.total_records + 1,
                },
              },
            ],
          };
        }
      );

      return { previous_cart_data };
    },
    onError: (error, product, context) => {
      queryClient.setQueryData(
        'get current user cart',
        context?.previous_cart_data
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries('get current user cart');
    },
  });
};

export default useAddItemToCart;
