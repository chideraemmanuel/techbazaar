import UserLoginForm from '@/components/user-login-form';
import { getCurrentUser } from '@/lib/data/user';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const UserLoginPage: FC<Props> = async () => {
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
            Welcome back!
          </h1>
          <p className="w-[90%] mx-auto text-base text-muted-foreground leading-[140%] tracking-[-0.4%]">
            Fill in your details to login.
          </p>
        </div>

        <UserLoginForm />

        <div className="pt-5 text-center">
          <p className="text-base text-muted-foreground leading-[140%] tracking-[-0.4%]">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-primary underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;
