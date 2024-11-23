import 'server-only';
import { cookies } from 'next/headers';
import { getCurrentUser } from './user';
import { APIErrorResponse, APIPaginatedResponse, ISearchParams } from '@/types';
import { BrandTypes, IAvailableBrand } from '@/types/product';
import createSearchParams from '../create-search-params';

export const getAllBrands = async (searchParams: ISearchParams = {}) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const params = createSearchParams(searchParams);

  const formattedParams =
    params.toString().length === 0 ? '' : `&${params.toString()}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/all?paginated=true${formattedParams}`,
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

  const success_response: APIPaginatedResponse<BrandTypes> =
    await response.json();

  return success_response;
};

export const getAvailableBrands = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`
  );

  if (!response.ok) {
    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const brands: IAvailableBrand[] = await response.json();

  return brands;
};
