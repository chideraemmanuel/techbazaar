import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Verify Password Reset',
};

interface Props {
  children: React.ReactNode;
}

const VerifyPasswordResetLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default VerifyPasswordResetLayout;
