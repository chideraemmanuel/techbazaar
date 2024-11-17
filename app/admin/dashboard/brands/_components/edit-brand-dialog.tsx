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
import ImageInput from '@/components/image-input';
import { cn } from '@/lib/cn';
import { BrandTypes } from '@/types/product';
import { IBrandData } from '@/lib/hooks/brand/use-add-brand';
import { SubmitHandler, useForm } from 'react-hook-form';
import useEditBrand from '@/lib/hooks/brand/use-edit-brand';

type EditBrandDialogTriggerProps = ComponentPropsWithoutRef<
  typeof SheetTrigger
> & {
  brand: BrandTypes;
};

type EditBrandDialogTriggerRef = ElementRef<typeof SheetTrigger>;

const EditBrandDialog = React.forwardRef<
  EditBrandDialogTriggerRef,
  EditBrandDialogTriggerProps
>(({ brand, className, ...props }, ref) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Edit brand"
            {...props}
          >
            <Pencil />
            <span className="sr-only">Edit brand</span>
          </Button>
        </SheetTrigger>

        <SheetContent className="w-5/6 sm:max-w-[486px] overflow-y-auto">
          <SheetHeader className="pt-5 pb-7 text-start">
            <SheetTitle>Edit brand</SheetTitle>
          </SheetHeader>

          <EditBrandForm brand={brand} setDialogOpen={setDialogOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
});

export default EditBrandDialog;

interface IBrandForm extends Omit<IBrandData, 'logo'> {
  logo: FileList;
}

interface EditBrandFormProps {
  brand: BrandTypes;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBrandForm: FC<EditBrandFormProps> = ({ brand, setDialogOpen }) => {
  const [formChanged, setFormChanged] = React.useState(false);

  const {
    mutate: editBrand,
    isLoading: isEditingBrand,
    isSuccess: brandEditSuccess,
  } = useEditBrand();

  React.useEffect(() => {
    if (brandEditSuccess) {
      setDialogOpen(false);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };

    if (isEditingBrand) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [brandEditSuccess, isEditingBrand]);

  const form = useForm<IBrandForm>({
    defaultValues: {
      name: brand.name,
      // image: '',
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

  const watched = watch();

  React.useEffect(() => {
    if (watched.name !== brand.name || watched.logo?.[0]) {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  }, [watched]);

  const onSubmit: SubmitHandler<IBrandForm> = (data, e) => {
    if (!formChanged) return;

    const updates: Partial<IBrandData> = {};

    const { name, logo } = getValues();

    if (name !== brand.name) {
      updates.name = name;
    }

    if (logo[0]) {
      updates.logo = logo[0];
    }

    editBrand({
      id: brand._id,
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
            placeholder="Enter brand name"
            {...register('name', {
              required: {
                value: true,
                message: 'Brand name is required',
              },
            })}
            error={errors.name?.message}
            disabled={isEditingBrand}
          />

          <ImageInput
            label="Image"
            id="image"
            {...register('logo')}
            defaultImage={brand.logo ?? undefined}
            error={errors.logo?.message}
            disabled={isEditingBrand}
          />
        </div>

        <Button className="w-full" disabled={isEditingBrand || !formChanged}>
          {isEditingBrand && <Loader2 className="h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </>
  );
};
