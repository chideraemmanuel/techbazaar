import { ICartSummary } from '@/types/cart';
import { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

const getCartSummary = async ({ queryKey }: { queryKey: any[] }) => {
  const axios: AxiosInstance = queryKey[1];

  const response = await axios.get<ICartSummary>('/users/me/cart/summary');

  return response.data;
};

const useCartSummary = (axios: AxiosInstance) => {
  return useQuery({
    queryKey: ['get cart summary', axios],
    queryFn: getCartSummary,
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCartSummary;
