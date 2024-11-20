'use client';

import React, { FC } from 'react';
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
import { STORE_SIDEBAR_LINKS } from '@/constants';
import { Separator } from '@/components/ui/separator';
import SidebarLink from '@/components/sidebar-link';

interface Props {}

const StoreSidebar: FC<Props> = () => {
  return (
    <>
      <div>
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

          <SheetContent side={'left'}>
            <SheetHeader className="text-start items-start">
              <Logo />
            </SheetHeader>

            <div className="py-4">
              <nav>
                {STORE_SIDEBAR_LINKS.map((sidebar_link, index) => (
                  <React.Fragment key={index}>
                    <div className="py-4">
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
                    {index !== STORE_SIDEBAR_LINKS.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default StoreSidebar;
