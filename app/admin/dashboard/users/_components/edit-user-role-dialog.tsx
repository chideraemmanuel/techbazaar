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
import { UserRole, UserTypes } from '@/types/user';
import { USER_ROLES_SORT_ITEMS } from '@/constants';
import useUpdateUserStatus from '@/lib/hooks/use-update-user-status';

type EditUserRoleDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogTrigger
> & {
  user: UserTypes;
};

type EditUserRoleDialogTriggerRef = ElementRef<typeof AlertDialogTrigger>;

const EditUserRoleDialog = React.forwardRef<
  EditUserRoleDialogTriggerRef,
  EditUserRoleDialogTriggerProps
>(({ user, className, ...props }, ref) => {
  const [role, setRole] = React.useState(user.role);

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
              selectInputItems={USER_ROLES_SORT_ITEMS}
              defaultValue={user.role}
              onItemSelect={(value) => setRole(value as UserRole)}
              disabled={isUpdatingUserStatus}
            />
          </div>

          <AlertDialogFooter className="mt-3 sm:mt-5">
            <AlertDialogCancel disabled={isUpdatingUserStatus}>
              Cancel
            </AlertDialogCancel>

            <Button
              disabled={isUpdatingUserStatus || role === user.role}
              onClick={() =>
                updateUserStatus({ userId: user._id, updates: { role } })
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

export default EditUserRoleDialog;
