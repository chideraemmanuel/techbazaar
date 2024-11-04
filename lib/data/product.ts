import { cookies } from 'next/headers';
import { getCurrentUser } from './user';
import { APIErrorResponse, APIPaginatedResponse, ISearchParams } from '@/types';
import { IAvailableProduct, ProductTypes } from '@/types/product';
import createSearchParams from '../create-search-params';

export const getAllProducts = async (searchParams: ISearchParams = {}) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  const params = createSearchParams(searchParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/all?${params.toString()}`,
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

export const getAvailableProducts = async (
  searchParams: ISearchParams = {}
) => {
  const params = createSearchParams(searchParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/?${params.toString()}`
  );

  if (!response.ok) {
    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: APIPaginatedResponse<IAvailableProduct> =
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

export const getAvailableProductByIdOrSlug = async (idOrSlug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${idOrSlug}`
  );

  if (!response.ok) {
    if (response.status === 404) return null;

    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: IAvailableProduct = await response.json();

  console.log('[PRODUCT_SUCCESS_RESPONSE]', success_response);

  return success_response;
};

export const getRelatedProducts = async (idOrSlug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${idOrSlug}/related`
  );

  if (!response.ok) {
    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: IAvailableProduct[] = await response.json();

  console.log('[PRODUCT_SUCCESS_RESPONSE]', success_response);

  return success_response;
};
