import { getCurrentUser } from '@/lib/data/user';
import { UserTypes } from '@/types/user';
import { FC } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CurrentUser from '@/components/current-user';
import Link from 'next/link';
import {
  RiHeartLine,
  RiLogoutCircleLine,
  RiShoppingBagLine,
  RiUserLine,
} from '@remixicon/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { ChartColumn, User } from 'lucide-react';
import { cn } from '@/lib/cn';
import LogoutUserButton from '@/components/logout-user-button';

interface Props {}

const StoreHeaderAccountDropdown: FC<Props> = async () => {
  const user = await getCurrentUser();

  return (
    <>{user ? <ActiveUserDropdown user={user} /> : <InactiveUserDropdown />}</>
  );
};

export default StoreHeaderAccountDropdown;

const ActiveUserDropdown: FC<{ user: UserTypes }> = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-1 rounded-full bg-secondary">
          <Avatar className="w-8 md:w-10 md:h-10 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground font-medium text-lg md:text-xl">
              {user.first_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex flex-col gap-2 p-2" align="end">
          <CurrentUser user={user} />

          <DropdownMenuItem asChild>
            <Link href={`/user/wishlist`}>
              <RiHeartLine className="h-4 w-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`#`}>
              <RiUserLine className="h-4 w-4" />
              <span>Manage profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/user/orders`}>
              <RiShoppingBagLine className="h-4 w-4" />
              <span>My orders</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/admin/dashboard`}>
              <ChartColumn className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <LogoutUserButton className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <RiLogoutCircleLine className="h-4 w-4" />
              <span>Logout</span>
            </LogoutUserButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const InactiveUserDropdown: FC = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            size={'icon'}
            className="h-8 sm:h-10 w-8 sm:w-10 data-[state=open]:bg-accent data-[state=open]:outline-none data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2"
          >
            <User className="sm:!w-5 sm:!h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[242px] flex flex-col gap-2 p-2"
          align="end"
        >
          <DropdownMenuItem asChild>
            <Link href={`/admin/dashboard`}>
              <ChartColumn className="h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={'/auth/login'}
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'w-full focus:!bg-primary/90 hover:!ring-0 hover:!ring-offset-0'
              )}
            >
              Sign in
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
