'use client';

import CartItem from '@/app/(store)/user/cart/_components/cart-item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useCartSummary from '@/lib/hooks/cart/use-cart-summary';
import useCurrentUserCart from '@/lib/hooks/cart/use-current-user-cart';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import ClearCartButton from './clear-cart-button';
import RegionalPriceFormat from '@/components/regional-price-format';
import { useRouter } from 'next/navigation';

interface Props {}

const CartContent: FC<Props> = () => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useCurrentUserCart();

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

            {!isLoading && data && data.pages[0].data.length > 0 && (
              <ClearCartButton asChild>
                <Button
                  variant={'destructive'}
                  className="h-7 sm:h-9 rounded-md px-3"
                >
                  Clear cart
                </Button>
              </ClearCartButton>
            )}
          </div>

          {isLoading && !data && (
            <div className="flex items-center justify-center h-[50vh]">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
          )}

          {!isLoading &&
            data &&
            (data.pages[0].data.length > 0 ? (
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
                    <Button
                      onClick={() => fetchNextPage()}
                      disabled={isFetching}
                    >
                      {isFetching && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}{' '}
                      Load more
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[50vh]">
                <span className="text-muted-foreground text-sm sm:text-base">
                  You have no item in your cart.
                </span>
              </div>
            ))}
        </div>

        <CartSummary />
      </div>
    </>
  );
};

export default CartContent;

const CartSummary: FC<{}> = () => {
  const { data, isLoading } = useCartSummary();

  const router = useRouter();

  return (
    <>
      <div className="dark:bg-secondary/30 shadow-sm rounded-xl border md:sticky md:top-[90px] self-start px-3 md:px-5 py-3 md:py-5 space-y-3">
        <h3 className="text-foreground/90 text-base sm:text-lg font-medium">
          Cart summary
        </h3>

        <Separator />

        {isLoading && !data && <CartSummarySkeleton />}

        {!isLoading && data && (
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Subtotal ({data.total_items} items)
              </span>

              <RegionalPriceFormat
                price={data.total_amount}
                className="text-sm sm:text-base font-medium"
              />
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

              <RegionalPriceFormat
                price={data.total_amount}
                className="text-lg sm:text-xl font-medium"
              />
            </li>
          </ul>
        )}

        <Separator />

        <div>
          <Button
            className="w-full"
            disabled={isLoading || (data && data.total_items === 0)}
            onClick={() => router.push('/user/cart/checkout')}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

const CartSummarySkeleton: FC = () => {
  return (
    <ul className="space-y-3">
      <li className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm sm:text-base font-medium flex items-center">
          Subtotal (<Skeleton className="inline-block h-4 w-4 mr-1" /> items)
        </span>

        <Skeleton className="h-4 w-32" />
      </li>

      <li className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm sm:text-base font-medium">
          Discount
        </span>

        <Skeleton className="h-4 w-32" />
      </li>

      <Separator />

      <li className="flex items-center justify-between">
        <span className="text-muted-foreground text-base sm:text-lg font-medium">
          Total
        </span>

        <Skeleton className="h-5 w-40" />
      </li>
    </ul>
  );
};
