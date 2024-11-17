import 'server-only';
import { UserTypes } from '@/types/user';
import { cookies } from 'next/headers';
import { APIErrorResponse, APIPaginatedResponse, ISearchParams } from '@/types';
import createSearchParams from '../create-search-params';

export const getAllUsers = async (searchParams: ISearchParams = {}) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (user.role !== 'admin') throw new Error('Unauthorized access');

  const params = createSearchParams(searchParams);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`,
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

  const success_response: APIPaginatedResponse<UserTypes> =
    await response.json();

  return success_response;
};

export const getUserById = async (id: string) => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) throw new Error('Unauthorized access');

  const user = await getCurrentUser();

  if (!user) throw new Error('Unauthorized access');

  if (user.role !== 'admin') throw new Error('Unauthorized access');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) return null;

    const error_response: APIErrorResponse = await response.json();
    throw new Error(error_response.error || 'Something went wrong');
  }

  const success_response: UserTypes = await response.json();

  return success_response;
};

export const getCurrentUser = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    }
  );

  if (!response.ok) return null;

  const user: UserTypes = await response.json();

  return user;
};
