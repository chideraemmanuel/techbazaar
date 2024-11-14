import SpinnerWithHeader from '@/components/spinner-with-header';
import { FC } from 'react';

interface Props {}

const LoadingAdminDashboardOrderDetailsPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithHeader />
    </>
  );
};

export default LoadingAdminDashboardOrderDetailsPage;
