'use client';

import React, { FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { RiFilter3Line } from '@remixicon/react';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import { Label } from '@/components/ui/label';
import FormInput from '@/components/form-input';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter, useSearchParams } from 'next/navigation';
import MoneyInput from '@/components/money-input';

interface Props {
  brands: SelectInputItem[];
}

const AdminDashboardProductsFilter: FC<Props> = ({ brands }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  const minPriceParam = searchParams.get('min_price');
  const maxPriceParam = searchParams.get('max_price');
  const isFeaturedParam = searchParams.get('is_featured');
  const isArchivedParam = searchParams.get('is_archived');
  const isDeletedParam = searchParams.get('is_deleted');

  const [category, setCategory] = React.useState(categoryParam);
  const [brand, setBrand] = React.useState(brandParam);
  const [minPrice, setMinPrice] = React.useState(minPriceParam);
  const [maxPrice, setMaxPrice] = React.useState(maxPriceParam);
  const [isFeatured, setIsFeatured] = React.useState(isFeaturedParam);
  const [isArchived, setIsArchived] = React.useState(isArchivedParam);
  const [isDeleted, setIsDeleted] = React.useState(isDeletedParam);

  const [maxPriceError, setMaxPriceError] = React.useState<undefined | string>(
    undefined
  );

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('category');
    newSearchParams.delete('brand');
    newSearchParams.delete('min_price');
    newSearchParams.delete('max_price');
    newSearchParams.delete('is_featured');
    newSearchParams.delete('is_archived');
    newSearchParams.delete('is_deleted');

    if (category) {
      newSearchParams.set('category', category);
    }

    if (brand) {
      newSearchParams.set('brand', brand);
    }

    if (minPrice) {
      newSearchParams.set('min_price', minPrice);
    }

    if (maxPrice) {
      newSearchParams.set('max_price', maxPrice);
    }

    if (minPrice && maxPrice) {
      if (+minPrice > +maxPrice) {
        setMaxPriceError('Max price cannot be less than Min price');
        return;
      }
    }

    if (isFeatured) {
      newSearchParams.set('is_featured', isFeatured);
    }

    if (isArchived) {
      newSearchParams.set('is_archived', isArchived);
    }

    if (isDeleted) {
      newSearchParams.set('is_deleted', isDeleted);
    }

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  const resetFilter = () => {
    setCategory(null);
    setBrand(null);
    setMinPrice(null);
    setMaxPrice(null);
    setIsFeatured(null);
    setIsArchived(null);
    setIsDeleted(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('category');
    newSearchParams.delete('brand');
    newSearchParams.delete('min_price');
    newSearchParams.delete('max_price');
    newSearchParams.delete('is_featured');
    newSearchParams.delete('is_archived');
    newSearchParams.delete('is_deleted');

    router.replace(`?${newSearchParams}`, { scroll: false });

    setPopoverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button size={'sm'} variant={'outline'}>
            <RiFilter3Line />
            <span className="md:inline-block md:not-sr-only sr-only">
              Filter
            </span>
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
                  defaultValue={category || undefined}
                  onItemSelect={(value) => setCategory(value)}
                />
              </FilterSection>

              <FilterSection label="Brand">
                <SelectInput
                  placeholder="Select brand"
                  selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
                  selectInputItemProps={{ className: 'capitalize' }}
                  selectInputItems={brands}
                  defaultValue={brand || undefined}
                  onItemSelect={(value) => setBrand(value)}
                />
              </FilterSection>

              <FilterSection label="Price range">
                <div className="space-y-2">
                  <MoneyInput
                    label="Min:"
                    labelProps={{ className: 'text-xs text-muted-foreground' }}
                    defaultValue={minPrice ? +minPrice : 0}
                    onFieldChange={(original, converted) =>
                      setMinPrice(converted.toFixed(2))
                    }
                  />

                  <MoneyInput
                    label="Max:"
                    labelProps={{ className: 'text-xs text-muted-foreground' }}
                    defaultValue={maxPrice ? +maxPrice : 0}
                    onFieldChange={(original, converted) => {
                      setMaxPriceError(undefined);
                      setMaxPrice(converted.toFixed(2));
                    }}
                    error={maxPriceError}
                  />
                </div>
              </FilterSection>

              <div className="flex items-center justify-between">
                <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                  Archived
                </span>

                <Switch
                  checked={isArchived === 'true'}
                  onCheckedChange={(checkedValue) =>
                    setIsArchived(`${checkedValue}`)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-block pb-2 text-sm font-medium text-foreground/80">
                  Featured
                </span>

                <Switch
                  checked={isFeatured === 'true'}
                  onCheckedChange={(checkedValue) =>
                    setIsFeatured(`${checkedValue}`)
                  }
                />
              </div>

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
          </ScrollArea>

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
