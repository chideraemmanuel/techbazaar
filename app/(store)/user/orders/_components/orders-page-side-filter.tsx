'use client';

import FormInput from '@/components/form-input';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import { Button } from '@/components/ui/button';
import { ORDER_STATUSES_SORT_ITEMS } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  sheetClose?: any;
}

const OrdersPageSideFilter: FC<Props> = ({ sheetClose: SheetClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get('status');
  const startDateParam = searchParams.get('start_date');
  const endDateParam = searchParams.get('end_date');

  const [status, setStatus] = React.useState(statusParam);
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
  };

  return (
    <>
      <div className="px-[4px] h-full">
        <div className="h-full pb-16">
          <span className="inline-block text-lg font-semibold mb-4 md:mb-2">
            Filter
          </span>

          <div className="space-y-5">
            <SelectInput
              label="Status"
              placeholder="Select status"
              selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
              selectInputItemProps={{ className: 'capitalize' }}
              selectInputItems={ORDER_STATUSES_SORT_ITEMS}
              defaultValue={status || undefined}
              onItemSelect={(value) => setStatus(value)}
            />

            <div>
              <span>Date range</span>
              <div className="flex gap-2">
                <span>From</span>
                <span>To</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-[2] bg-background py-3 px-6 md:px-2 flex items-center justify-between border-t border-muted">
          {SheetClose ? (
            <SheetClose asChild>
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => resetFilter()}
              >
                Reset
              </Button>
            </SheetClose>
          ) : (
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() => resetFilter()}
            >
              Reset
            </Button>
          )}

          {SheetClose ? (
            <SheetClose asChild>
              <Button size={'sm'} onClick={() => applyFilter()}>
                Apply
              </Button>
            </SheetClose>
          ) : (
            <Button size={'sm'} onClick={() => applyFilter()}>
              Apply
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPageSideFilter;
