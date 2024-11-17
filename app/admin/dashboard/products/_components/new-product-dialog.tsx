'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { getAvailableBrands } from '@/lib/data/brand';
import SelectInput, { SelectInputItem } from '@/components/select-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/form-input';
import TextareaInput from '@/components/textarea-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import { IAvailableBrand, ProductCategory } from '@/types/product';
import ImageInput from '@/components/image-input';
import MoneyInput from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import ComboBoxInput from '@/components/combobox-input';
import useAddProduct, {
  IProductData,
} from '@/lib/hooks/product/use-add-product';

type NewProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof SheetTrigger
> & {
  brands: IAvailableBrand[];
};

type NewProductDialogTriggerRef = ElementRef<typeof SheetTrigger>;

const NewProductDialog = React.forwardRef<
  NewProductDialogTriggerRef,
  NewProductDialogTriggerProps
>(({ brands, ...props }, ref) => {
  const formatted_brands = brands.map((brand) => ({
    name: brand.name,
    value: brand._id,
  }));

  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetTrigger asChild ref={ref}>
          <Button size={'sm'} {...props}>
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

          <NewProductForm
            brands={formatted_brands}
            setDialogOpen={setDialogOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
});

export default NewProductDialog;

interface IProductForm extends Omit<IProductData, 'image'> {
  image: FileList;
}

interface NewProductFormProps {
  brands: SelectInputItem[];
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewProductForm: FC<NewProductFormProps> = ({ brands, setDialogOpen }) => {
  const [brandsComboboxOpen, setBrandsComboboxOpen] = React.useState(false);

  const {
    mutate: addProduct,
    isLoading: isAddingProduct,
    isSuccess: productAddSuccess,
  } = useAddProduct();

  React.useEffect(() => {
    if (productAddSuccess) {
      setDialogOpen(false);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };

    if (isAddingProduct) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [productAddSuccess, isAddingProduct]);

  const form = useForm<IProductForm>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
  } = form;

  // register price separately because of how <MoneyInput /> and react-hook-form work.
  // if the `ref` from `register` is passed to <MoneyInput />, when the form is submitted, it changes the input value (the currency-formatted string) to the submitted value.
  const { name, onBlur, onChange, ref } = register('price', {
    required: {
      value: true,
      message: 'Product price is required',
    },
    validate: (fieldValue) => {
      return fieldValue !== 0 || 'Product price is required';
    },
  });

  const onSubmit: SubmitHandler<IProductForm> = (data, e) => {
    // if (data.price === 0) {
    //   setError('price', { message: 'Product price is required' });
    //   return;
    // }

    addProduct({
      ...data,
      price: +data.price.toFixed(2),
      stock: +data.stock,
      ...(data.image && { image: data.image?.[0] }),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-12 flex flex-col gap-5">
          <FormInput
            label="Name"
            id="name"
            placeholder="Enter product name"
            {...register('name', {
              required: {
                value: true,
                message: 'Product name is required',
              },
            })}
            error={errors.name?.message}
            disabled={isAddingProduct}
          />

          <ComboBoxInput
            label="Brand"
            placeholder="Select a brand"
            comboboxOpen={brandsComboboxOpen}
            setComboboxOpen={setBrandsComboboxOpen}
            comboboxTriggerProps={{
              id: 'brand',
              ...register('brand', {
                required: { value: true, message: 'Product brand is required' },
              }),
            }}
            comboboxItemProps={{ className: 'capitalize' }}
            comboboxItems={brands}
            onItemSelect={(value) => {
              clearErrors('brand');
              setValue('brand', value);
            }}
            error={errors.brand?.message}
            disabled={isAddingProduct}
          />

          <TextareaInput
            label="Description"
            id="description"
            placeholder="Enter a product description"
            className="h-28"
            {...register('description', {
              required: {
                value: true,
                message: 'Product description is required',
              },
            })}
            error={errors.description?.message}
            disabled={isAddingProduct}
          />

          <SelectInput
            label="Category"
            placeholder="Select a category"
            // selectInputTriggerProps={{ className: '!p-2 h-[auto]' }}
            selectInputTriggerProps={{
              id: 'category',
              ...register('category', {
                required: {
                  value: true,
                  message: 'Product category is required',
                },
              }),
            }}
            selectInputItemProps={{ className: 'capitalize' }}
            selectInputItems={PRODUCT_CATEGORIES}
            onItemSelect={(value) => {
              clearErrors('category');
              setValue('category', value as ProductCategory);
            }}
            error={errors.category?.message}
            disabled={isAddingProduct}
          />

          <ImageInput
            label="Image"
            id="image"
            {...register('image', {
              required: {
                value: true,
                message: 'Product image is required',
              },
            })}
            error={errors.image?.message}
            disabled={isAddingProduct}
          />

          <MoneyInput
            label="Price"
            id="price"
            name={name}
            onBlur={onBlur}
            // ref={ref}
            onChange={onChange}
            onFieldChange={(original, converted) => {
              console.log('converteddd', converted);
              setValue('price', converted);
            }}
            error={errors.price?.message}
            disabled={isAddingProduct}
          />

          <FormInput
            label="Stock"
            type="number"
            pattern="\d*"
            {...register('stock', {
              required: {
                value: true,
                message: 'Product stock is required',
              },
            })}
            error={errors.stock?.message}
            disabled={isAddingProduct}
          />

          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center sm:space-x-7 gap-5 sm:gap-0">
            <div className="flex items-center gap-2">
              <Label className="text-foreground/80 font-medium text-sm">
                Feature product
              </Label>
              <Switch
                onCheckedChange={(checked) =>
                  setValue('is_featured', checked as boolean)
                }
              />
            </div>
          </div>
        </div>

        <Button className="w-full" disabled={isAddingProduct}>
          {isAddingProduct && <Loader2 className="h-4 w-4 animate-spin" />}
          Add product
        </Button>
      </form>
    </>
  );
};
