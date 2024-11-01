'use client';

import { FC } from 'react';
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

interface Props {
  sort_items: SelectInputItem[];
}

const AdminDashboardResourceSort: FC<Props> = ({ sort_items = [] }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiSortDesc />
            <span className="md:inline-block hidden">Sort</span>
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
                onItemSelect={(value) => {}}
              />
            </SortSection>

            <SortSection label="Sort order">
              <RadioGroup className="flex items-center space-x-3">
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
