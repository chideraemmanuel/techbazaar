import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminDashboardUsersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardUsersLayout;
