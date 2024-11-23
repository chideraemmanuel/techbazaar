import { APIErrorResponse } from '@/types';
import { ICart } from '@/types/cart';
import { AxiosError, AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

const getCartItemByProductID = async ({ queryKey }: { queryKey: any[] }) => {
  const productID = queryKey[1];
  const axios: AxiosInstance = queryKey[2];

  const response = await axios.get<ICart | ''>(
    `/users/me/cart/product?id=${productID}`
  );

  return response.data;
};

const useCartItem = (productID: string, axios: AxiosInstance) => {
  return useQuery({
    queryKey: ['get cart item by product ID', productID, axios],
    queryFn: getCartItemByProductID,
    onSuccess: (data) => {},
    onError: (error: AxiosError<APIErrorResponse>) => {},
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCartItem;
