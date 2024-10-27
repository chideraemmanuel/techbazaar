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
import { Loader2, Pencil, Plus } from 'lucide-react';
import FormInput from './form-input';
import SelectInput from './select-input';
import TextareaInput from './textarea-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import ImageInput from './image-input';
import MoneyInput from './money-input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { cn } from '@/lib/cn';

type EditProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof SheetTrigger
>;

type EditProductDialogTriggerRef = ElementRef<typeof SheetTrigger>;

const EditProductDialog = React.forwardRef<
  EditProductDialogTriggerRef,
  EditProductDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild ref={ref}>
          <Button
            {...props}
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
          >
            <Pencil />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-5/6 sm:max-w-[486px] overflow-y-auto">
          <SheetHeader className="pt-5 pb-7 text-start">
            <SheetTitle>Edit product</SheetTitle>
          </SheetHeader>

          <EditProductForm />
        </SheetContent>
      </Sheet>
    </>
  );
});

export default EditProductDialog;

const EditProductForm: FC = () => {
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
          <Loader2 className="h-4 w-4 animate-spin" />
          Update
        </Button>
      </form>
    </>
  );
};
