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
import { Loader2, UserCheck, UserX } from 'lucide-react';
import { cn } from '@/lib/cn';
import useUpdateUserStatus from '@/lib/hooks/user/use-update-user-status';
import { UserTypes } from '@/types/user';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';

type EnableUserDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  user: UserTypes;
};

type EnableUserDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const EnableUserDialog = React.forwardRef<
  EnableUserDialogTriggerRef,
  EnableUserDialogTriggerProps
>(({ user, className, ...props }, ref) => {
  const axios = useAxiosPrivate();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: updateUserStatus,
    isLoading: isUpdatingUserStatus,
    isSuccess: userStatusUpdateSuccess,
  } = useUpdateUserStatus();

  React.useEffect(() => {
    if (userStatusUpdateSuccess) {
      setDialogOpen(false);
    }
  }, [userStatusUpdateSuccess]);

  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <AlertDialogCancel disabled={isUpdatingUserStatus}>
              Cancel
            </AlertDialogCancel>

            <Button
              disabled={isUpdatingUserStatus}
              onClick={() =>
                updateUserStatus({
                  axios,
                  userId: user._id,
                  updates: { disabled: false },
                })
              }
            >
              {isUpdatingUserStatus && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

type DisableUserDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  user: UserTypes;
};

type DisableUserDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

export const DisableUserDialog = React.forwardRef<
  DisableUserDialogTriggerRef,
  DisableUserDialogTriggerProps
>(({ user, className, ...props }, ref) => {
  const axios = useAxiosPrivate();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const {
    mutate: updateUserStatus,
    isLoading: isUpdatingUserStatus,
    isSuccess: userStatusUpdateSuccess,
  } = useUpdateUserStatus();

  React.useEffect(() => {
    if (userStatusUpdateSuccess) {
      setDialogOpen(false);
    }
  }, [userStatusUpdateSuccess]);

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
            <AlertDialogCancel disabled={isUpdatingUserStatus}>
              Cancel
            </AlertDialogCancel>

            <Button
              disabled={isUpdatingUserStatus}
              onClick={() =>
                updateUserStatus({
                  axios,
                  userId: user._id,
                  updates: { disabled: true },
                })
              }
            >
              {isUpdatingUserStatus && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
