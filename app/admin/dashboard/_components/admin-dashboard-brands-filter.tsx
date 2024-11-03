'use client';

import React, { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiFilter3Line } from '@remixicon/react';
import { Switch } from '@/components/ui/switch';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {}

const AdminDashboardBrandsFilter: FC<Props> = () => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const isDeletedParam = searchParams.get('is_deleted');

  const [isDeleted, setIsDeleted] = React.useState(isDeletedParam);

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('is_deleted');

    if (isDeleted) {
      newSearchParams.set('is_deleted', isDeleted);
    }

    router.replace(`?${newSearchParams}`);

    setPopoverOpen(false);
  };

  const resetFilter = () => {
    setIsDeleted(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('is_deleted');

    router.replace(`?${newSearchParams}`);

    setPopoverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiFilter3Line />
            <span className="md:inline-block hidden">Filter</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-0">
          <div className="space-y-3 px-3 py-5">
            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Deleted
              </span>

              <Switch
                checked={isDeleted === 'true'}
                onCheckedChange={(checkedValue) =>
                  setIsDeleted(`${checkedValue}`)
                }
              />
            </div>
          </div>

          <div className="px-2 pt-2 pb-2 flex items-center justify-between border-t border-muted">
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => resetFilter()}
            >
              Reset
            </Button>

            <Button size={'sm'} onClick={() => applyFilter()}>
              Apply
            </Button>
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
