import AuthPageBackButton from '@/components/auth-page-back-button';
import EmailVerificationForm from '@/components/email-verification-form';
import { FC } from 'react';

interface Props {}

const EmailVerificationPage: FC<Props> = () => {
  return (
    <>
      <div>
        <AuthPageBackButton
        // onClick={() => logout()}
        />

        <div className="pb-6 flex flex-col gap-1 text-start">
          <h1 className="font-medium text-[32px] md:text-[48px] leading-[140%] tracking-[-1%] text-[#121212]">
            Email Confirmation
          </h1>

          <p className="text-[#475267] text-lg leading-[140%] tracking-[-0.44%]">
            A 6-digit confirmation code was sent to your email address,{' '}
            {/* <span className="text-foreground font-bold">{user.email}</span>. */}
            <span className="text-foreground font-bold">chidera@email.com</span>
            . Please enter below.
          </p>
        </div>

        <EmailVerificationForm email="chidera@email.com" />
      </div>
    </>
  );
};

export default EmailVerificationPage;
