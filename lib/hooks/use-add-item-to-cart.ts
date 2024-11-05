import axios from '@/config/axios';
import {
  APIErrorResponse,
  APIPaginatedResponse,
  APISuccessResponse,
} from '@/types';
import { ICart, ICartSummary } from '@/types/cart';
import { IAvailableProduct } from '@/types/product';
import { AxiosError } from 'axios';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

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
      await queryClient.cancelQueries('get cart item by product ID');
      await queryClient.cancelQueries('get cart summary');

      const previous_cart_data = queryClient.getQueryData<
        InfiniteData<APIPaginatedResponse<ICart>>
      >('get current user cart');

      const previous_cart_item_data = queryClient.getQueryData<'' | ICart>(
        'get cart item by product ID'
      );

      const previous_cart_summary_data =
        queryClient.getQueryData<ICartSummary>('get cart summary');

      queryClient.setQueryData(
        'get current user cart',
        // @ts-ignore
        (
          previous_cart_data:
            | InfiniteData<APIPaginatedResponse<ICart>>
            | undefined
        ) => {
          if (!previous_cart_data) return previous_cart_data;

          const updatedPages = previous_cart_data.pages.map((page, index) => {
            if (index === 0) {
              // Assuming you want to add to the first page
              return {
                ...page,
                data: [
                  {
                    _id: product._id, // Use unique ID from the new product
                    user: product._id,
                    product,
                    quantity: 1,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    __v: 0,
                  },
                  ...page.data,
                ],
                pagination: {
                  ...page.pagination,
                  total_records: page.pagination.total_records + 1, // Update total count
                },
              };
            }
            return page;
          });

          return {
            ...previous_cart_data,
            pages: updatedPages,
          };
        }
      );

      queryClient.setQueryData(
        ['get cart item by product ID', product._id],
        // @ts-ignore
        (previous_cart_item_data: ICart) => {
          return {
            product,
            quantity: 1,
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
              previous_cart_summary_data.total_amount + product.price,
          };
        }
      );

      return {
        previous_cart_data,
        previous_cart_item_data,
        previous_cart_summary_data,
      };
    },
    onError: (error: AxiosError<APIErrorResponse>, product, context) => {
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

export default useAddItemToCart;
