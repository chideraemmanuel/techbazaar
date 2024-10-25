'use client';

import { EMAIL_REGEX } from '@/constants';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import FormInput from './form-input';

interface Props {}

const PasswordResetRequestForm: FC<Props> = () => {
  //   const { requestPasswordReset, isRequestingPasswordReset } =
  //     usePasswordReset();
  const isRequestingPasswordReset = false;

  const form = useForm<{ email: string }>();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit: SubmitHandler<{ email: string }> = (data, e) => {
    console.log('request password reset form data', data);
    // requestPasswordReset({ email: data.email });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-12">
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
            disabled={isRequestingPasswordReset}
          />
        </div>

        <Button className="w-full h-12" disabled={isRequestingPasswordReset}>
          {isRequestingPasswordReset && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Send mail
        </Button>
      </form>
    </>
  );
};

export default PasswordResetRequestForm;
