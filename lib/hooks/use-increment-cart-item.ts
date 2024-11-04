import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const incrementCartItem = async (cartItemId: string) => {
  const response = await axios.put(`/users/me/cart/${cartItemId}/increment`);

  return response.data;
};

const useIncrementCartItem = () => {
  return useMutation({
    mutationKey: ['increment cart item'],
    mutationFn: incrementCartItem,
    onMutate: (variable) => {},
    onError: (error: AxiosError<APIErrorResponse>, variable, context) => {},
    onSettled: () => {},
  });
};

export default useIncrementCartItem;
