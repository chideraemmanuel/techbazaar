import AuthPageBackButton from '@/components/auth-page-back-button';
import PasswordResetRequestForm from '@/components/password-reset-request-form';
import { FC } from 'react';

interface Props {}

const RequestPasswordResetPage: FC<Props> = () => {
  return (
    <>
      <div className="bg-white">
        <AuthPageBackButton />

        <div className="pb-6 flex flex-col gap-1 text-start">
          <h1 className="font-medium text-[32px] md:text-[48px] leading-[140%] tracking-[-1%]">
            Reset Password
          </h1>

          <p className="text-muted-foreground text-lg leading-[140%] tracking-[-0.44%]">
            Enter your registered email address below. We will send you an to
            reset your password.
          </p>
        </div>

        <PasswordResetRequestForm />
      </div>
    </>
  );
};

export default RequestPasswordResetPage;
