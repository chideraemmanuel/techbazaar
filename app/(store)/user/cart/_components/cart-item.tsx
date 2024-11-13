import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import { FC } from 'react';
import { Button } from '../../../../../components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Separator } from '../../../../../components/ui/separator';
import { ProductTypes } from '@/types/product';
import { ICart } from '@/types/cart';
import RemoveFromCartButton from './remove-from-cart-button';
import IncrementCartItemButton from './increment-cart-item-button';
import DecrementCartItemButton from './decrement-cart-item-button';
import RegionalPriceFormat from '@/components/regional-price-format';

interface Props {
  cart_item: ICart;
}

const CartItem: FC<Props> = ({ cart_item }) => {
  const { _id, product, quantity } = cart_item;

  return (
    <>
      <div className="p-3 sm:p-4 dark:bg-secondary/30 border shadow-sm rounded-md space-y-4 sm:space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-[90px] sm:w-[120px] h-[90px] sm:h-[120px] bg-secondary rounded-md sm:rounded-lg flex items-center justify-center">
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

            <span className="block text-lg sm:text-xl font-semibold">
              {product.name}
            </span>

            <RegionalPriceFormat
              price={product.price}
              className="block text-sm sm:text-base font-medium"
            />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between space-x-5">
          <div className="space-x-3">
            <DecrementCartItemButton asChild cartItem={cart_item}>
              <Button variant={'secondary'} className="h-7 sm:h-9 w-7 sm:w-9 ">
                <Minus />
              </Button>
            </DecrementCartItemButton>

            <span>{quantity}</span>

            <IncrementCartItemButton asChild cartItem={cart_item}>
              <Button
                variant={'secondary'}
                className="h-7 sm:h-9 w-7 sm:w-9 "
                disabled={quantity === product.stock}
              >
                <Plus />
              </Button>
            </IncrementCartItemButton>
          </div>

          <RemoveFromCartButton asChild cartItem={cart_item}>
            <Button
              variant={'ghost'}
              className="h-7 sm:h-9 w-7 sm:w-9 text-destructive hover:text-destructive hover:bg-destructive/20"
            >
              <Trash2 />
            </Button>
          </RemoveFromCartButton>
        </div>
      </div>
    </>
  );
};

export default CartItem;
