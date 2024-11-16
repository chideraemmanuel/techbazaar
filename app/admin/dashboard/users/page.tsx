import AdminDashboardResourceSort from '@/app/admin/dashboard/_components/admin-dashboard-resource-sort';
import AdminDashboardResourceHeader from '@/app/admin/dashboard/_components/admin-dashboard-resource-header';
import BooleanBadge from '@/components/boolean-badge';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import ResourceSearch from '@/components/resource-search';
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
import { DUMMY_USERS } from '@/dummy';
import { cn } from '@/lib/cn';
import { Loader2, Search } from 'lucide-react';
import { FC, Suspense } from 'react';
import DeleteUserDialog from '@/app/admin/dashboard/users/_components/delete-user-dialog';
import EditUserRoleDialog from '@/app/admin/dashboard/users/_components/edit-user-role-dialog';
import AdminDashboardUsersFilter from '@/app/admin/dashboard/_components/admin-dashboard-users-filter';
import Link from 'next/link';
import {
  DisableUserDialog,
  EnableUserDialog,
} from '@/app/admin/dashboard/users/_components/enable-disable-user-dialogs';
import { ISearchParams } from '@/types';
import { getAllUsers, getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { USERS_SORT_ITEMS } from '@/constants';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { headers } from 'next/headers';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const AdminDashboardUsersPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/admin/dashboard/users';

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
          title="Users"
          subtitle="All users"
          fetchFunction={getAllUsers}
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
                  <BreadcrumbPage>Users</BreadcrumbPage>
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
            <UsersTable searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardUsersPage;

const tableHeaders = [
  '#',
  'name',
  'email',
  'email verified',
  'auth type',
  'role',
  'disabled',
  'actions',
];

const UsersTable: FC<{ searchParams: ISearchParams }> = async ({
  searchParams,
}) => {
  const { data: users, pagination } = await getAllUsers(searchParams);

  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-background p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />

            <ResourceSearch
              placeholder="Search users..."
              className="shadow-sm text-base dark:bg-secondary/50 pl-10"
            />
          </div>

          <div className="space-x-2">
            <AdminDashboardUsersFilter />

            <AdminDashboardResourceSort sort_items={USERS_SORT_ITEMS} />
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
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <TableRow
                  key={user._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell title={`${user.first_name} ${user.last_name}`}>
                    <span className="inline-block w-[170px] sm:w-[200px] truncate">
                      {user.first_name} {user.last_name}
                    </span>
                  </TableCell>

                  <TableCell title={user.email}>
                    <span className="inline-block w-[150px] sm:w-[180px] truncate">
                      {user.email}
                    </span>
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={user.email_verified}>
                      {`${user.email_verified}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell className="capitalize">{user.auth_type}</TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        'capitalize',
                        user.role === 'admin'
                          ? 'bg-orange-200 text-orange-700'
                          : ''
                      )}
                      variant={'secondary'}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={user.disabled}>
                      {`${user.disabled}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell className="flex items-center space-x-1">
                    <Button variant={'outline'} size={'sm'} asChild>
                      <Link href={`/admin/dashboard/users/${user._id}`}>
                        View Details
                      </Link>
                    </Button>

                    <EditUserRoleDialog user={user} />

                    {user.disabled ? (
                      <EnableUserDialog user={user} />
                    ) : (
                      <DisableUserDialog user={user} />
                    )}

                    <DeleteUserDialog />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="h-24 text-center bg-background hover:bg-background"
                >
                  No users to display
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
