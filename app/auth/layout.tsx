import Logo from '@/components/logo';
import { getCurrentUser } from '@/lib/data/user';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { FC, Suspense } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'TechBazaar',
    template: '%s | TechBazaar',
  },
};

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = async ({ children }) => {
  const user = await getCurrentUser();

  if (user && user.email_verified) {
    redirect('/');
  }

  return (
    <>
      <Suspense>
        <div className="bg-background">
          <div className="container mx-auto relative flex items-center justify-center min-h-screen">
            <div className="absolute z-10 top-8 left-4 md:left-8">
              <Logo />
            </div>

            <main className="w-[min(570px,_100%)] py-28">{children}</main>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default AuthLayout;
