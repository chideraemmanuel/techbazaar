'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useCancelOrder from '@/lib/hooks/order/use-cancel-order';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';
import { IOrder } from '@/types/cart';
import { Loader2 } from 'lucide-react';
import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';

type CancelOrderDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  order: IOrder;
};

type CancelOrderDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const CancelOrderDialog = React.forwardRef<
  CancelOrderDialogTriggerRef,
  CancelOrderDialogTriggerProps
>(({ order, ...props }, ref) => {
  const axios = useAxiosPrivate();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: cancelOrder,
    isLoading: isCancellingOrder,
    isSuccess: orderCancellationSuccessful,
  } = useCancelOrder();

  React.useEffect(() => {
    if (orderCancellationSuccessful) {
      setDialogOpen(false);
    }
  }, [orderCancellationSuccessful]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button {...props} variant={'destructive'} size={'sm'} ref={ref}>
            Cancel order
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel disabled={isCancellingOrder}>
              Close
            </AlertDialogCancel>

            <Button
              variant={'destructive'}
              onClick={() => cancelOrder({ axios, orderId: order._id })}
              disabled={isCancellingOrder}
            >
              {isCancellingOrder && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Cancel order
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

export default CancelOrderDialog;
