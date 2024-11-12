import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

const removeItemFromWishlist = async (wishlistItem: WishlistTypes) => {
  const response = await axios.delete(`/users/me/wishlist/${wishlistItem._id}`);

  return response.data;
};

const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove item from wishlist'],
    mutationFn: removeItemFromWishlist,
    onMutate: async (wishlistItem) => {
      await queryClient.cancelQueries([
        'get wishlist item by product ID',
        wishlistItem.product._id,
      ]);

      const previous_wishlist_item_data = queryClient.getQueryData<
        '' | WishlistTypes
      >(['get wishlist item by product ID', wishlistItem.product._id]);

      queryClient.setQueryData(
        ['get wishlist item by product ID', wishlistItem.product._id],
        ''
      );

      return {
        previous_wishlist_item_data,
      };
    },
    onError: (error: AxiosError<APIErrorResponse>, wishlistItem, context) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed - Something went wrong'
      );

      queryClient.setQueryData(
        'get wishlist item by product ID',
        context?.previous_wishlist_item_data
      );
    },
    onSettled: async (data, error, wishlistItem) => {
      await queryClient.invalidateQueries([
        'get cart item by product ID',
        wishlistItem.product._id,
      ]);
    },
  });
};

export default useRemoveItemFromWishlist;
