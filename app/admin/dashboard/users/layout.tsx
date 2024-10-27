import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'All users',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardUsersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardUsersLayout;
