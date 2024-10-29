import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import { FC } from 'react';
import { Button } from './ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface Props {}

const CartItem: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];

  return (
    <>
      <div className="p-3 dark:bg-secondary/30 border shadow-sm rounded-md  flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-1">
        <div className="flex-1 inline-flex items-center gap-2">
          <div className="w-[50px] sm:w-[70px] h-[50px] sm:h-[70px] bg-secondary rounded-md sm:rounded-lg flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={426}
              height={585}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>

          <div className="flex-1">
            <span className="text-xs text-muted-foreground">
              {product.brand.name}
            </span>

            <span className="block text-sm sm:text-base font-medium">
              {product.name}
            </span>
          </div>
        </div>

        <div className="lg:flex-1 flex items-center justify-between space-x-3">
          <div className="space-x-3">
            <Button variant={'secondary'} className="h-7 sm:h-9 w-7 sm:w-9 ">
              <Minus />
            </Button>

            <span>7</span>

            <Button variant={'secondary'} className="h-7 sm:h-9 w-7 sm:w-9 ">
              <Plus />
            </Button>
          </div>

          <Button
            variant={'ghost'}
            className="h-7 sm:h-9 w-7 sm:w-9 text-destructive hover:text-destructive hover:bg-destructive/20"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
