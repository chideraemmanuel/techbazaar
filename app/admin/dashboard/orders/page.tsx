import AdminDashboardResourceSort from '@/app/admin/dashboard/_components/admin-dashboard-resource-sort';
import AdminDashboardResourceHeader from '@/app/admin/dashboard/_components/admin-dashboard-resource-header';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DUMMY_ORDERS, DUMMY_USERS } from '@/dummy';
import { cn } from '@/lib/cn';
import { FC, Suspense } from 'react';
import AdminDashboardUsersFilter from '@/app/admin/dashboard/_components/admin-dashboard-users-filter';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import EditOrderStatusDialog from '@/app/admin/dashboard/orders/_components/edit-order-status-dialog';
import AdminDashboardOrdersFilter from '@/app/admin/dashboard/_components/admin-dashboard-orders-filter';
import { getCurrentUser } from '@/lib/data/user';
import { getAllOrders } from '@/lib/data/order';
import { ISearchParams } from '@/types';
import formatDate from '@/lib/format-date';
import { ORDERS_SORT_ITEMS } from '@/constants';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { headers } from 'next/headers';
import RegionalPriceFormat from '@/components/regional-price-format';
import { Loader2 } from 'lucide-react';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const AdminDashboardOrdersPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname =
    headerList.get('x-current-path') || '/admin/dashboard/orders';

  const searchParamsObject = await searchParams;
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
          'container flex items-center justify-center min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]'
        )}
      >
        <p className="text-muted-foreground text-lg">
          Sorry, you are not authorized to view this page
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]'
        )}
      >
        <AdminDashboardResourceHeader
          title="Orders"
          subtitle="All orders"
          fetchFunction={getAllOrders}
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
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <Suspense
            fallback={
              <div className="h-[70vh] flex items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
            }
          >
            <OrdersTable searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardOrdersPage;

const tableHeaders = [
  '#',
  'user',
  'items',
  'total',
  'order date',
  'status',
  'actions',
];

const OrdersTable: FC<{ searchParams: ISearchParams }> = async ({
  searchParams,
}) => {
  const { data: orders, pagination } = await getAllOrders(searchParams);

  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3 bg-background p-5">
          <div className="space-x-2">
            <AdminDashboardOrdersFilter />

            <AdminDashboardResourceSort sort_items={ORDERS_SORT_ITEMS} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="font-medium text-xs bg-background/50 hover:bg-background/50">
              {tableHeaders.map((header, index) => (
                <TableHead
                  className={cn(
                    'capitalize min-w-[150px]',
                    index === 0 && 'min-w-5'
                  )}
                  key={index}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <TableRow
                  key={order._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell
                    title={`${order.user.first_name} ${order.user.last_name}`}
                  >
                    <span className="inline-block w-[170px] sm:w-[200px] truncate">
                      {order.user.first_name} {order.user.last_name}
                    </span>
                  </TableCell>

                  <TableCell>{order.items.length}</TableCell>

                  <TableCell>
                    <RegionalPriceFormat price={order.total_price} />
                  </TableCell>

                  <TableCell>
                    <span className="inline-block w-[150px] sm:w-[180px] truncate">
                      {formatDate(new Date(order.createdAt), 'en-us', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge className={cn('capitalize')} variant={'secondary'}>
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex items-center space-x-1">
                    <Button variant={'outline'} size={'sm'} asChild>
                      <Link href={`/admin/dashboard/orders/${order._id}`}>
                        View Details
                      </Link>
                    </Button>

                    <EditOrderStatusDialog order={order} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="h-24 text-center bg-background hover:bg-background"
                >
                  No orders to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="bg-background/50 border-t p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
          <DataTableItemsPerPage />

          <DataTablePagination
            totalPages={pagination.total_pages}
            totalPagesToDisplay={3}
          />
        </div>
      </div>
    </>
  );
};
