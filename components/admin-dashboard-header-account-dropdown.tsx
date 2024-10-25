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

interface Props {}

const AdminDashboardHeaderUserDropdown: FC<Props> = () => {
  const user = {
    first_name: 'Chidera',
    last_name: 'Emmanuel',
    email: 'chidera@email.com',
  };

  return (
    <>
      <DropdownMenu>
        {/* {isFetchingUser && !user && (
          <Skeleton className="hidden md:inline-block h-10 md:h-14 w-10 md:w-14 rounded-full" />
        )} */}

        {/* {!isFetchingUser && user && ( */}
        <>
          <DropdownMenuTrigger asChild>
            <button className="p-1 lg:p-2 rounded-full flex items-center gap-2 bg-secondary">
              <Avatar className="w-8 md:w-10 md:h-10 h-8">
                <AvatarFallback className="bg-primary text-primary-foreground font-medium text-lg md:text-2xl tracking-[-3.44%]">
                  {user.first_name && user.first_name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="hidden lg:flex items-center gap-3">
                <span className="text-secondary-foreground font-medium text-sm leading-[140%] tracking-[-0.44%] inline-block w-[70%] truncate">
                  {user.first_name} {user.last_name}
                </span>

                <span>
                  <RiArrowDownSLine />
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[242px] flex flex-col gap-2 p-2"
            align="end"
          >
            <CurrentUser
              user={{
                first_name: 'Chidera',
                last_name: 'Emmanuel',
                email: 'chidera@email.com',
              }}
            />

            <DropdownMenuItem asChild>
              <Link href={`#`} className="">
                <RiUserLine className="h-4 w-4" />
                <span>Manage profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="text-[#EB5757] focus:text-[#EB5757] focus:bg-[rgba(235,_87,_87,_0.3)]"
            >
              <button
                className="flex items-center gap-2 p-4 rounded-[8px]"
                //   onClick={() => logout()}
              >
                <RiLogoutCircleLine className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
        {/* )} */}
      </DropdownMenu>
    </>
  );
};

export default AdminDashboardHeaderUserDropdown;
