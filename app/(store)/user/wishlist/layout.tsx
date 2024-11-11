import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your wishlist',
};

interface Props {
  children: React.ReactNode;
}

const UserWishlistLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserWishlistLayout;
