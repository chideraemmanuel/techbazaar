'use client';

import { FC } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { RiFilter3Line } from '@remixicon/react';
import SelectInput from './select-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import { Label } from './ui/label';
import FormInput from './form-input';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';

interface Props {}

const AdminDashboardProductsFilter: FC<Props> = () => {
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
          <ScrollArea className="px-3 pt-5 pb-1 h-80">
            <div className="space-y-3 px-[4px]">
              <FilterSection label="Category">
                <SelectInput
                  placeholder="Select category"
                  selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                  selectInputItemProps={{ className: 'capitalize' }}
                  selectInputItems={PRODUCT_CATEGORIES}
                  onItemSelect={(value) => {}}
                />
              </FilterSection>

              <FilterSection label="Brand">
                <SelectInput
                  placeholder="Select brand"
                  selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                  selectInputItemProps={{ className: 'capitalize' }}
                  selectInputItems={[]}
                  onItemSelect={(value) => {}}
                />
              </FilterSection>

              <FilterSection label="Price range">
                <div className="flex gap-2">
                  <FormInput
                    label="Min:"
                    type="number"
                    labelProps={{ className: 'text-xs text-muted-foreground' }}
                  />
                  <FormInput
                    label="Max:"
                    type="number"
                    labelProps={{ className: 'text-xs text-muted-foreground' }}
                  />
                </div>
              </FilterSection>

              <div className="flex items-center justify-between">
                <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                  Featured
                </span>

                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                  Deleted
                </span>

                <Switch />
              </div>
            </div>
          </ScrollArea>

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

export default AdminDashboardProductsFilter;

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
