import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your Wishlist',
  description:
    'Save your favorite gadgets for later. Browse and shop your wishlist whenever you’re ready.',
};

interface Props {
  children: React.ReactNode;
}

const UserWishlistLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserWishlistLayout;
