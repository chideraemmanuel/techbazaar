import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'User 1 details',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardUserDetailsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardUserDetailsLayout;
