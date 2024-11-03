'use client';

import React, { FC } from 'react';
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
import useAddBrand, { IBrandData } from '@/lib/hooks/use-add-brand';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/form-input';
import ImageInput from '@/components/image-input';

const NewBrandDialog: FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <SheetTrigger asChild>
          <Button size={'sm'}>
            <Plus />
            Add new brand
          </Button>
        </SheetTrigger>

        <SheetContent className="w-5/6 sm:max-w-[486px] overflow-y-auto">
          <SheetHeader className="pt-5 pb-7 text-start">
            <SheetTitle>Add new brand</SheetTitle>
            <SheetDescription>
              Fill in the details below to create a new brand.
            </SheetDescription>
          </SheetHeader>

          <NewBrandForm setDialogOpen={setDialogOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NewBrandDialog;

interface IBrandForm extends Omit<IBrandData, 'logo'> {
  logo?: FileList;
}

const NewBrandForm: FC<{
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setDialogOpen }) => {
  const {
    mutate: addBrand,
    isLoading: isAddingBrand,
    isSuccess: brandAddSuccess,
  } = useAddBrand();

  React.useEffect(() => {
    if (brandAddSuccess) {
      setDialogOpen(false);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
    };

    if (isAddingBrand) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';

      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [brandAddSuccess, isAddingBrand]);

  const form = useForm<IBrandForm>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit: SubmitHandler<IBrandForm> = (data, e) => {
    addBrand({
      name: data.name,
      ...(data.logo && { logo: data.logo?.[0] }),
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
            disabled={isAddingBrand}
            error={errors.name?.message}
          />

          <ImageInput
            label="Logo"
            id="logo"
            {...register('logo')}
            disabled={isAddingBrand}
          />
        </div>

        <Button className="w-full" disabled={isAddingBrand}>
          {isAddingBrand && <Loader2 className="h-4 w-4 animate-spin" />}
          Add brand
        </Button>
      </form>
    </>
  );
};
