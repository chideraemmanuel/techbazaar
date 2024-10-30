import { UserTypes } from '@/types/user';
import { cookies } from 'next/headers';

const getCurrentUser = async () => {
  const session_id = (await cookies()).get('session_id')?.value;

  if (!session_id) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      // credentials: 'include',
      headers: {
        Cookie: `session_id=${session_id}`,
      },
    }
  );

  if (!response.ok) return null; // throw error..?

  const user: UserTypes = await response.json();

  //   console.log('[USER]', user);

  return user;
};

export default getCurrentUser;
