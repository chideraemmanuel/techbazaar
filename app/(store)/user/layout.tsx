import { getCurrentUser } from '@/lib/data/user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const UserLayout: FC<Props> = async ({ children }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${pathname}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${pathname}`);
  }

  return <>{children}</>;
};

export default UserLayout;
