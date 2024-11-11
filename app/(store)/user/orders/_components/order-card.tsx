import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import { IOrder } from '@/types/cart';
import Link from 'next/link';
import { FC } from 'react';
import CancelOrderDialog from './cancel-order-dialog';

interface Props {
  order: IOrder;
}

const OrderCard: FC<Props> = ({ order }) => {
  return (
    <>
      <div className="bg-secondary/20 dark:bg-secondary/30 border shadow-sm rounded-lg space-y-3 sm:space-y-5">
        <div className="pt-3 sm:pt-5 px-3 sm:px-5 space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <h2 className="md:text-lg lg:text-xl font-semibold">
              Order ID: #{order._id}
            </h2>

            <Badge className={cn('capitalize')} variant={'secondary'}>
              {order.status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 pt-1 sm:pt-2">
            <span className="text-foreground/90 text-sm font-medium">
              Items:{' '}
              <span className="text-muted-foreground">
                {order.items.length}
              </span>
            </span>
            <span className="text-foreground/90 text-sm font-medium">
              Total price:{' '}
              <span className="text-muted-foreground">
                ₦{order.total_price}
              </span>
            </span>
          </div>
        </div>

        <Separator />

        <div className="pb-3 sm:pb-5 px-3 sm:px-5 flex items-center justify-end gap-3">
          <Link
            href={`/user/orders/${order._id}`}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            View details
          </Link>

          <CancelOrderDialog
            order={order}
            disabled={
              order.status === 'in-transit' ||
              // order.status === 'dispatched' ||
              order.status === 'partially-shipped' ||
              order.status === 'shipped' ||
              order.status === 'out-for-delivery' ||
              order.status === 'delivered' ||
              order.status === 'cancelled'
            }
          />
        </div>
      </div>
    </>
  );
};

export default OrderCard;
