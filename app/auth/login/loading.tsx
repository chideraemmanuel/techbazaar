import SpinnerWithoutHeader from '@/components/spinner-without-header';
import { FC } from 'react';

interface Props {}

const LoadingUserLoginPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithoutHeader />
    </>
  );
};

export default LoadingUserLoginPage;
