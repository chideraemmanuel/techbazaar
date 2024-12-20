'use client';

import React, { FC } from 'react';
import OTPInput from '../../../components/ui/otp-input';
import { Button } from '../../../components/ui/button';
import { Loader2 } from 'lucide-react';
import FullScreenSpinner from '../../../components/full-screen-spinner';
import useVerifyEmail from '@/lib/hooks/auth/use-verify-email';
import useResendVerificationOTP from '@/lib/hooks/auth/use-resend-verification-OTP';

interface Props {
  email: string;
}

const EmailVerificationForm: FC<Props> = ({ email }) => {
  const [OTP, setOTP] = React.useState('');

  const { mutate: verifyEmail, isLoading: isVerifyingEmail } = useVerifyEmail();

  const {
    mutate: resendVerificationOTP,
    isLoading: isResendingVerificationOTP,
  } = useResendVerificationOTP();

  return (
    <>
      {isResendingVerificationOTP && <FullScreenSpinner />}

      <div className="pb-12">
        <OTPInput onOTPChange={(otp) => setOTP(otp)} />
      </div>

      <Button
        className="w-full"
        disabled={isVerifyingEmail || OTP.length < 6}
        onClick={() => verifyEmail({ email: email, OTP: OTP })}
      >
        {isVerifyingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify
      </Button>

      <div className="pt-5 text-center">
        <p className="text-base text-muted-foreground leading-[140%] tracking-[-0.4%]">
          {/* TODO: add expiration timer..? */}
          {/* OTP will expire in 1:00. Didn't receive mail?{' '} */}
          Didn't receive mail?{' '}
          <button
            className="text-primary underline disabled:pointer-events-none disabled:opacity-50"
            disabled={isResendingVerificationOTP}
            onClick={() => resendVerificationOTP(email)}
          >
            Resend
          </button>
        </p>
      </div>
    </>
  );
};

export default EmailVerificationForm;
