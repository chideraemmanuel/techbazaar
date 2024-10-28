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
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { ArchiveRestore, Loader2, RotateCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type DeleteProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type DeleteProductDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const DeleteProductDialog = React.forwardRef<
  DeleteProductDialogTriggerRef,
  DeleteProductDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn(
              'w-9 h-9 text-destructive hover:text-destructive hover:bg-destructive/10',
              className
            )}
            title="Delete product"
            {...props}
          >
            <Trash2 />
            <span className="sr-only">Delete product</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This product will no
              longer be available to consumers except when restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button variant={'destructive'}>
              <Loader2 className="h-4 w-4 animate-spin" />
              Delete product
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

type RestoreProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type RestoreProductDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const RestoreProductDialog = React.forwardRef<
  RestoreProductDialogTriggerRef,
  RestoreProductDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Restore product"
            {...props}
          >
            {/* <RotateCcw /> */}
            <ArchiveRestore />
            <span className="sr-only">Restore product</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to restore this product? This product will
              now be available to consumers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button>
              <Loader2 className="h-4 w-4 animate-spin" />
              Restore product
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
