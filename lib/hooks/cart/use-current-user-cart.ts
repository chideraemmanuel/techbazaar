import { APIPaginatedResponse } from '@/types';
import { useInfiniteQuery } from 'react-query';
import axios from '@/config/axios';
import { ICart } from '@/types/cart';

const getCurrentUserCart = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const response = await axios.get<APIPaginatedResponse<ICart>>(
    `/users/me/cart?page=${pageParam}&limit=2`
  );

  return response.data;
};

const useCurrentUserCart = () => {
  return useInfiniteQuery({
    queryKey: ['get current user cart'],
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
