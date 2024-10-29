import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { DUMMY_PRODUCTS } from '@/dummy';
import { Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const ProductDetailsPage: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];

  if (!product) notFound();
  return (
    <>
      <div className="container">
        <div>
          <span className="text-xs font-semibold text-muted-foreground">
            Breadcrumbs here!
          </span>
        </div>

        <section className="md:h-[50vh] flex flex-col md:flex-row gap-5 mb-12">
          <div className="md:flex-1 bg-secondary rounded-lg h-[40vh] md:h-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={426}
              height={585}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>

          <div className="md:flex-1 flex flex-col gap-8 md:gap-10">
            <div className="space-y-2 md:space-y-3">
              <span className="block text-sm text-muted-foreground">
                {product.brand.name}
              </span>
              <span className="block font-bold text-2xl" title={product.name}>
                {product.name}
              </span>
              <span className="block font-normal text-base w-full truncate">
                ₦{product.price.toFixed(2)}
              </span>
            </div>

            <p
              className="text-muted-foreground line-clamp-4"
              title={product.description}
            >
              {product.description}
            </p>

            <div className="flex items-center space-x-2">
              <Button className="flex-1">
                <ShoppingBag /> Add to cart
              </Button>

              <Button variant={'secondary'}>
                <Heart />
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Related products</h2>

          <Carousel>
            <CarouselContent>
              {Array.from({ length: 10 }).map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[80%] [@media_(min-width:_375px)]:basis-[60%] [@media_(min-width:_520px)]:basis-[30%] sm:!basis-[30%] md:!basis-[23%] lg:!basis-[19%]"
                >
                  <ProductCard />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default ProductDetailsPage;
