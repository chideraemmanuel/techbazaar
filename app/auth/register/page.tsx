import UserRegistrationForm from '@/components/user-registration-form';
import axios from '@/config/axios';
import { getCurrentUser } from '@/lib/data/user';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const UserRegistrationPage: FC<Props> = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (!user.email_verified) {
      redirect('/auth/verify-email');
    }

    redirect('/');
  }

  return (
    <>
      <div className="bg-background">
        <div className="pb-6 text-center">
          <h1 className="font-medium text-[32px] md:text-[48px] leading-[140%] tracking-[-1%]">
            Create an account
          </h1>
          <p className="w-[90%] mx-auto text-base text-muted-foreground leading-[140%] tracking-[-0.4%]">
            Fill in the details to create an account.
          </p>
        </div>

        <UserRegistrationForm />

        <div className="pt-5 text-center">
          <p className="text-base text-muted-foreground leading-[140%] tracking-[-0.4%]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationPage;
