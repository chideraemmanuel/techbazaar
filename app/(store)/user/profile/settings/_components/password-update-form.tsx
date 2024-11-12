'use client';

import FormInput from '@/components/form-input';
import FullScreenSpinner from '@/components/full-screen-spinner';
import { Button } from '@/components/ui/button';
import { PASSWORD_VALIDATION } from '@/constants';
import { cn } from '@/lib/cn';
import useUpdateProfile from '@/lib/hooks/user/use-update-profile';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  password: string;
  confirm_password: string;
}

type Requirement = 'Min. 8 characters' | 'Number' | 'Symbol';

const passwordRequirements = ['Min. 8 characters', 'Number', 'Symbol'];

interface Props {}

const PasswordUpdateForm: FC<Props> = () => {
  const {
    mutate: updateProfile,
    isLoading: isUpdatingProfile,
    isSuccess: updateSuccessful,
  } = useUpdateProfile();

  const form = useForm<IForm>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    reset,
  } = form;

  const watched = watch();

  const onSubmit: SubmitHandler<IForm> = async (data, e) => {
    console.log('data', data);

    // updateProfile({ password: data.password });
  };

  React.useEffect(() => {
    if (updateSuccessful) {
      reset();
    }
  }, [updateSuccessful]);

  const validate = (requirement: Requirement) => {
    if (requirement === 'Min. 8 characters') {
      if (watched.password?.length > 7) {
        return true;
      } else {
        return false;
      }
    }

    if (requirement === 'Number') {
      if (/[0-9]/.test(watched.password)) {
        return true;
      } else {
        return false;
      }
    }

    if (requirement === 'Symbol') {
      if (/[$-/:-?{-~!"^_`\[\]]/.test(watched.password)) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <>
      {isUpdatingProfile && <FullScreenSpinner />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-9 flex flex-col gap-5">
          <FormInput
            label="New password"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter a password',
              },
              pattern: {
                value: PASSWORD_VALIDATION.regex,
                message: PASSWORD_VALIDATION.hint,
              },
            })}
            error={errors.password?.message}
          />

          <FormInput
            label="Repeat new password"
            id="confirm_password"
            type="password"
            placeholder="Enter your password"
            {...register('confirm_password', {
              required: {
                value: true,
                message: 'Please enter a password',
              },
              validate: (fieldValue) => {
                return (
                  fieldValue === getValues('password') ||
                  'Passwords do not match'
                );
              },
            })}
            error={errors.confirm_password?.message}
          />

          <div className="flex flex-wrap items-center gap-2 pt-6">
            {passwordRequirements.map((requirement) => (
              <span
                key={requirement}
                className={cn(
                  'inline-block py-2 px-4 text-sm text-center rounded',
                  validate(requirement as Requirement)
                    ? 'bg-green-200 text-green-700'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {requirement}
              </span>
            ))}
          </div>
        </div>

        <Button disabled={isUpdatingProfile}>
          {isUpdatingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
          Create new password
        </Button>
      </form>
    </>
  );
};

export default PasswordUpdateForm;
