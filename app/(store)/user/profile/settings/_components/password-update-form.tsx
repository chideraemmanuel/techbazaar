'use client';

import FormInput from '@/components/form-input';
import FullScreenSpinner from '@/components/full-screen-spinner';
import { Button } from '@/components/ui/button';
import { PASSWORD_REQUIREMENTS, PASSWORD_VALIDATION } from '@/constants';
import { cn } from '@/lib/cn';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';
import useUpdateProfile from '@/lib/hooks/user/use-update-profile';
import validatePasswordRequirement from '@/lib/validate-password-requirement';
import { PasswordRequirement } from '@/types';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForm {
  password: string;
  confirm_password: string;
}

interface Props {}

const PasswordUpdateForm: FC<Props> = () => {
  const axios = useAxiosPrivate();

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
    updateProfile({ axios, updates: { password: data.password } });
  };

  React.useEffect(() => {
    if (updateSuccessful) {
      reset();
    }
  }, [updateSuccessful]);

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
            {PASSWORD_REQUIREMENTS.map((requirement) => (
              <span
                key={requirement}
                className={cn(
                  'inline-block py-2 px-4 text-sm text-center rounded',
                  validatePasswordRequirement(
                    watched.password,
                    requirement as PasswordRequirement
                  )
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
