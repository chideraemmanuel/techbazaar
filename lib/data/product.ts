import { cookies } from 'next/headers';
import getCurrentUser from './get-current-user';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { ProductTypes } from '@/types/product';

export const getAllProducts = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all`,
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

  const success_response: APIPaginatedResponse<ProductTypes> =
    await response.json();

  console.log('[PRODUCTS_SUCCESS_RESPONSE]', success_response);

  return success_response;
};

export const getProductByIdOrSlug = async (idOrSlug: string) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${idOrSlug}/all`,
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

  const success_response: ProductTypes = await response.json();

  console.log('[PRODUCT_SUCCESS_RESPONSE]', success_response);

  return success_response;
};
