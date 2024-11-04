import { APIPaginatedResponse, ISearchParams } from '@/types';
import { useInfiniteQuery, useQuery } from 'react-query';
import createSearchParams from '../create-search-params';
import axios from '@/config/axios';
import { ICart } from '@/types/cart';

// const getCurrentUserCart = async ({ queryKey }: { queryKey: any[] }) => {
//     const searchParams: ISearchParams = queryKey[1];

//     const params = createSearchParams(searchParams);

//     const response = await axios.get<APIPaginatedResponse<ICart>>(
//       `/users/me/cart?${params.toString()}`
//     );
// };

const getCurrentUserCart = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const response = await axios.get<APIPaginatedResponse<ICart>>(
    `/users/me/cart?page=${pageParam}&limit=1`
  );

  return response.data;
};

const useCurrentUserCart = (searchParams: ISearchParams = {}) => {
  //   return useQuery({
  //     queryKey: ['get current user cart'],
  //     queryFn: getCurrentUserCart,
  //     retry: false,
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //   });
  return useInfiniteQuery({
    queryKey: ['get current user cart'],
    queryFn: getCurrentUserCart,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pagination.next_page || undefined;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useCurrentUserCart;
