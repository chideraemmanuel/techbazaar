import { APIErrorResponse, APIPaginatedResponse, ISearchParams } from '@/types';
import { cookies } from 'next/headers';
import { getCurrentUser } from './user';
import createSearchParams from '../create-search-params';
import { WishlistTypes } from '@/types/wishlist';

export const getCurrentUserWishlist = async (
  searchParams: ISearchParams = {}
) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (!user.email_verified) throw new Error('Unauthorized access');

  const params = createSearchParams(searchParams);

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/users/me/wishlist?${params.toString()}`,
    {
      headers: {
        // Cookie: `session_id=${session_id}`,
        Authorization: `Bearer ${session_id}`,
      },
    }
  );

  if (!response.ok) {
    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: APIPaginatedResponse<WishlistTypes> =
    await response.json();

  return success_response;
};
