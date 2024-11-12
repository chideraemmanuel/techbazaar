import CartItem from '@/app/(store)/user/cart/_components/cart-item';
import DataTablePagination from '@/components/data-table-pagination';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DUMMY_PRODUCTS } from '@/dummy';
import { getCurrentUser } from '@/lib/data/user';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC, Suspense } from 'react';
import CartContent from './_components/cart-content';
import { ISearchParams } from '@/types';
import { headers } from 'next/headers';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const UserCartPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/user/cart';

  const searchParamsObject = await searchParams;
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

        <CartContent searchParams={searchParamsObject} />
      </div>
    </>
  );
};

export default UserCartPage;
