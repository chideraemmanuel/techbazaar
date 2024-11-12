'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DUMMY_PRODUCTS } from '@/dummy';
import useCurrentUserCart from '@/lib/hooks/cart/use-current-user-cart';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';
import OrderItem from './order-item';
import useCartSummary from '@/lib/hooks/cart/use-cart-summary';
import BillingInformationForm, {
  BillingInformationFormTypes,
} from '@/app/(store)/user/cart/_components/billing-information-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBillingInformation } from '@/types/cart';
import usePlaceOrder from '@/lib/hooks/order/use-place-order';

interface Props {
  saved_billing_information: IBillingInformation | null;
}

const CheckoutContent: FC<Props> = ({ saved_billing_information }) => {
  const [useSavedBillingInfo, setUseSavedBillingInfo] = React.useState(false);

  const { mutate: placeOrder, isLoading: isPlacingOrder } = usePlaceOrder();

  const form = useForm<BillingInformationFormTypes>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
  } = form;

  const onSubmit: SubmitHandler<BillingInformationFormTypes> = (data, e) => {
    console.log('billing information data', data);

    placeOrder({
      billing_information: data,
    });
  };

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-[6fr_4fr] lg:grid-cols-[6fr_3fr] gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="dark:bg-secondary/30 shadow-sm px-3 md:px-5 py-5 md:py-7 rounded-xl border self-start space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="text-foreground/90 text-xl sm:text-2xl font-medium">
              Billing information
            </h2>

            {saved_billing_information && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Use saved</span>

                <Checkbox
                  checked={useSavedBillingInfo}
                  onCheckedChange={(checked) =>
                    setUseSavedBillingInfo(checked as boolean)
                  }
                />
              </div>
            )}
          </div>

          {!useSavedBillingInfo && (
            <BillingInformationForm
              form={form}
              isPlacingOrder={isPlacingOrder}
            />
          )}

          {saved_billing_information && useSavedBillingInfo && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Address:
                </span>

                <span className="text-foreground font-medium text-sm sm:text-base">
                  {`${saved_billing_information.address.street}, ${saved_billing_information.address.city}, ${saved_billing_information.address.state}, ${saved_billing_information.address.country}.`}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Receipent:
                </span>

                <span className="text-foreground font-medium text-sm sm:text-base">
                  {saved_billing_information.receipent.first_name}{' '}
                  {saved_billing_information.receipent.last_name}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="text-muted-foreground text-sm sm:text-base">
                  Mobile number:
                </span>

                <span className="text-foreground font-medium text-sm sm:text-base">
                  {saved_billing_information.receipent.mobile_number}
                </span>
              </div>
            </div>
          )}
        </div>

        <OrderSummary
          isPlacingOrder={isPlacingOrder}
          use_saved_billing_information={useSavedBillingInfo}
          placeOrder={placeOrder}
        />
      </form>
    </>
  );
};

export default CheckoutContent;

const OrderSummary: FC<{
  isPlacingOrder: boolean;
  use_saved_billing_information: boolean;
  placeOrder: any;
}> = ({ isPlacingOrder, use_saved_billing_information, placeOrder }) => {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useCurrentUserCart();

  const { data: cart_summary, isLoading: isLoadingCartSummary } =
    useCartSummary();

  return (
    <>
      <div className="dark:bg-secondary/30 shadow-sm rounded-xl border md:sticky md:top-[90px] self-start py-3 md:py-5 mb-5 space-y-3">
        <h3 className="text-foreground/90 text-base sm:text-lg font-medium px-3 md:px-5">
          Order summary
        </h3>

        <div className="px-3 md:px-5">
          <Separator />
        </div>

        {data &&
          (data.pages[0].data.length > 1 || hasNextPage ? (
            <ScrollArea className="h-40 sm:h-52 space-y-3 px-3 md:px-5 pb-5">
              <div className="space-y-3 h-full">
                {data.pages.map((group, index) => (
                  <React.Fragment key={index}>
                    {group.data.map((cart_item) => (
                      <OrderItem key={cart_item._id} order_item={cart_item} />
                    ))}
                  </React.Fragment>
                ))}

                {hasNextPage && (
                  <Button
                    size={'sm'}
                    variant={'link'}
                    onClick={() => fetchNextPage()}
                    disabled={isFetching}
                  >
                    {isFetching && <Loader2 className="h-4 w-4 animate-spin" />}{' '}
                    Load more
                  </Button>
                )}
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-3 px-3 md:px-5">
              {data.pages.map((group, index) => (
                <React.Fragment key={index}>
                  {group.data.map((cart_item) => (
                    <OrderItem key={cart_item._id} order_item={cart_item} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}

        <div className="px-3 md:px-5">
          <Separator />
        </div>

        <div className="px-3 md:px-5 space-y-1">
          <span className="text-foreground/80 font-medium text-sm">
            Got a coupon code?
          </span>

          <div className="flex items-center gap-1">
            {/* <FormInput placeholder="Enter code" className="h-9" /> */}
            <Input placeholder="Enter code" />
            <Button className="h-9 font-normal" type="button">
              Apply
            </Button>
          </div>
        </div>

        <div className="px-3 md:px-5">
          <Separator />
        </div>

        {!isLoadingCartSummary && cart_summary && (
          <ul className="space-y-3 px-3 md:px-5">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Subtotal ({cart_summary.total_items} items)
              </span>

              <span className="text-foreground/70 text-sm sm:text-base font-medium">
                ₦{cart_summary.total_amount.toFixed(2)}
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Discount
              </span>

              <span className="text-foreground/70 text-sm sm:text-base font-medium">
                ₦0.00
              </span>
            </li>

            <Separator />

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm sm:text-base font-medium">
                Total
              </span>

              <span className="text-base sm:text-lg font-medium">
                ₦{cart_summary.total_amount.toFixed(2)}
              </span>
            </li>
          </ul>
        )}

        <div className="px-3 md:px-5">
          <Separator />
        </div>

        <div className="px-3 md:px-5">
          {use_saved_billing_information ? (
            <Button
              className="w-full"
              type="button"
              disabled={isPlacingOrder}
              onClick={() =>
                placeOrder({
                  use_saved_billing_information: true,
                })
              }
            >
              {isPlacingOrder && <Loader2 className="h-4 w-4 animate-spin" />}
              Place order
            </Button>
          ) : (
            <Button className="w-full" disabled={isPlacingOrder}>
              {isPlacingOrder && <Loader2 className="h-4 w-4 animate-spin" />}
              Place order
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
