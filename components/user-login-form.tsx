'use client';

import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from './form-input';
import { EMAIL_REGEX } from '@/constants';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import FormBreak from './form-break';

interface Props {}

interface LoginFormTypes {
  email: string;
  password: string;
}

const UserLoginForm: FC<Props> = () => {
  //   const { mutate: loginUser, isLoading: isLoggingUserIn } = useLoginUser();
  const isLoggingUserIn = false;

  const form = useForm<LoginFormTypes>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit: SubmitHandler<LoginFormTypes> = (data, e) => {
    console.log('login form data', data);
    // loginUser(data);
  };

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
            passwordResetInitiationHref="/auth/reset-password/initiate"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full h-12" disabled={isLoggingUserIn}>
            {isLoggingUserIn && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>

          <FormBreak />

          {/* <GoogleSignInButton disabled={isLoggingUserIn} /> */}
        </div>
      </form>
    </>
  );
};

export default UserLoginForm;
