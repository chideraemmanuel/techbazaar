import { cookies } from 'next/headers';
import getCurrentUser from './get-current-user';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { BrandTypes, IAvailableBrand } from '@/types/product';

export const getAllBrands = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/all?paginated=true`,
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

  const success_response: APIPaginatedResponse<BrandTypes> =
    await response.json();

  console.log('[BRANDS_SUCCESS_RESPONSE]', success_response);

  return success_response;
};

export const getAvailableBrands = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands`,
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

  const brands: IAvailableBrand[] = await response.json();

  console.log('[BRANDS]', brands);

  return brands;
};
