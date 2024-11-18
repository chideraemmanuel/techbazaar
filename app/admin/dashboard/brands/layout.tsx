import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminDashboardBrandsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardBrandsLayout;
