import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Request Password Reset',
};

interface Props {
  children: React.ReactNode;
}

const RequestPasswordResetLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default RequestPasswordResetLayout;
