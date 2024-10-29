import { DUMMY_PRODUCTS } from '@/dummy';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Button } from './ui/button';
import { Heart } from 'lucide-react';

interface Props {}

const ProductCard: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];

  return (
    <>
      <div className="group inline-block relative">
        <Link href={`/products/${product.slug}`}>
          <div className="bg-secondary p-7 rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={426}
              height={585}
              className="w-full h-full group-hover:scale-105 transition-transform"
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
            <span className="block font-normal text-base w-full truncate">
              ₦{product.price.toFixed(2)}
            </span>
          </div>
        </Link>

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
