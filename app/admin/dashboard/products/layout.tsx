import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminDashboardProductsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardProductsLayout;
