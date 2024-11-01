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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
import { cn } from '@/lib/cn';
import SelectInput from '@/components/select-input';

type EditUserRoleDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type EditUserRoleDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const EditUserRoleDialog = React.forwardRef<
  EditUserRoleDialogTriggerRef,
  EditUserRoleDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Edit user role"
            {...props}
          >
            <Pencil />
            <span className="sr-only">Edit user role</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit user role</AlertDialogTitle>
          </AlertDialogHeader>

          <div>
            <SelectInput
              placeholder="Select role"
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

export default EditUserRoleDialog;
