'use client';

import React, { ComponentPropsWithoutRef, ElementRef, FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ArchiveRestore, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import useDeleteBrand from '@/lib/hooks/brand/use-delete-brand';
import { BrandTypes } from '@/types/product';
import useRestoreBrand from '@/lib/hooks/brand/use-restore-brand';

type DeleteBrandDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  brand: BrandTypes;
};

type DeleteBrandDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const DeleteBrandDialog = React.forwardRef<
  DeleteBrandDialogTriggerRef,
  DeleteBrandDialogTriggerProps
>(({ brand, className, ...props }, ref) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: deleteBrand,
    isLoading: isDeletingBrand,
    isSuccess: brandDeletionSuccessful,
  } = useDeleteBrand();

  React.useEffect(() => {
    if (brandDeletionSuccessful) {
      setDialogOpen(false);
    }
  }, [brandDeletionSuccessful]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn(
              'w-9 h-9 text-destructive hover:text-destructive hover:bg-destructive/10',
              className
            )}
            title="Delete brand"
            {...props}
          >
            <Trash2 />
            <span className="sr-only">Delete brand</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this brand? This brand will no
              longer be available to consumers except if restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel disabled={isDeletingBrand}>
              Cancel
            </AlertDialogCancel>

            <Button
              variant={'destructive'}
              onClick={() => deleteBrand(brand._id)}
              disabled={isDeletingBrand}
            >
              {isDeletingBrand && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete brand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

type RestoreBrandDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  brand: BrandTypes;
};

type RestoreBrandDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const RestoreBrandDialog = React.forwardRef<
  RestoreBrandDialogTriggerRef,
  RestoreBrandDialogTriggerProps
>(({ brand, className, ...props }, ref) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: restoreBrand,
    isLoading: isRestoringBrand,
    isSuccess: brandRestorationSuccessful,
  } = useRestoreBrand();

  React.useEffect(() => {
    if (brandRestorationSuccessful) {
      setDialogOpen(false);
    }
  }, [brandRestorationSuccessful]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Restore brand"
            {...props}
          >
            {/* <RotateCcw /> */}
            <ArchiveRestore />
            <span className="sr-only">Restore brand</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore this brand? This brand will now
              be available to consumers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              onClick={() => restoreBrand(brand._id)}
              disabled={isRestoringBrand}
            >
              {isRestoringBrand && <Loader2 className="h-4 w-4 animate-spin" />}
              Restore brand
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
