import StoreHeader from '@/app/(store)/_components/store-header';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Shop the Best Gadgets Online',
    template: '%s | TechBazaar',
  },
  description:
    'Discover the latest gadgets at unbeatable prices. From smartphones, to laptops, to tablets, to gaming consoles and more! Shop for all your tech needs in one place.',
  keywords: [
    'Gadgets online store',
    'Buy gadgets online',
    'Latest gadgets for sale',
    'Affordable tech gadgets',
    'Online gadget shopping',
    'Smart devices',
    'Tech essentials',
    'Best gadget deals',
    'Electronics and gadgets',
  ],
};

interface Props {
  children: React.ReactNode;
}

const StoreLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div>
        <StoreHeader />

        <main>{children}</main>
      </div>
    </>
  );
};

export default StoreLayout;
