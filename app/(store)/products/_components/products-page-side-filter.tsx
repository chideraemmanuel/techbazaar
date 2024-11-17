'use client';

import MoneyInput from '@/components/money-input';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  brands: SelectInputItem[];
  sheetClose?: any;
}

const ProductsPageSideFilter: FC<Props> = ({
  brands,
  sheetClose: SheetClose,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  const minPriceParam = searchParams.get('min_price');
  const maxPriceParam = searchParams.get('max_price');

  const [category, setCategory] = React.useState(categoryParam);
  const [brand, setBrand] = React.useState(brandParam);
  const [minPrice, setMinPrice] = React.useState(minPriceParam);
  const [maxPrice, setMaxPrice] = React.useState(maxPriceParam);

  const [maxPriceError, setMaxPriceError] = React.useState<undefined | string>(
    undefined
  );

  const applyFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('category');
    newSearchParams.delete('brand');
    newSearchParams.delete('min_price');
    newSearchParams.delete('max_price');

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

    router.replace(`?${newSearchParams}`, { scroll: false });
  };

  const resetFilter = () => {
    setCategory(null);
    setBrand(null);
    setMinPrice(null);
    setMaxPrice(null);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete('category');
    newSearchParams.delete('brand');
    newSearchParams.delete('min_price');
    newSearchParams.delete('max_price');

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
              label="Category"
              placeholder="Select category"
              selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
              selectInputItemProps={{ className: 'capitalize' }}
              selectInputItems={PRODUCT_CATEGORIES}
              defaultValue={category || undefined}
              onItemSelect={(value) => setCategory(value)}
            />

            <SelectInput
              label="Brand"
              placeholder="Select brand"
              selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
              selectInputItemProps={{ className: 'capitalize' }}
              selectInputItems={brands}
              defaultValue={brand || undefined}
              onItemSelect={(value) => setBrand(value)}
            />

            <div>
              <span>Price</span>

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

export default ProductsPageSideFilter;
