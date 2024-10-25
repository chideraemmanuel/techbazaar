import Logo from '@/components/logo';
import { FC, Suspense } from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Suspense>
        <div className="bg-white">
          <div className="container mx-auto relative flex items-center justify-center min-h-screen">
            <div className="absolute top-8 left-4 md:left-8">
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
