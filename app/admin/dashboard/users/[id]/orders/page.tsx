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
import { FC } from 'react';
import AdminDashboardUsersFilter from '@/app/admin/dashboard/_components/admin-dashboard-users-filter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EditOrderStatusDialog from '@/app/admin/dashboard/orders/_components/edit-order-status-dialog';
import AdminDashboardOrdersFilter from '@/app/admin/dashboard/_components/admin-dashboard-orders-filter';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const AdminDashboardUserOrdersPage: FC<Props> = async ({ params }) => {
  const { id: userId } = await params;
  const user = DUMMY_USERS[0];

  if (!user) notFound();
  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <AdminDashboardResourceHeader
          title={`${user.first_name}'s Orders`}
          total={10}
        />

        <div className="flex-1 p-5 space-y-7">
          <OrdersTable />
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

const OrdersTable: FC = () => {
  const user = DUMMY_USERS[0];

  if (!user) notFound();

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3 bg-background p-5">
          <div className="space-x-2">
            <AdminDashboardOrdersFilter />

            <AdminDashboardResourceSort sort_items={[]} />
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
            {DUMMY_ORDERS && DUMMY_ORDERS.length > 0 ? (
              DUMMY_ORDERS.map((order, index) => (
                <TableRow
                  key={order._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell title={`${user.first_name} ${user.last_name}`}>
                    <span className="inline-block w-[170px] sm:w-[200px] truncate">
                      {user.first_name} {user.last_name}
                    </span>
                  </TableCell>

                  <TableCell>{order.items.length}</TableCell>

                  <TableCell>{order.total_price}</TableCell>

                  <TableCell>
                    <span className="inline-block w-[150px] sm:w-[180px] truncate">
                      {dateFormatter.format(order.createdAt)}
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

                    <EditOrderStatusDialog />
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

          <DataTablePagination totalPages={50} totalPagesToDisplay={3} />
        </div>
      </div>
    </>
  );
};
