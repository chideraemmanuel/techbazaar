'use client';

import { Button } from '@/components/ui/button';
import OTPInput from '@/components/ui/otp-input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  email: string;
}

const VerifyPasswordResetForm: FC<Props> = ({ email }) => {
  const [OTP, setOTP] = React.useState('');

  const router = useRouter();

  const handleClick = () => {
    const encryptedOTP = OTP;

    router.push(
      `/auth/reset-password?email=${encodeURIComponent(
        email
      )}&p=${encodeURIComponent(encryptedOTP)}`
    );
  };

  return (
    <>
      <div className="pb-12">
        <OTPInput onOTPChange={(otp) => setOTP(otp)} />
      </div>

      <div className="space-y-3">
        <Button
          className="w-full"
          disabled={OTP.length < 6}
          onClick={() => handleClick()}
        >
          Continue
        </Button>

        <Button variant={'outline'} className="w-full" asChild>
          <Link href={'/auth/login'}>Back to login page</Link>
        </Button>
      </div>
    </>
  );
};

export default VerifyPasswordResetForm;
