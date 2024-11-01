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
import { Loader2, Trash2, UserCheck, UserX } from 'lucide-react';
import { cn } from '@/lib/cn';

type EnableUserDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type EnableUserDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const EnableUserDialog = React.forwardRef<
  EnableUserDialogTriggerRef,
  EnableUserDialogTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild ref={ref}>
          <Button
            size={'icon'}
            variant={'ghost'}
            className={cn('w-9 h-9 text-muted-foreground', className)}
            title="Enable user"
            {...props}
          >
            <UserCheck />
            <span className="sr-only">Enable user</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable user</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to enable this user?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enable user
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

type DisableUserDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
>;

type DisableUserDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const DisableUserDialog = React.forwardRef<
  DisableUserDialogTriggerRef,
  DisableUserDialogTriggerProps
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
            title="Disable user"
            {...props}
          >
            <UserX />
            <span className="sr-only">Disable user</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable user</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable this user?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button variant={'destructive'}>
              <Loader2 className="h-4 w-4 animate-spin" />
              Disable user
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
