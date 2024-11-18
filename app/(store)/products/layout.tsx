import { ISearchParams } from '@/types';
import { Metadata, ResolvingMetadata } from 'next';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  searchParams: Promise<ISearchParams>;
}

const ProductsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default ProductsLayout;
