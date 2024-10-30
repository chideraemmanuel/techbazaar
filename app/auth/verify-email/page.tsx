import AuthPageBackButton from '@/components/auth-page-back-button';
import EmailVerificationForm from '@/components/email-verification-form';
import getCurrentUser from '@/lib/data/get-current-user';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const EmailVerificationPage: FC<Props> = async () => {
  const user = await getCurrentUser();

  if (!user || (user && user.email_verified)) {
    redirect('/');
  }

  return (
    <>
      <div>
        <AuthPageBackButton
        // onClick={() => logout()}
        />

        <div className="pb-6 flex flex-col gap-1 text-start">
          <h1 className="font-medium text-[32px] md:text-[48px] text-foreground">
            Email Confirmation
          </h1>

          <p className="text-muted-foreground text-lg">
            A 6-digit confirmation code was sent to your email address,{' '}
            <span className="text-foreground font-bold">{user.email}</span>. .
            Please enter below.
          </p>
        </div>

        <EmailVerificationForm email={user.email} />
      </div>
    </>
  );
};

export default EmailVerificationPage;
