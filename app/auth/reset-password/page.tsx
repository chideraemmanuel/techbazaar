import { getCurrentUser } from '@/lib/data/user';
import { notFound, redirect } from 'next/navigation';
import { FC } from 'react';
import PasswordResetForm from '../_components/password-reset-form';
import AuthPageBackButton from '../_components/auth-page-back-button';
import { APIErrorResponse, ISearchParams } from '@/types';
import { EMAIL_REGEX } from '@/constants';
import { verifyPasswordResetRequestExistence } from '@/lib/data/auth';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const PasswordResetPage: FC<Props> = async ({ searchParams }) => {
  const user = await getCurrentUser();

  if (user) {
    if (!user.email_verified) {
      redirect('/auth/verify-email');
    }

    redirect('/');
  }

  const email_param = (await searchParams).email;
  const p_param = (await searchParams).p;

  const email =
    email_param && Array.isArray(email_param) ? email_param[0] : email_param;

  const encryptedOTP = p_param && Array.isArray(p_param) ? p_param[0] : p_param;

  if (!email || !EMAIL_REGEX.test(email) || !encryptedOTP) notFound();

  const response = await verifyPasswordResetRequestExistence(
    decodeURIComponent(email)
  );

  if (!response || response === '') notFound();

  return (
    <>
      <div>
        <AuthPageBackButton />

        <div className="pb-6 flex flex-col gap-1 text-start">
          <h1 className="font-medium text-[32px] md:text-[48px] text-foreground">
            Complete Password Reset
          </h1>

          <p className="text-muted-foreground text-lg">
            Enter a new password of your choice but please make sure it’s known
            to you alone.
          </p>
        </div>

        <PasswordResetForm
          email={decodeURIComponent(email)}
          encryptedOTP={decodeURIComponent(encryptedOTP)}
        />
      </div>
    </>
  );
};

export default PasswordResetPage;
