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

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const AdminDashboardUserDetailsPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const user = DUMMY_USERS[0];

  if (!user) notFound();

  const dateFormatter = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'long',
    // timeStyle: 'medium',
  });

  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <div className="sticky top-16 md:top-20 z-[1] p-5 border-b bg-background">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">
              Breadcrumbs here!
            </span>

            <h1 className="pb-3 pt-2 text-foreground font-bold text-2xl">
              User details
            </h1>

            {/* <span className="text-foreground/90 text-base font-medium">
              {user.first_name}'s details
            </span> */}
          </div>
        </div>

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
                value={`${dateFormatter.format(user.createdAt)}`}
              />
            </div>

            <Separator />

            <div className="pt-4">
              <span className="inline-block pb-3 text-muted-foreground">
                Actions:
              </span>

              <div className="flex justify-start items-center gap-5">
                <EditUserRoleDialog />

                {user.disabled ? <EnableUserDialog /> : <DisableUserDialog />}

                <DeleteUserDialog />

                <Button>
                  <Link href={`/admin/dashboard/users/1/orders`}>
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
