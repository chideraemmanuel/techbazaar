import { APIErrorResponse } from '@/types';
import { WishlistTypes } from '@/types/wishlist';
import { AxiosError, AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

const getWishlistItemByProductID = async ({
  queryKey,
}: {
  queryKey: any[];
}) => {
  const productID = queryKey[1];
  const axios: AxiosInstance = queryKey[2];

  const response = await axios.get<WishlistTypes | ''>(
    `/users/me/wishlist/product?id=${productID}`
  );

  return response.data;
};

const useWishlistItem = (productID: string, axios: AxiosInstance) => {
  return useQuery({
    queryKey: ['get wishlist item by product ID', productID, axios],
    queryFn: getWishlistItemByProductID,
    onSuccess: (data) => {},
    onError: (error: AxiosError<APIErrorResponse>) => {},
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useWishlistItem;
