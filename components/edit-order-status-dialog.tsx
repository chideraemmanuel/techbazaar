'use client';

import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import SelectInput from './select-input';

type EditOrderStatusDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type EditOrderStatusDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const EditOrderStatusDialog = React.forwardRef<
  EditOrderStatusDialogTriggerRef,
  EditOrderStatusDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Edit order status"
            {...props}
          >
            <Pencil />
            <span className="sr-only">Edit order status</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit order status</AlertDialogTitle>
          </AlertDialogHeader>

          <div>
            <SelectInput
              placeholder="Select status"
              selectInputItems={[]}
              onItemSelect={(value) => {}}
            />
          </div>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button>
              <Loader2 className="h-4 w-4 animate-spin" />
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

export default EditOrderStatusDialog;
