import { APIErrorResponse } from '@/types';
import 'server-only';

export const verifyPasswordResetRequestExistence = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-password-reset?email=${email}`
  );

  if (!response.ok) {
    if (response.status === 404) return null;

    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: { message: string } | string = await response.json();

  return success_response;
};
