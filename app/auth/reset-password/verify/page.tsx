import { EMAIL_REGEX } from '@/constants';
import { verifyPasswordResetRequestExistence } from '@/lib/data/auth';
import { ISearchParams } from '@/types';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import AuthPageBackButton from '../../_components/auth-page-back-button';
import PasswordResetVerificationForm from '../../_components/password-reset-verification-form';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const PasswordResetVerificationPage: FC<Props> = async ({ searchParams }) => {
  const email_param = (await searchParams).email;

  const email =
    email_param && Array.isArray(email_param) ? email_param[0] : email_param;

  if (!email || !EMAIL_REGEX.test(email)) notFound();

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
            Verify Password Reset
          </h1>

          <p className="text-muted-foreground text-lg">
            A 6-digit confirmation code was sent to your email address,{' '}
            <span className="text-foreground font-bold">
              {decodeURIComponent(email)}
            </span>
            . Please enter below.
          </p>
        </div>

        <PasswordResetVerificationForm email={decodeURIComponent(email)} />
      </div>
    </>
  );
};

export default PasswordResetVerificationPage;
