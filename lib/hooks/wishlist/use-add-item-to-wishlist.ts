import { APIErrorResponse, APISuccessResponse } from '@/types';
import { IAvailableProduct } from '@/types/product';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError, AxiosInstance } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'sonner';

interface IParams {
  axios: AxiosInstance;
  product: IAvailableProduct;
}

const addItemToWishlist = async ({ axios, product }: IParams) => {
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
    onMutate: async ({ axios, product }) => {
      await queryClient.cancelQueries([
        'get wishlist item by product ID',
        product._id,
        axios,
      ]);

      const previous_wishlist_item_data = queryClient.getQueryData<
        '' | WishlistTypes
      >(['get wishlist item by product ID', product._id, axios]);

      queryClient.setQueryData(
        ['get wishlist item by product ID', product._id, axios],
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
    onError: (
      error: AxiosError<APIErrorResponse>,
      { axios, product },
      context
    ) => {
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
    onSettled: async (data, error, { axios, product }) => {
      await queryClient.invalidateQueries([
        'get wishlist item by product ID',
        product._id,
        axios,
      ]);
    },
  });
};

export default useAddItemToWishlist;
