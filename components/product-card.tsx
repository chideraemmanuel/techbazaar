import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { IAvailableProduct } from '@/types/product';

interface Props {
  product: IAvailableProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <>
      <div className="group inline-block relative">
        <Link
          href={`/products/${product.slug}`}
          className="grid grid-rows-[1fr,_auto] h-full"
        >
          <div className="bg-secondary p-7 rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={426}
              height={585}
              className="w-full h-full group-hover:scale-105 transition-transform object-contain"
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
            <span className="block font-normal text-base w-[calc(100%-40px)] truncate">
              ₦{product.price.toFixed(2)}
            </span>
          </div>
        </Link>

        {/* <Button className="absolute bottom-1 right-0 w-9 h-9">
          <ShoppingCart className="!w-6 !h-6" />
        </Button> */}

        {/* <button className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-muted-foreground bg-background hover:bg-primary/80 hover:text-white transition-colors">
          <Heart className="w-4 h-4" />
        </button> */}

        <button className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-background bg-foreground/30 hover:bg-primary/80 hover:text-white transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default ProductCard;
