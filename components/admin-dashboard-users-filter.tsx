'use client';

import { FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { RiFilter3Line } from '@remixicon/react';
import SelectInput from './select-input';
import FormInput from './form-input';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';

interface Props {}

const AdminDashboardUsersFilter: FC<Props> = () => {
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
          <div className="space-y-5 px-3 pt-5 pb-5">
            <FilterSection label="Auth type">
              <SelectInput
                placeholder="Select auth type"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={[]}
                onItemSelect={(value) => {}}
              />
            </FilterSection>

            <FilterSection label="Role">
              <SelectInput
                placeholder="Select role"
                selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                selectInputItemProps={{ className: 'capitalize' }}
                selectInputItems={[]}
                onItemSelect={(value) => {}}
              />
            </FilterSection>

            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Email verified
              </span>

              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                Disabled
              </span>

              <Switch />
            </div>
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

export default AdminDashboardUsersFilter;

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
