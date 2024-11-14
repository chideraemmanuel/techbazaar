import CopyToClipboard from '@/components/copy-to-clipboard';
import EditOrderStatusDialog from '@/app/admin/dashboard/orders/_components/edit-order-status-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { FC } from 'react';
import formatDate from '@/lib/format-date';
import { getCurrentUser } from '@/lib/data/user';
import { getOrderById } from '@/lib/data/order';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import AdminDashboardResourceHeader from '../../_components/admin-dashboard-resource-header';
import { headers } from 'next/headers';
import RegionalPriceFormat from '@/components/regional-price-format';
import { cn } from '@/lib/cn';
import { BODY_MIN_HEIGHT_WITH_HEADER } from '@/constants';
import { delay } from '@/lib/delay';

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

const AdminDashboardOrderDetailsPage: FC<Props> = async ({ params }) => {
  const { orderId } = await params;

  const headerList = await headers();
  const pathname =
    headerList.get('x-current-path') || `/admin/dashboard/orders/${orderId}`;

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user.role !== 'admin') {
    return (
      <div
        className={cn(
          BODY_MIN_HEIGHT_WITH_HEADER,
          'container flex items-center justify-center'
        )}
      >
        <p className="text-muted-foreground text-lg">
          Sorry, you are not authorized to view this page
        </p>
      </div>
    );
  }

  const order = await getOrderById(orderId);

  if (!order) notFound();

  return (
    <>
      <div
        className={cn(
          BODY_MIN_HEIGHT_WITH_HEADER,
          'flex flex-col bg-secondary'
        )}
      >
        <AdminDashboardResourceHeader
          title="Order details"
          breadcrumbs={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin/dashboard/orders">Orders</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Order #{orderId}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <div className="bg-background rounded-2xl px-5 py-4">
            <div className="pb-4">
              <h2 className="pb-2 text-foreground font-bold text-xl md:text-2xl truncate">
                Order ID: #{order._id}
              </h2>

              <p className="flex items-center text-muted-foreground/80 text-sm font-medium">
                User ID:{' '}
                <span className="inline-block ml-2 text-muted-foreground">
                  #{user._id}
                </span>
                <CopyToClipboard text={user._id} className="ml-2" toast={true}>
                  <CopyIcon className="w-4 h-4" />
                </CopyToClipboard>
              </p>
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

                    <span className="text-base font-medium">
                      {product.name}
                    </span>
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

              <BillingDetail
                label="Status"
                value={order.status.toUpperCase()}
              />

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
                <EditOrderStatusDialog order={order} />

                <Button>
                  <Link href={`/admin/dashboard/users/${user._id}`}>
                    View user
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardOrderDetailsPage;

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
