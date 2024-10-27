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
import { Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type DeleteProductDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type DeleteProductDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const DeleteProductDialog = React.forwardRef<
  DeleteProductDialogTriggerRef,
  DeleteProductDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn(
              'w-9 h-9 text-destructive hover:text-destructive hover:bg-destructive/10',
              className
            )}
            ref={ref}
            {...props}
          >
            <Trash2 />
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

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Delete product</AlertDialogAction> */}
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

export default DeleteProductDialog;
