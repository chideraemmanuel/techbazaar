'use client';

import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '../../../components/form-input';
import { EMAIL_REGEX } from '@/constants';
import { Button } from '../../../components/ui/button';
import { Loader2 } from 'lucide-react';
import FormBreak from '../../../components/form-break';
import useLoginUser from '@/lib/hooks/auth/use-login-user';
import GoogleSignInButton from './google-sign-in-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';

interface Props {}

interface LoginFormTypes {
  email: string;
  password: string;
}

const UserLoginForm: FC<Props> = () => {
  const axios = useAxiosPrivate();
  const { mutate: loginUser, isLoading: isLoggingUserIn } = useLoginUser();

  const form = useForm<LoginFormTypes>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit: SubmitHandler<LoginFormTypes> = (data, e) => {
    loginUser({ axios, credentials: data });
  };

  const router = useRouter();
  const pathname = usePathname();
  const error = useSearchParams().get('error');

  React.useEffect(() => {
    if (error) {
      if (error === 'authentication_failed') {
        toast.error('Authentication failed');
      }

      if (error === 'account_exists') {
        toast.error('Email is already in use. Login with password instead.');
      }

      if (error === 'unauthorized_access') {
        toast.error('Unable to login');
      }

      router.replace(pathname);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-10 flex flex-col gap-5">
          <FormInput
            label="Email address"
            id="email"
            placeholder="Enter your email address"
            {...register('email', {
              required: {
                value: true,
                message: 'Please enter your email address',
              },
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email format',
              },
            })}
            error={errors.email?.message}
            disabled={isLoggingUserIn}
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: {
                value: true,
                message: 'Please enter your password',
              },
            })}
            error={errors.password?.message}
            disabled={isLoggingUserIn}
            addForgotPassword
            passwordResetInitiationHref="/auth/reset-password/request"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full" disabled={isLoggingUserIn}>
            {isLoggingUserIn && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>

          <FormBreak />

          <GoogleSignInButton disabled={isLoggingUserIn} />
        </div>
      </form>
    </>
  );
};

export default UserLoginForm;
