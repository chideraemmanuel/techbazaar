import { cookies } from 'next/headers';
import 'server-only';
import { getCurrentUser } from './user';
import { APIErrorResponse, APIPaginatedResponse } from '@/types';
import { IBillingInformation, ICart } from '@/types/cart';

export const getCurrentUserCart = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (!user.email_verified) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/cart`,
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

  const success_response: APIPaginatedResponse<ICart> = await response.json();

  return success_response;
};

export const getCurrentUserBillingInformation = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (!user.email_verified) throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/billing`,
    {
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    } else {
      const error_response: APIErrorResponse = await response.json();
      throw new Error(error_response.error || 'Something went wrong');
    }
  }

  const success_response: IBillingInformation = await response.json();

  return success_response;
};
