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
import formatDate from '@/lib/format-date';
import { getCurrentUser, getUserById } from '@/lib/data/user';
import { ISearchParams } from '@/types';
import { ORDERS_SORT_ITEMS } from '@/constants';
import { getUserOrders } from '@/lib/data/order';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<ISearchParams>;
}

const AdminDashboardUserOrdersPage: FC<Props> = async ({
  params,
  searchParams,
}) => {
  const { id: userId } = await params;
  const searchParamsObject = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=/admin/dashboard/users/${userId}/orders`);
  }

  if (user && !user.email_verified) {
    redirect(
      `/auth/verify-email?return_to=/admin/dashboard/users/${userId}/orders`
    );
  }

  if (user.role !== 'admin') {
    return <p>Sorry, you are not authorized to view this page</p>;
  }

  const userExists = await getUserById(userId);

  if (!userExists) notFound();

  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <AdminDashboardResourceHeader
          title={`${user.first_name}'s Orders`}
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
                    <Link href="/admin/dashboard/users">Users</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbEllipsis className="h-4 w-4" />

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{user.first_name}'s Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <Suspense>
            <OrdersTable userId={userId} searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardUserOrdersPage;

const headers = [
  '#',
  'user',
  'items',
  'total',
  'order date',
  'status',
  'actions',
];

const OrdersTable: FC<{
  userId: string;
  searchParams: ISearchParams;
}> = async ({ userId, searchParams }) => {
  const { data: orders, pagination } = await getUserOrders(
    userId,
    searchParams
  );

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
              {headers.map((header, index) => (
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

                  <TableCell>{order.total_price}</TableCell>

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
                      <Link href={`/admin/dashboard/orders/1`}>
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
                  colSpan={headers.length}
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
