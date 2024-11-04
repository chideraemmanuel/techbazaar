import axios from '@/config/axios';
import { ICartSummary } from '@/types/cart';
import { useQuery } from 'react-query';

const getCartSummary = async () => {
  const response = await axios.get<ICartSummary>('/users/me/cart/summary');

  return response.data;
};

const useCartSummary = () => {
  return useQuery({
    queryKey: ['get cart summary'],
    queryFn: getCartSummary,
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCartSummary;
