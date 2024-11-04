import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { ICart } from '@/types/cart';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

const getCartItemByProductID = async ({ queryKey }: { queryKey: any[] }) => {
  const productID = queryKey[1];

  const response = await axios.get<ICart | ''>(
    `/users/me/cart/product?id=${productID}`
  );

  return response.data;
};

const useCartItem = (productID: string) => {
  return useQuery({
    // TODO: move to separate `useCartItem` hook
    queryKey: ['get cart item by product ID', productID],
    queryFn: getCartItemByProductID,
    onSuccess: (data) => {},
    onError: (error: AxiosError<APIErrorResponse>) => {},
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCartItem;
