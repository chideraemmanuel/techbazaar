'use client';

import React, { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiFilter3Line } from '@remixicon/react';
import SelectInput from '@/components/select-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { OrderStatus } from '@/types/cart';
import { ORDER_STATUSES_SORT_ITEMS } from '@/constants';
import DateInput from '@/components/date-input';
import formatDate from '@/lib/format-date';

interface Props {}

const AdminDashboardOrdersFilter: FC<Props> = () => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get('status');
  const startDateParam = searchParams.get('start_date');
  const endDateParam = searchParams.get('end_date');

  const [status, setStatus] = React.useState<OrderStatus | null>(
    statusParam as OrderStatus | null
  );
  const [startDate, setStartDate] = React.useState(startDateParam);
  const [endDate, setEndDate] = React.useState(endDateParam);

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('status');
    newSearchParams.delete('start_date');
    newSearchParams.delete('end_date');

    if (status) {
      newSearchParams.set('status', status);
    }

    if (startDate) {
      newSearchParams.set('start_date', startDate);
    }

    if (endDate) {
      newSearchParams.set('end_date', endDate);
    }

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  const resetFilter = () => {
    setStatus(null);
    setStartDate(null);
    setEndDate(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('status');
    newSearchParams.delete('start_date');
    newSearchParams.delete('end_date');

    router.replace(`?${newSearchParams}`, { scroll: false });

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
          <div className="space-y-5 px-3 pt-5 pb-5">
            <FilterSection label="Status">
              <SelectInput
                placeholder="Select status"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={ORDER_STATUSES_SORT_ITEMS}
                defaultValue={status || undefined}
                onItemSelect={(value) => setStatus(value as OrderStatus)}
              />
            </FilterSection>

            <FilterSection label="Date range">
              <div className="space-y-2">
                <DateInput
                  label="From"
                  labelProps={{ className: 'text-xs text-muted-foreground' }}
                  dateInputTriggerProps={{ className: '!p-2 h-[auto] w-full' }}
                  defaultValue={startDate ? new Date(startDate) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setStartDate(
                        formatDate(selectedDate, 'en-us', {
                          dateStyle: 'short',
                        })
                      );
                    } else {
                      setStartDate(null);
                    }
                  }}
                />

                <DateInput
                  label="To"
                  labelProps={{ className: 'text-xs text-muted-foreground' }}
                  dateInputTriggerProps={{ className: '!p-2 h-[auto] w-full' }}
                  defaultValue={endDate ? new Date(endDate) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setEndDate(
                        formatDate(selectedDate, 'en-us', {
                          dateStyle: 'short',
                        })
                      );
                    } else {
                      setEndDate(null);
                    }
                  }}
                />
              </div>
            </FilterSection>
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

export default AdminDashboardOrdersFilter;

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
