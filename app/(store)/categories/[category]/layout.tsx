import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Smartphones for you',
};

interface Props {
  children: React.ReactNode;
}

const CategoryLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default CategoryLayout;
