import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import CartContent from './_components/cart-content';
import { headers } from 'next/headers';

interface Props {}

const UserCartPage: FC<Props> = async () => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/user/cart';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }

  return (
    <>
      <div className="container py-5">
        <div className="pb-4 md:pb-5">
          <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            Hello, {user.first_name}
          </span>

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            Your cart
          </h1>
        </div>

        <CartContent />
      </div>
    </>
  );
};

export default UserCartPage;
