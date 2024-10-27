'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Loader2, Plus } from 'lucide-react';
import FormInput from './form-input';
import SelectInput from './select-input';
import TextareaInput from './textarea-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import ImageInput from './image-input';
import MoneyInput from './money-input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type NewProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof SheetTrigger
>;

type NewProductDialogTriggerRef = ElementRef<typeof SheetTrigger>;

const NewProductDialog = React.forwardRef<
  NewProductDialogTriggerRef,
  NewProductDialogTriggerProps
>(({ ...props }, ref) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild ref={ref}>
          <Button {...props} size={'sm'}>
            <Plus />
            Add new product
          </Button>
        </SheetTrigger>

        <SheetContent className="w-5/6 sm:max-w-[486px] overflow-y-auto">
          <SheetHeader className="pt-5 pb-7 text-start">
            <SheetTitle>Add new product</SheetTitle>
            <SheetDescription>
              Fill in the details below to create a new product.
            </SheetDescription>
          </SheetHeader>

          <NewProductForm />
        </SheetContent>
      </Sheet>
    </>
  );
});

export default NewProductDialog;

const NewProductForm: FC = () => {
  return (
    <>
      <form>
        <div className="pb-12 flex flex-col gap-5">
          <FormInput label="Name" placeholder="Enter product name" />

          <SelectInput
            label="Brand"
            placeholder="Select a brand"
            selectInputItemProps={{ className: 'capitalize' }}
            selectInputItems={[]}
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

          <div className="flex items-center space-x-7">
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
