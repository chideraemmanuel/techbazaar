import React, { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { getAvailableBrands } from '@/lib/data/brand';
import NewProductForm from './new-product-form';

const NewProductDialog: FC = async () => {
  const brands = await getAvailableBrands();

  const formatted_brands = brands.map((brand) => ({
    id: brand._id,
    name: brand.name,
    value: brand._id,
  }));

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size={'sm'}>
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

          <NewProductForm brands={formatted_brands} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NewProductDialog;
