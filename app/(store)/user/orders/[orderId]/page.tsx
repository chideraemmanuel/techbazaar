import CopyToClipboard from '@/components/copy-to-clipboard';
import { Separator } from '@/components/ui/separator';
import { getCurrentUserOrderById } from '@/lib/data/order';
import { getCurrentUser } from '@/lib/data/user';
import formatDate from '@/lib/format-date';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { FC } from 'react';
import CancelOrderDialog from '../_components/cancel-order-dialog';
import { headers } from 'next/headers';
import RegionalPriceFormat from '@/components/regional-price-format';

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

const OrderDetailsPage: FC<Props> = async ({ params }) => {
  const { orderId } = await params;

  const headerList = await headers();
  const pathname =
    headerList.get('x-current-path') || `/user/orders/${orderId}`;

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }

  const order = await getCurrentUserOrderById(orderId);

  if (!order) notFound();

  return (
    <>
      <div className="container p-5 space-y-7">
        <div className="bg-background rounded-2xl px-5 py-4">
          <div className="pb-4">
            <CopyToClipboard
              text={user._id}
              toast={true}
              className="pb-2 text-foreground font-bold text-xl md:text-2xl truncate"
            >
              Order ID: #{order._id}
            </CopyToClipboard>
          </div>

          <Separator />

          <div className="pt-4 pb-6 flex flex-col gap-3">
            {order.items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-5 w-[min(100%,_500px)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[70px] h-[70px] object-cover bg-secondary p-2 rounded">
                    <Image
                      className="w-full h-full"
                      src={product.image}
                      alt={product.name}
                      width={426}
                      height={585}
                    />
                  </div>

                  <span className="text-base font-medium">{product.name}</span>
                </div>

                <div className="space-y-1 sm:text-end">
                  <RegionalPriceFormat
                    price={product.price}
                    className="block font-semibold text-lg"
                  />

                  <span className="block text-muted-foreground text-sm">
                    Quantity: {quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="pt-4 pb-6 flex flex-col gap-3">
            <span className="text-lg font-semibold text-muted-foreground pb-2">
              Order Information
            </span>

            <BillingDetail
              label="Total price"
              value={
                <RegionalPriceFormat
                  price={order.total_price}
                  className="text-foreground font-medium text-sm"
                />
              }
            />

            <BillingDetail label="Status" value={order.status.toUpperCase()} />

            <BillingDetail
              label="Order date"
              value={`${formatDate(new Date(order.createdAt), 'en-us', {
                dateStyle: 'long',
              })}`}
            />
          </div>

          <Separator />

          <div className="pt-4 pb-6 flex flex-col gap-3">
            <span className="text-lg font-semibold text-muted-foreground pb-2">
              Billing Information
            </span>
            <BillingDetail
              label="Address"
              value={`${order.billing_information.address.street}, ${order.billing_information.address.city}, ${order.billing_information.address.state}, ${order.billing_information.address.country}.`}
            />
            <BillingDetail
              label="Receipent"
              value={`${order.billing_information.receipent.first_name} ${order.billing_information.receipent.last_name}`}
            />
            <BillingDetail
              label="Mobile number"
              value={order.billing_information.receipent.mobile_number}
            />
          </div>

          <Separator />

          <div className="pt-4">
            <span className="inline-block pb-3 text-muted-foreground">
              Actions:
            </span>

            <div className="flex justify-start items-center gap-5">
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
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;

const BillingDetail: FC<{ label: string; value: string | React.ReactNode }> = ({
  label,
  value,
}) => {
  return (
    <>
      <div className="flex gap-2">
        <span className="text-muted-foreground text-sm">{label}:</span>

        {typeof value === 'string' ? (
          <span className="text-foreground font-medium text-sm">{value}</span>
        ) : (
          value
        )}
      </div>
    </>
  );
};
