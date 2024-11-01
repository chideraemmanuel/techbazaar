'use client';

import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type DeleteUserDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type DeleteUserDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const DeleteUserDialog = React.forwardRef<
  DeleteUserDialogTriggerRef,
  DeleteUserDialogTriggerProps
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
            title="Delete user"
            {...props}
          >
            <Trash2 />
            <span className="sr-only">Delete user</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete user</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button variant={'destructive'}>
              <Loader2 className="h-4 w-4 animate-spin" />
              Delete user
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

export default DeleteUserDialog;
