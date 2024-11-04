import AuthPageBackButton from '@/components/auth-page-back-button';
import EmailVerificationForm from '@/components/email-verification-form';
import LogoutUserButton from '@/components/logout-user-button';
import { getCurrentUser } from '@/lib/data/user';
import { RiArrowLeftLine } from '@remixicon/react';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EmailVerificationPage: FC<Props> = async ({ searchParams }) => {
  const return_to = (await searchParams).return_to;
  const user = await getCurrentUser();

  if (!user || (user && user.email_verified)) {
    const path =
      return_to && Array.isArray(return_to)
        ? return_to[0]
        : return_to && !Array.isArray(return_to)
        ? return_to
        : '/';

    redirect(path);
  }

  return (
    <>
      <div>
        <LogoutUserButton className="p-4 rounded-full bg-secondary text-secondary-foreground mb-9 md:mb-6">
          <RiArrowLeftLine />
        </LogoutUserButton>

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
