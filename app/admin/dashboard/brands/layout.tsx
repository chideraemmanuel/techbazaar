import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'All brands',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardBrandsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardBrandsLayout;
