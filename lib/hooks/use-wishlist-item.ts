import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { ICart } from '@/types/cart';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const getWishlistItemByProductID = async ({
  queryKey,
}: {
  queryKey: any[];
}) => {
  const productID = queryKey[1];

  const response = await axios.get<WishlistTypes | ''>(
    `/users/me/wishlist/product?id=${productID}`
  );

  return response.data;
};

const useWishlistItem = (productID: string) => {
  return useQuery({
    queryKey: ['get wishlist item by product ID', productID],
    queryFn: getWishlistItemByProductID,
    onSuccess: (data) => {},
    onError: (error: AxiosError<APIErrorResponse>) => {},
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useWishlistItem;
