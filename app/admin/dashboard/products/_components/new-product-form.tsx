'use client';

import { FC } from 'react';
import FormInput from '@/components/form-input';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import TextareaInput from '@/components/textarea-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import ImageInput from '@/components/image-input';
import MoneyInput from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  brands: SelectInputItem[];
}

const NewProductForm: FC<Props> = ({ brands }) => {
  return (
    <>
      <form>
        <div className="pb-12 flex flex-col gap-5">
          <FormInput label="Name" placeholder="Enter product name" />

          <SelectInput
            label="Brand"
            placeholder="Select a brand"
            selectInputItemProps={{ className: 'capitalize' }}
            selectInputItems={brands}
            onItemSelect={(value) => {}}
          />

          <TextareaInput
            label="Description"
            placeholder="Enter a product description"
            className="h-28"
          />

          <SelectInput
            label="Category"
            placeholder="Select a category"
            selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
            selectInputItemProps={{ className: 'capitalize' }}
            selectInputItems={PRODUCT_CATEGORIES}
            onItemSelect={(value) => {}}
          />

          <ImageInput label="Image" />

          <MoneyInput label="Price" />

          <FormInput label="Stock" type="number" pattern="\d*" />

          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center sm:space-x-7 gap-5 sm:gap-0">
            <div className="flex items-center gap-2">
              <Label className="text-foreground/80 font-medium text-sm">
                Feature product
              </Label>
              <Switch />
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-foreground/80 font-medium text-sm">
                Archive product
              </Label>
              <Switch />
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Add product
        </Button>
      </form>
    </>
  );
};

export default NewProductForm;
