import { APIErrorResponse } from '@/types';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError, AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

interface IParams {
  axios: AxiosInstance;
  wishlistItem: WishlistTypes;
}

const removeItemFromWishlist = async ({ axios, wishlistItem }: IParams) => {
  const response = await axios.delete(`/users/me/wishlist/${wishlistItem._id}`);

  return response.data;
};

const useRemoveItemFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['remove item from wishlist'],
    mutationFn: removeItemFromWishlist,
    onMutate: async ({ axios, wishlistItem }) => {
      await queryClient.cancelQueries([
        'get wishlist item by product ID',
        wishlistItem.product._id,
        axios,
      ]);

      const previous_wishlist_item_data = queryClient.getQueryData<
        '' | WishlistTypes
      >(['get wishlist item by product ID', wishlistItem.product._id, axios]);

      queryClient.setQueryData(
        ['get wishlist item by product ID', wishlistItem.product._id, axios],
        ''
      );

      return {
        previous_wishlist_item_data,
      };
    },
    onError: (
      error: AxiosError<APIErrorResponse>,
      { axios, wishlistItem },
      context
    ) => {
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
    onSettled: async (data, error, { axios, wishlistItem }) => {
      await queryClient.invalidateQueries([
        'get cart item by product ID',
        wishlistItem.product._id,
        axios,
      ]);
    },
  });
};

export default useRemoveItemFromWishlist;
