import axios from '@/config/axios';
import { APIPaginatedResponse } from '@/types';
import { IAvailableProduct } from '@/types/product';
import { useQuery } from 'react-query';

const searchProducts = async ({ queryKey }: { queryKey: any[] }) => {
  const query = queryKey[1];

  const response = await axios.get<APIPaginatedResponse<IAvailableProduct>>(
    `/products?search_query=${query}&limit=6`
  );

  return response.data;
};

const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ['search products', query],
    queryFn: searchProducts,
    enabled: false,
  });
};

export default useSearchProducts;
