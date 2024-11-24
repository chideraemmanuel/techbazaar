import Logo from '@/components/logo';
import NotFoundComponentWithoutHeader from '@/components/not-found-component-without-header';
import { FC } from 'react';

interface Props {}

const NotFoundPage: FC<Props> = () => {
  return (
    <>
      <div className="absolute z-10 top-8 left-4 md:left-8">
        <Logo />
      </div>

      <NotFoundComponentWithoutHeader />
    </>
  );
};

export default NotFoundPage;
