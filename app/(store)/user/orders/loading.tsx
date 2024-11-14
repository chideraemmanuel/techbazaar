import SpinnerWithHeader from '@/components/spinner-with-header';
import { FC } from 'react';

interface Props {}

const LoadingOrdersPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithHeader />
    </>
  );
};

export default LoadingOrdersPage;
