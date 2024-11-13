import AuthPageBackButton from '@/app/auth/_components/auth-page-back-button';
import PasswordResetRequestForm from '@/app/auth/_components/password-reset-request-form';
import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const RequestPasswordResetPage: FC<Props> = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (!user.email_verified) {
      redirect('/auth/verify-email');
    }

    redirect('/');
  }

  return (
    <>
      <div>
        <AuthPageBackButton />

        <div className="pb-6 flex flex-col gap-1 text-start">
          <h1 className="font-medium text-[32px] md:text-[48px] leading-[140%] tracking-[-1%]">
            Request Paassword Reset
          </h1>

          <p className="text-muted-foreground text-lg leading-[140%] tracking-[-0.44%]">
            Enter your registered email address below. We will send you an OTP
            to reset your password.
          </p>
        </div>

        <PasswordResetRequestForm />
      </div>
    </>
  );
};

export default RequestPasswordResetPage;
