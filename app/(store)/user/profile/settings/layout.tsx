import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Manage profile',
};

interface Props {
  children: React.ReactNode;
}

const ProfileSettigsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProfileSettigsLayout;
