import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'iPhone 12 Pro',
};

interface Props {
  children: React.ReactNode;
}

const ProductDetailsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProductDetailsLayout;
