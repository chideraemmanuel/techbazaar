'use client';

import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import SelectInput from '@/components/select-input';
import { ORDER_STATUSES_SORT_ITEMS } from '@/constants';
import { IOrder, OrderStatus } from '@/types/cart';
import useUpdateOrderStatus from '@/lib/hooks/order/use-update-order-status';

type EditOrderStatusDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  order: IOrder;
};

type EditOrderStatusDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const EditOrderStatusDialog = React.forwardRef<
  EditOrderStatusDialogTriggerRef,
  EditOrderStatusDialogTriggerProps
>(({ className, order, ...props }, ref) => {
  const [orderStatus, setOrderStatus] = React.useState(order.status);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: updateOrderStatus,
    isLoading: isUpdatingOrderStatus,
    isSuccess: orderStatusUpdateSuccess,
  } = useUpdateOrderStatus();

  React.useEffect(() => {
    if (orderStatusUpdateSuccess) {
      setDialogOpen(false);
    }
  }, [orderStatusUpdateSuccess]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Edit order status"
            {...props}
          >
            <Pencil />
            <span className="sr-only">Edit order status</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit order status</AlertDialogTitle>
          </AlertDialogHeader>

          <div>
            <SelectInput
              placeholder="Select status"
              selectInputItemProps={{ className: 'capitalize' }}
              selectInputItems={ORDER_STATUSES_SORT_ITEMS}
              defaultValue={order.status}
              onItemSelect={(value) => setOrderStatus(value as OrderStatus)}
              disabled={isUpdatingOrderStatus}
            />
          </div>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel disabled={isUpdatingOrderStatus}>
              Cancel
            </AlertDialogCancel>

            <Button
              disabled={isUpdatingOrderStatus || orderStatus === order.status}
              onClick={() =>
                updateOrderStatus({ orderId: order._id, status: orderStatus })
              }
            >
              {isUpdatingOrderStatus && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

export default EditOrderStatusDialog;
