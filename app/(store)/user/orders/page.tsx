import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getCurrentUser } from '@/lib/data/user';
import { ISearchParams } from '@/types';
import { RiFilter3Line } from '@remixicon/react';
import { redirect } from 'next/navigation';
import { FC, Suspense } from 'react';
import OrdersPageSideFilter from './_components/orders-page-side-filter';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { DUMMY_ORDERS } from '@/dummy';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/cn';
import DataTablePagination from '@/components/data-table-pagination';
import OrderCard from './_components/order-card';
import { getCurrentUserOrders } from '@/lib/data/order';
import { headers } from 'next/headers';
interface Props {
  searchParams: Promise<ISearchParams>;
}

const UserOrdersPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/user/orders';

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
      <section className="pt-2 container grid md:grid-cols-[250px,_1fr]">
        <aside className="sticky top-[calc(80px+8px)] border border-border h-[calc(100vh-80px-16px)] hidden md:block rounded-lg overflow-hidden">
          <ScrollArea className="h-full py-3 px-2">
            <OrdersPageSideFilter />
          </ScrollArea>
        </aside>

        <div className="container md:pr-0 py-5 flex flex-col">
          <div className="pb-4 md:pb-5">
            <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
              Hello, {user.first_name}
            </span>

            <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
              Your orders
            </h1>
          </div>

          <div className="flex md:hidden justify-end space-x-2 py-2 mb-3 bg-background sticky top-[63px] md:top-[79px] z-[3]">
            <Sheet>
              <SheetTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                  <RiFilter3Line />
                  <span className="inline-block">Filter</span>
                </Button>
              </SheetTrigger>

              <SheetContent side={'bottom'} className="md:hidden p-0">
                <ScrollArea className="h-[50vh] p-6">
                  <OrdersPageSideFilter sheetClose={SheetClose} />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Suspense>
            <OrdersList searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default UserOrdersPage;

const OrdersList: FC<{ searchParams: ISearchParams }> = async ({
  searchParams,
}) => {
  const { data: orders, pagination } = await getCurrentUserOrders(searchParams);

  return (
    <>
      <div className="flex-1 flex flex-col">
        {orders.length > 0 ? (
          <>
            <div className="flex-1">
              <div className="space-y-4 mb-10">
                {orders.map((order, index) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </div>

            <div className="flex justify-center pb-7">
              <DataTablePagination
                totalPages={pagination.total_pages}
                totalPagesToDisplay={3}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[50vh] md:h-full">
            <span className="text-muted-foreground">No orders to display</span>
          </div>
        )}
      </div>
    </>
  );
};
