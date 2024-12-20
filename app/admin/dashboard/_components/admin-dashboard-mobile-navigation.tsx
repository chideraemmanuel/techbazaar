'use client';

import { FC } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RiMenuLine } from '@remixicon/react';
import Logo from '@/components/logo';
import { ADMIN_DASHBAORD_SIDEBAR_LINKS } from '@/constants';
import SidebarLink from '../../../../components/sidebar-link';
import { Separator } from '@/components/ui/separator';

interface Props {}

const AdminDashboardMobileNavigation: FC<Props> = () => {
  return (
    <>
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className="h-8 sm:h-10 w-8 sm:w-10"
            >
              <RiMenuLine className="sm:!w-5 sm:!h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side={'left'} className="block xl:hidden">
            <SheetHeader className="text-start items-start">
              <Logo />
            </SheetHeader>

            <div className="py-4">
              <nav>
                {ADMIN_DASHBAORD_SIDEBAR_LINKS.map((sidebar_link, index) => (
                  <div className="py-4" key={index}>
                    <span className="inline-block px-4 pb-2 font-medium text-muted-foreground text-xs leading-[140%] tracking-[-0.8%] uppercase">
                      {sidebar_link.title}
                    </span>

                    <ul className="flex flex-col gap-1">
                      {sidebar_link.items.map((link_item, index) => (
                        <li key={index}>
                          <SheetClose asChild>
                            <SidebarLink {...link_item} />
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <Separator />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminDashboardMobileNavigation;
