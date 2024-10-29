import CartItem from '@/components/cart-item';
import DataTablePagination from '@/components/data-table-pagination';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DUMMY_PRODUCTS } from '@/dummy';
import Link from 'next/link';
import { FC } from 'react';

interface Props {}

const UserCartPage: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];
  return (
    <>
      <div className="container py-5">
        <div className="pb-4 md:pb-5">
          <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            Hello, Chidera
          </span>

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            Your cart
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] lg:grid-cols-[6fr_3fr] gap-5">
          <div className="dark:bg-secondary/30 shadow-sm px-3 md:px-5 py-3 md:py-5 rounded-xl border space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-foreground/90 text-sm sm:text-base font-medium">
                Cart items <span className="text-muted-foreground">(7)</span>
              </h2>

              <Button
                variant={'destructive'}
                className="h-7 sm:h-9 rounded-md px-3"
              >
                Clear cart
              </Button>
            </div>

            {/* <div className="space-y-3">
              {Array.from({ length: 7 }).map((item, index) => (
                <CartItem key={index} />
              ))}
            </div>

            <DataTablePagination totalPages={50} totalPagesToDisplay={3} /> */}

            <div className="flex items-center justify-center h-[50vh]">
              <span className="text-muted-foreground text-sm sm:text-base">
                You have no item in your cart.
              </span>
            </div>
          </div>
          {/* px-3 md:px-5 py-3 md:py-5 */}
          <div className="dark:bg-secondary/30 shadow-sm rounded-xl border md:sticky md:top-[90px] self-start py-3 md:py-5 mb-5 space-y-3">
            <h3 className="text-foreground/90 text-base sm:text-lg font-medium px-3 md:px-5">
              Cart summary
            </h3>

            <div className="px-3 md:px-5">
              <Separator />
            </div>

            {/* <div className="h-72"> */}
            <ScrollArea className="h-52 space-y-3 px-3 md:px-5">
              <ul className="space-y-3 pb-5">
                {Array.from({ length: 17 }).map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm sm:text-base">
                      {product.name}{' '}
                      <span className="text-muted-foreground/70">(x1)</span>
                    </span>

                    <span className="text-sm sm:text-base font-medium">
                      ₦{product.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            {/* </div> */}

            <div className="px-3 md:px-5">
              <Separator />
            </div>

            <ul className="space-y-3 px-3 md:px-5">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm sm:text-base font-medium">
                  Subtotal
                </span>

                <span className="text-sm sm:text-base font-medium">
                  ₦{product.price.toFixed(2)}
                </span>
              </li>

              <li className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm sm:text-base font-medium">
                  Discount
                </span>

                <span className="text-sm sm:text-base font-medium">₦0.00</span>
              </li>

              {/* <Separator /> */}

              <li className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm sm:text-base font-medium">
                  Total
                </span>

                <span className="text-base sm:text-lg font-medium">
                  ₦{product.price.toFixed(2)}
                </span>
              </li>
            </ul>

            <div className="px-3 md:px-5">
              <Button asChild className="w-full">
                <Link href={'#'}>Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCartPage;
