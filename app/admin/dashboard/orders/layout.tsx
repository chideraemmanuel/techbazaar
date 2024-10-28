import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'All orders',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardOrdersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardOrdersLayout;
