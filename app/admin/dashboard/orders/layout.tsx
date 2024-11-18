import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminDashboardOrdersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardOrdersLayout;
