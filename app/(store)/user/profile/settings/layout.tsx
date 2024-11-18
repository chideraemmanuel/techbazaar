import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Profile Settings',
  description:
    'Update your account details, manage your preferences, and keep your profile up to date.',
};

interface Props {
  children: React.ReactNode;
}

const ProfileSettigsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProfileSettigsLayout;
