import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Order details',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardOrderDetailsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardOrderDetailsLayout;
