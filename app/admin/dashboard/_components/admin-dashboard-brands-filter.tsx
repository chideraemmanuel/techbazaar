'use client';

import { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiFilter3Line } from '@remixicon/react';
import { Switch } from '@/components/ui/switch';

interface Props {}

const AdminDashboardBrandsFilter: FC<Props> = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiFilter3Line />
            <span className="md:inline-block hidden">Filter</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-0">
          {/* <ScrollArea className="px-3 pt-5 pb-1 h-80"> */}
          <div className="space-y-3 px-3 py-5">
            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Deleted
              </span>

              <Switch />
            </div>
          </div>
          {/* </ScrollArea> */}

          <div className="px-2 pt-2 pb-2 flex items-center justify-between border-t border-muted">
            <Button variant={'outline'} size={'sm'}>
              Reset
            </Button>

            <Button size={'sm'}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminDashboardBrandsFilter;

const FilterSection: FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => {
  return (
    <>
      <div>
        <span className="block pb-2 text-sm font-medium text-foreground/80">
          {label}
        </span>

        {children}
      </div>
    </>
  );
};
