'use client';

import { EMAIL_REGEX, NAME_REGEX, PASSWORD_VALIDATION } from '@/constants';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormInput from './form-input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import FormBreak from './form-break';

interface Props {}

interface RegistrationFormTypes {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const UserRegistrationForm: FC<Props> = () => {
  //   const { mutate: registerUser, isLoading: isRegisteringUser } = useRegisterUser();
  const isRegisteringUser = false;

  const form = useForm<RegistrationFormTypes>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = form;

  const onSubmit: SubmitHandler<RegistrationFormTypes> = (data, e) => {
    console.log('registration form data', data);
    // registerUser(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-10 flex flex-col gap-5">
          <FormInput
            label="First name"
            id="first_name"
            placeholder="e.g. Chidera"
            {...register('first_name', {
              required: {
                value: true,
                message: 'Please enter your first name',
              },
              pattern: {
                value: NAME_REGEX,
                message: 'First name contains invalid characters.',
              },
              validate: (fieldValue) => {
                return (
                  (fieldValue.length >= 2 && fieldValue.length <= 50) ||
                  'First name must be beteen 1-50 characters'
                );
              },
            })}
            error={errors.first_name?.message}
            disabled={isRegisteringUser}
          />

          <FormInput
            label="Last name"
            id="last_name"
            placeholder="e.g. Emmanuel"
            {...register('last_name', {
              required: {
                value: true,
                message: 'Please enter your last name',
              },
              pattern: {
                value: NAME_REGEX,
                message: 'Last name contains invalid characters.',
              },
              validate: (fieldValue) => {
                return (
                  (fieldValue.length >= 2 && fieldValue.length <= 50) ||
                  'Last name must be beteen 1-50 characters'
                );
              },
            })}
            error={errors.last_name?.message}
            disabled={isRegisteringUser}
          />

          <FormInput
            label="Email address"
            id="email"
            placeholder="e.g. chidera@email.com"
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
            disabled={isRegisteringUser}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            id="password"
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
            disabled={isRegisteringUser}
          />

          <FormInput
            label="Confirm password"
            type="password"
            error={errors.confirm_password?.message}
            placeholder="Confirm your password"
            id="confirm_password"
            {...register('confirm_password', {
              required: {
                value: true,
                message: 'Please confirm your password',
              },
              validate: (fieldValue) => {
                return (
                  fieldValue === getValues('password') ||
                  'Passwords do not match'
                );
              },
            })}
            disabled={isRegisteringUser}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full" disabled={isRegisteringUser}>
            {isRegisteringUser && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>

          <FormBreak />

          {/* <GoogleSignInButton disabled={isRegisteringUser} /> */}
        </div>
      </form>
    </>
  );
};

export default UserRegistrationForm;
