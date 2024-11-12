'use client';

import React, { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiSortDesc } from '@remixicon/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  sort_items: SelectInputItem[];
}

const AdminDashboardResourceSort: FC<Props> = ({ sort_items = [] }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const default_sort_by = searchParams.get('sort_by');

  const sort_order_param = searchParams.get('sort_order');
  const default_sort_order =
    sort_order_param &&
    (sort_order_param === 'ascending' || sort_order_param === 'descending')
      ? sort_order_param
      : 'ascending';

  const [sortBy, setSortBy] = React.useState<string | null>(default_sort_by);
  const [sortOrder, setSortOrder] = React.useState(default_sort_order);

  const applySort = () => {
    console.log({ sortBy, sortOrder });

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (!sortBy || sortBy === '' || !sortOrder || sortOrder === '') {
      newSearchParams.delete('sort_by');
      newSearchParams.delete('sort_order');
    } else {
      newSearchParams.set('sort_by', sortBy);
      newSearchParams.set('sort_order', sortOrder);
    }

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  const resetSort = () => {
    setSortBy(null);
    setSortOrder('ascending');

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('sort_by');
    newSearchParams.delete('sort_order');

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiSortDesc />
            <span className="md:inline-block md:not-sr-only sr-only">Sort</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="p-0">
          <div className="space-y-5 px-3 pt-5 pb-5">
            <SortSection label="Sort by">
              <SelectInput
                placeholder="Select"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={sort_items}
                defaultValue={sortBy || undefined}
                onItemSelect={setSortBy}
              />
            </SortSection>

            <SortSection label="Sort order">
              <RadioGroup
                className="flex items-center space-x-3"
                value={sortOrder}
                onValueChange={setSortOrder}
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem id="ascending" value="ascending" />
                  <Label htmlFor="ascending">Ascending</Label>
                </div>

                <div className="flex items-center space-x-1">
                  <RadioGroupItem id="descending" value="descending" />
                  <Label htmlFor="descending">Descending</Label>
                </div>
              </RadioGroup>
            </SortSection>
          </div>

          <div className="px-2 pt-2 pb-2 flex items-center justify-between border-t border-muted">
            <Button variant={'outline'} size={'sm'} onClick={() => resetSort()}>
              Reset
            </Button>

            <Button size={'sm'} onClick={() => applySort()}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminDashboardResourceSort;

const SortSection: FC<{ children: React.ReactNode; label: string }> = ({
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
