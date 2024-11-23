'use client';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { PASSWORD_REQUIREMENTS, PASSWORD_VALIDATION } from '@/constants';
import { cn } from '@/lib/cn';
import useCompletePasswordReset from '@/lib/hooks/auth/use-complete-password-reset';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';
import validatePasswordRequirement from '@/lib/validate-password-requirement';
import { decode } from '@/lib/xor-base64-cipher';
import { PasswordRequirement } from '@/types';
import { Loader2 } from 'lucide-react';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface PasswordResetFormTypes {
  password: string;
  confirm_password: string;
}

interface Props {
  email: string;
  encryptedOTP: string;
}

const PasswordResetForm: FC<Props> = ({ email, encryptedOTP }) => {
  const axios = useAxiosPrivate();

  const {
    mutate: completePasswordReset,
    isLoading: isCompletingPasswordReset,
  } = useCompletePasswordReset();

  const form = useForm<PasswordResetFormTypes>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = form;

  const watched = watch();

  const onSubmit: SubmitHandler<PasswordResetFormTypes> = (data, e) => {
    const decryptedOTP = decode(
      process.env.NEXT_PUBLIC_XOR_CIPHER_KEY!,
      encryptedOTP
    );

    completePasswordReset({
      axios,
      data: {
        email,
        OTP: decryptedOTP as string,
        new_password: data.password,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-12 space-y-5">
          <FormInput
            type="password"
            label="New password"
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
            type="password"
            label="Repeat new password"
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

        <Button className="w-full" disabled={isCompletingPasswordReset}>
          {isCompletingPasswordReset && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create new password
        </Button>
      </form>
    </>
  );
};

export default PasswordResetForm;
