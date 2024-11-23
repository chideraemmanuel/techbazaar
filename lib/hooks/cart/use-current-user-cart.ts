import { APIPaginatedResponse } from '@/types';
import { useInfiniteQuery } from 'react-query';
import axios from '@/config/axios';
import { ICart } from '@/types/cart';
import { AxiosInstance } from 'axios';

const getCurrentUserCart = async ({
  queryKey,
  pageParam = 1,
}: {
  pageParam?: number;
  queryKey: any[];
}) => {
  const axios: AxiosInstance = queryKey[1];

  const response = await axios.get<APIPaginatedResponse<ICart>>(
    `/users/me/cart?page=${pageParam}&limit=2`
  );

  return response.data;
};

const useCurrentUserCart = (axios: AxiosInstance) => {
  return useInfiniteQuery({
    queryKey: ['get current user cart', axios],
    queryFn: getCurrentUserCart,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination.next_page || undefined;
    },
    retry: false,
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCurrentUserCart;
