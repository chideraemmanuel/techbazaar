import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { IAvailableProduct, ProductTypes } from '@/types/product';
import WishlistAction from './wishlist-action';
import RegionalPriceFormat from './regional-price-format';

interface Props {
  product: ProductTypes;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <>
      <div className="group inline-block relative h-full w-full">
        <Link
          href={`/products/${product.slug}`}
          className="grid grid-rows-[1fr,_auto] h-full [&>*]:min-w-0"
        >
          <div className="bg-secondary rounded-lg relative min-h-[220px]">
            <Image
              src={product.image}
              alt={product.name}
              fill={true}
              className="group-hover:scale-105 transition-transform object-contain !max-w-[80%] !max-h-[80%] !top-1/2 !left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="p-1">
            <span className="block text-xs text-muted-foreground">
              {product.brand.name}
            </span>
            <span
              className="block font-semibold text-lg w-full truncate"
              title={product.name}
            >
              {product.name}
            </span>

            <RegionalPriceFormat
              price={product.price}
              className="block font-normal text-base w-[calc(100%-40px)] truncate"
            />
          </div>
        </Link>

        {/* <Button className="absolute bottom-1 right-0 w-9 h-9">
          <ShoppingCart className="!w-6 !h-6" />
        </Button> */}

        <WishlistAction product={product} />

        {(product.is_deleted || product.is_archived || product.stock === 0) && (
          <span className="absolute top-0 left-0 inline-block py-[2px] px-1 bg-destructive text-destructive-foreground text-xs rounded-tl-lg rounded-br-lg">
            {product.is_deleted ? 'Unavailable' : 'Out of stock'}
          </span>
        )}
      </div>
    </>
  );
};

export default ProductCard;
