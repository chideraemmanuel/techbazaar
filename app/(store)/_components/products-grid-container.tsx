import { cn } from '@/lib/cn';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ProductsGridContainer: FC<Props> = ({ children, className }) => {
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-4 sm:gap-5',
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default ProductsGridContainer;
