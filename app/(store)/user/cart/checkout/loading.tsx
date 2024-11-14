import SpinnerWithHeader from '@/components/spinner-with-header';
import { FC } from 'react';

interface Props {}

const LoadingUserCartCheckoutPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithHeader />
    </>
  );
};

export default LoadingUserCartCheckoutPage;
