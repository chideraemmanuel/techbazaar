import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const CategoryLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
