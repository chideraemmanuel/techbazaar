import { FC } from 'react';
import CurrentUser from './current-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  RiArrowDownSLine,
  RiLogoutCircleLine,
  RiUserLine,
} from '@remixicon/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import getCurrentUser from '@/lib/data/get-current-user';
import LogoutUserButton from './logout-user-button';
import { headers } from 'next/headers';

interface Props {}

const AdminDashboardHeaderUserDropdown: FC<Props> = async ({}) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${pathname}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${pathname}`);
  }

  return (
    <>
      <DropdownMenu>
        {/* {isFetchingUser && !user && (
          <Skeleton className="hidden md:inline-block h-10 md:h-14 w-10 md:w-14 rounded-full" />
        )} */}

        <>
          <DropdownMenuTrigger asChild>
            <button className="p-1 lg:p-2 rounded-full flex items-center gap-2 bg-secondary">
              <Avatar className="w-8 md:w-10 md:h-10 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground font-medium text-lg md:text-xl">
                  {user.first_name && user.first_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="hidden lg:flex items-center gap-3">
                <span className="text-secondary-foreground font-medium text-sm inline-block w-[70%] truncate">
                  {user.first_name} {user.last_name}
                </span>

                <span>
                  <RiArrowDownSLine />
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex flex-col gap-2 p-2" align="end">
            <CurrentUser user={user} />

            <DropdownMenuItem asChild>
              <Link href={`#`} className="">
                <RiUserLine className="h-4 w-4" />
                <span>Manage profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <LogoutUserButton className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <RiLogoutCircleLine className="h-4 w-4" />
                <span>Logout</span>
              </LogoutUserButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      </DropdownMenu>
    </>
  );
};

export default AdminDashboardHeaderUserDropdown;
