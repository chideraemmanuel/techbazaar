import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PRODUCT_CATEGORIES } from '@/constants';
import { cn } from '@/lib/cn';
import { ChevronRight, Laptop } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';
import heroImage from '@/assets/images/hero-image.png';
import phone from '@/assets/images/phone.png';
import ProductsGridContainer from './_components/products-grid-container';
import { DUMMY_PRODUCTS } from '@/dummy';

interface Props {}

const Home: FC<Props> = () => {
  const product = DUMMY_PRODUCTS[0];
  return (
    <>
      <section className="h-[60vh] md:h-[70vh] bg-secondary">
        <div className="container h-full flex items-center gap-5">
          <div className="flex-[3] space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              dolorem laboriosam optio quasi perspiciatis minus rerum nam
              obcaecati aliquam sint deserunt eveniet facilis omnis explicabo
              modi maiores, voluptatem, tempore sed.
            </p>

            <Button size={'lg'}>Shop now</Button>
          </div>

          <div className="flex-[2] h-full py-7 hidden md:block">
            <Image
              src={heroImage.src}
              alt="hero"
              width={295}
              height={379}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      <div className="py-7 space-y-14">
        <section>
          <div className="container">
            <SectionHeader title="Categories" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRODUCT_CATEGORIES.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group rounded-lg"
                >
                  <Card className="px-3 sm:px-5 py-3 sm:py-5 flex items-center space-x-2 sm:space-x-3 group-hover:border-foreground/20 group-hover:bg-secondary/50 transition-colors">
                    <div className="w-[50px] h-[50px]">
                      <Image
                        src={phone.src}
                        alt="#"
                        width={426}
                        height={585}
                        className="w-full h-full object-contain transition-transform group-hover:scale-110"
                      />
                    </div>
                    {/* <Laptop /> */}
                    <span className="capitalize text-sm sm:text-base">
                      {category.name}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <SectionHeader
              title="Featured products"
              addSeeAll={true}
              seeAllHref="#"
            />

            <ProductsGridContainer>
              <ProductCard product={product} />
              <ProductCard product={product} />
              <ProductCard product={product} />
              <ProductCard product={product} />
              <ProductCard product={product} />
              <ProductCard product={product} />
            </ProductsGridContainer>
          </div>
        </section>

        <section>
          <div className="container">
            <SectionHeader
              title="New Arrivals"
              addSeeAll={true}
              seeAllHref="#"
            />

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
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

interface SectionHeaderProps {
  title: string;
  containerProps?: Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
  textProps?: Omit<ComponentPropsWithoutRef<'h2'>, 'children'>;
  addSeeAll?: boolean;
  seeAllHref?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  containerProps,
  textProps,
  addSeeAll,
  seeAllHref,
}) => {
  return (
    <>
      <div
        {...containerProps}
        className={cn(
          'mb-4 flex justify-between items-center',
          containerProps?.className
        )}
      >
        <h2
          {...textProps}
          className={cn('font-bold text-xl', textProps?.className)}
        >
          {title}
        </h2>

        {addSeeAll && seeAllHref && (
          <Button
            asChild
            variant={'link'}
            size={'sm'}
            className="!gap-1 text-muted-foreground"
          >
            <Link href={seeAllHref}>
              See all <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};
