import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Create an account',
};

interface Props {
  children: React.ReactNode;
}

const UserRegistrationLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserRegistrationLayout;
