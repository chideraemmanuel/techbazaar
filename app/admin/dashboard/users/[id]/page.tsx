import CopyToClipboard from '@/components/copy-to-clipboard';
import DeleteUserDialog from '@/app/admin/dashboard/users/_components/delete-user-dialog';
import EditUserRoleDialog from '@/app/admin/dashboard/users/_components/edit-user-role-dialog';
import {
  DisableUserDialog,
  EnableUserDialog,
} from '@/app/admin/dashboard/users/_components/enable-disable-user-dialogs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DUMMY_USERS } from '@/dummy';
import { CopyIcon, UserX } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import formatDate from '@/lib/format-date';
import { getUserById } from '@/lib/data/user';
import AdminDashboardResourceHeader from '../../_components/admin-dashboard-resource-header';
import {
  Breadcrumb,
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
}

const AdminDashboardUserDetailsPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <AdminDashboardResourceHeader
          title="User details"
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
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {user.first_name} {user.last_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <div className="bg-background rounded-2xl px-5 py-4">
            <div className="pb-4">
              <h2 className="pb-2 text-foreground font-bold text-xl md:text-2xl truncate">
                {user.first_name} {user.last_name}
              </h2>

              <p className="flex items-center text-muted-foreground/80 text-sm font-medium">
                User ID:{' '}
                <span className="inline-block ml-2 text-muted-foreground">
                  #{user._id}
                </span>
                <CopyToClipboard text={user._id} className="ml-2">
                  <CopyIcon className="w-4 h-4" />
                </CopyToClipboard>
              </p>
            </div>

            <Separator />

            <div className="pt-4 pb-6 flex flex-col gap-3">
              <UserDetail label="First Name" value={user.first_name} />
              <UserDetail label="Last Name" value={user.last_name} />
              <UserDetail label="Email Address" value={user.email} />
              <UserDetail
                label="Email Verified"
                value={`${user.email_verified}`}
              />
              <UserDetail label="Authentication Type" value={user.auth_type} />
              <UserDetail label="Role" value={user.role.toUpperCase()} />
              <UserDetail label="Disabled" value={`${user.disabled}`} />
              <UserDetail
                label="Joined"
                value={`${formatDate(new Date(user.createdAt), 'en-us', {
                  dateStyle: 'long',
                })}`}
              />
            </div>

            <Separator />

            <div className="pt-4">
              <span className="inline-block pb-3 text-muted-foreground">
                Actions:
              </span>

              <div className="flex justify-start items-center gap-5">
                <EditUserRoleDialog user={user} />

                {user.disabled ? (
                  <EnableUserDialog user={user} />
                ) : (
                  <DisableUserDialog user={user} />
                )}

                <DeleteUserDialog />

                <Button>
                  <Link href={`/admin/dashboard/users/${user._id}/orders`}>
                    View Orders
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

export default AdminDashboardUserDetailsPage;

const UserDetail: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <>
      <div className="flex gap-2">
        <span className="text-muted-foreground text-sm">{label}:</span>

        <span className="text-foreground font-medium text-sm">{value}</span>
      </div>
    </>
  );
};
