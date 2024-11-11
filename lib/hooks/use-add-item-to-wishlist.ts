import axios from '@/config/axios';
import { APIErrorResponse, APISuccessResponse } from '@/types';
import { IAvailableProduct } from '@/types/product';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const addItemToWishlist = async (product: IAvailableProduct) => {
  const response = await axios.post<
    Required<APISuccessResponse<WishlistTypes>>
  >('/users/me/wishlist', { product: product._id });

  return response.data;
};

const useAddItemToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['add item to wishlist'],
    mutationFn: addItemToWishlist,
    onMutate: async (product) => {
      await queryClient.cancelQueries([
        'get wishlist item by product ID',
        product._id,
      ]);

      const previous_wishlist_item_data = queryClient.getQueryData<
        '' | WishlistTypes
      >(['get wishlist item by product ID', product._id]);

      queryClient.setQueryData(
        ['get wishlist item by product ID', product._id],
        // @ts-ignore
        (previous_wishlist_item_data: WishlistTypes) => {
          return {
            _id: product._id,
            user: product._id,
            product,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
      );

      return {
        previous_wishlist_item_data,
      };
    },
    onError: (error: AxiosError<APIErrorResponse>, product, context) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );
      queryClient.setQueryData(
        'get cart item by product ID',
        context?.previous_wishlist_item_data
      );
    },
    onSettled: async (data, error, product) => {
      await queryClient.invalidateQueries([
        'get wishlist item by product ID',
        product._id,
      ]);
    },
  });
};

export default useAddItemToWishlist;
