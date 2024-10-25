import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  //   title: {
  //     default: 'Reset Password',
  //     template: '%s - TechBazaar',
  //   },
  title: 'Reset Password',
};

interface Props {
  children: React.ReactNode;
}

const PasswordResetLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default PasswordResetLayout;
