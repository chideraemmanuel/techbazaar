import { cookies } from 'next/headers';
import { getCurrentUser } from './user';
import createSearchParams from '../create-search-params';
import { APIErrorResponse, APIPaginatedResponse, ISearchParams } from '@/types';
import { IOrder } from '@/types/cart';

export const getAllOrders = async (searchParams: ISearchParams = {}) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (user.role !== 'admin') throw new Error('Unauthorized access');

  const params = createSearchParams(searchParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders?${params.toString()}`,
    {
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    }
  );

  if (!response.ok) {
    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: APIPaginatedResponse<IOrder> = await response.json();

  console.log('[ORDERS_SUCCESS_RESPONSE]', success_response);

  return success_response;
};
