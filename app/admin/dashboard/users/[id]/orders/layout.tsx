import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: `Chidera's orders`,
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardUserOrdersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardUserOrdersLayout;
