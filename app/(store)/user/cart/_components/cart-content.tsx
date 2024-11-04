'use client';

import CartItem from '@/app/(store)/user/cart/_components/cart-item';
import DataTablePagination from '@/components/data-table-pagination';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getCurrentUserCart } from '@/lib/data/cart';
import useCurrentUserCart from '@/lib/hooks/use-current-user-cart';
import { ISearchParams } from '@/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
  searchParams: ISearchParams;
}

const CartContent: FC<Props> = ({ searchParams }) => {
  const { data, isFetching, hasNextPage, fetchNextPage, isError, error } =
    useCurrentUserCart(searchParams);

  //   if (isFetching) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] lg:grid-cols-[6fr_3fr] gap-5">
        <div className="dark:bg-secondary/30 shadow-sm px-3 md:px-5 py-3 md:py-5 rounded-xl border space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-foreground/90 text-sm sm:text-base font-medium">
              Cart items{' '}
              {data && data.pages[0].data && (
                <span className="text-muted-foreground">
                  ({data.pages[0].pagination.total_records})
                </span>
              )}
            </h2>

            <Button
              variant={'destructive'}
              className="h-7 sm:h-9 rounded-md px-3"
            >
              Clear cart
            </Button>
          </div>

          {data && data.pages[0].data.length > 0 ? (
            <>
              <div className="space-y-3">
                {data.pages.map((group, index) => (
                  <React.Fragment key={index}>
                    {group.data.map((cart_item) => (
                      <CartItem key={cart_item._id} cart_item={cart_item} />
                    ))}
                  </React.Fragment>
                ))}
              </div>

              {hasNextPage && (
                <div className="flex justify-center">
                  <Button onClick={() => fetchNextPage()} disabled={isFetching}>
                    {isFetching && <Loader2 className="h-4 w-4 animate-spin" />}{' '}
                    Load more
                  </Button>
                </div>
              )}

              {/* <DataTablePagination
                totalPages={data.pagination.total_pages}
                totalPagesToDisplay={3}
              /> */}
            </>
          ) : (
            <div className="flex items-center justify-center h-[50vh]">
              <span className="text-muted-foreground text-sm sm:text-base">
                You have no item in your cart.
              </span>
            </div>
          )}
        </div>

        <CartSummary />
      </div>
    </>
  );
};

export default CartContent;

const CartSummary: FC<{}> = () => {
  return (
    <>
      <div className="dark:bg-secondary/30 shadow-sm rounded-xl border md:sticky md:top-[90px] self-start px-3 md:px-5 py-3 md:py-5 space-y-3">
        <h3 className="text-foreground/90 text-base sm:text-lg font-medium">
          Cart summary
        </h3>

        <Separator />

        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm sm:text-base font-medium">
              Subtotal (7 items)
            </span>

            <span className="text-sm sm:text-base font-medium">
              ₦1,000,000.00
            </span>
          </li>

          <li className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm sm:text-base font-medium">
              Discount
            </span>

            <span className="text-sm sm:text-base font-medium">₦0.00</span>
          </li>

          <Separator />

          <li className="flex items-center justify-between">
            <span className="text-muted-foreground text-base sm:text-lg font-medium">
              Total
            </span>

            <span className="text-lg sm:text-xl font-medium">
              ₦1,000,000.00
            </span>
          </li>
        </ul>

        <Separator />

        <div>
          <Button asChild className="w-full">
            <Link href={'/user/cart/checkout'}>Checkout</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
