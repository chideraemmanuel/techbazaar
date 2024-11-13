import RegionalPriceFormat from '@/components/regional-price-format';
import { ICart } from '@/types/cart';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
  order_item: ICart;
}

const OrderItem: FC<Props> = ({ order_item }) => {
  const { product, quantity } = order_item;

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="w-[50px] sm:w-[70px] h-[50px] sm:h-[70px] bg-secondary rounded-md sm:rounded-lg flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={426}
            height={585}
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>

        <div>
          <span className="block text-foreground/90 text-sm sm:text-base">
            {product.name}{' '}
            <span className="text-muted-foreground text-xs sm:text-sm">
              ({quantity} pcs)
            </span>
          </span>

          <RegionalPriceFormat
            price={product.price}
            className="block text-muted-foreground text-xs sm:text-sm"
          />
        </div>
      </div>
    </>
  );
};

export default OrderItem;
