'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
import FormInput from '@/components/form-input';
import SelectInput from '@/components/select-input';
import TextareaInput from '@/components/textarea-input';
import { PRODUCT_CATEGORIES } from '@/constants';
import ImageInput from '@/components/image-input';
import MoneyInput from '@/components/money-input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/cn';
import {
  IAvailableBrand,
  ProductCategory,
  ProductTypes,
} from '@/types/product';
import { SubmitHandler, useForm } from 'react-hook-form';
import ComboBoxInput, { ComboboxItem } from '@/components/combobox-input';
import { IProductData } from '@/lib/hooks/product/use-add-product';
import useEditProduct from '@/lib/hooks/product/use-edit-product';

type EditProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof SheetTrigger
> & {
  product: ProductTypes;
  brands: IAvailableBrand[];
};

type EditProductDialogTriggerRef = ElementRef<typeof SheetTrigger>;

const EditProductDialog = React.forwardRef<
  EditProductDialogTriggerRef,
  EditProductDialogTriggerProps
>(({ product, brands, className, ...props }, ref) => {
  const formatted_brands = brands.map((brand) => ({
    name: brand.name,
    value: brand._id,
  }));

  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Edit product"
            {...props}
          >
            <Pencil />
            <span className="sr-only">Edit product</span>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-5/6 sm:max-w-[486px] overflow-y-auto">
          <SheetHeader className="pt-5 pb-7 text-start">
            <SheetTitle>Edit product</SheetTitle>
          </SheetHeader>

          <EditProductForm
            product={product}
            brands={formatted_brands}
            setDialogOpen={setDialogOpen}
          />
        </SheetContent>
      </Sheet>
    </>
  );
});

export default EditProductDialog;

interface IProductForm extends Omit<IProductData, 'image'> {
  image: FileList;
}

interface EditProductFormProps {
  product: ProductTypes;
  brands: ComboboxItem[];
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProductForm: FC<EditProductFormProps> = ({
  product,
  brands,
  setDialogOpen,
}) => {
  const [brandsComboboxOpen, setBrandsComboboxOpen] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);

  const {
    mutate: editProduct,
    isLoading: isEditingProduct,
    isSuccess: productEditSuccess,
  } = useEditProduct();

  React.useEffect(() => {
    if (productEditSuccess) {
      setDialogOpen(false);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };

    if (isEditingProduct) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [productEditSuccess, isEditingProduct]);

  const form = useForm<IProductForm>({
    defaultValues: {
      name: product.name,
      brand: product.brand._id,
      description: product.description,
      category: product.category,
      // image: '',
      price: product.price,
      stock: product.stock,
      is_featured: product.is_featured,
      // is_archived: product.is_archived,
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue,
    getValues,
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

  const watched = watch();

  React.useEffect(() => {
    if (
      watched.name !== product.name ||
      watched.brand !== product.brand._id ||
      watched.description !== product.description ||
      watched.category !== product.category ||
      watched.image?.[0] ||
      +watched.price !== product.price ||
      +watched.stock !== product.stock ||
      watched.is_featured !== product.is_featured
    ) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  }, [watched]);

  const onSubmit: SubmitHandler<IProductForm> = (data, e) => {
    if (!formChanged) return;

    const updates: Partial<IProductData> = {};

    const {
      name,
      brand,
      description,
      category,
      image,
      price,
      stock,
      is_featured,
      // is_archived,
    } = getValues();

    if (name !== product.name) {
      updates.name = name;
    }

    if (brand !== product.brand._id) {
      updates.brand = brand;
    }

    if (description !== product.description) {
      updates.description = description;
    }

    if (category !== product.category) {
      updates.category = category;
    }

    if (image[0]) {
      updates.image = image[0];
    }

    if (price !== product.price) {
      updates.price = +price.toFixed(2);
    }

    if (stock !== product.stock) {
      updates.stock = +stock;
    }

    if (is_featured !== product.is_featured) {
      updates.is_featured = is_featured;
    }

    editProduct({
      id: product._id,
      data: updates,
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
            disabled={isEditingProduct}
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
            defaultValue={brands.find(
              (brand) => brand.value === product.brand._id
            )}
            error={errors.brand?.message}
            disabled={isEditingProduct}
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
            disabled={isEditingProduct}
          />

          <SelectInput
            label="Category"
            placeholder="Select a category"
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
            defaultValue={product.category}
            error={errors.category?.message}
            disabled={isEditingProduct}
          />

          <ImageInput
            label="Image"
            id="image"
            {...register('image')}
            defaultImage={product.image}
            error={errors.image?.message}
            disabled={isEditingProduct}
          />

          <MoneyInput
            label="Price"
            id="price"
            name={name}
            onBlur={onBlur}
            // ref={ref}
            onChange={onChange}
            onFieldChange={(original, converted) => {
              setValue('price', converted);
            }}
            defaultValue={product.price}
            error={errors.price?.message}
            disabled={isEditingProduct}
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
            disabled={isEditingProduct}
          />

          <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center sm:space-x-7 gap-5 sm:gap-0">
            <div className="flex items-center gap-2">
              <Label className="text-foreground/80 font-medium text-sm">
                Feature product
              </Label>
              <Switch
                defaultChecked={product.is_featured}
                onCheckedChange={(checked) =>
                  setValue('is_featured', checked as boolean)
                }
              />
            </div>
          </div>
        </div>

        <Button className="w-full" disabled={isEditingProduct || !formChanged}>
          {isEditingProduct && <Loader2 className="h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </>
  );
};
