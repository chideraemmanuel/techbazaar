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
import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';

interface Props {}

const Home: FC<Props> = () => {
  return (
    <>
      {/* hero */}
      <section className="h-[50vh] bg-secondary"></section>

      {/* body */}
      <div className="py-7 space-y-14">
        {/* categories */}
        <section>
          <div className="container">
            <SectionHeader title="Categories" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRODUCT_CATEGORIES.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:ring-2 hover:ring-ring hover:ring-offset-2"
                >
                  <Card className="px-3 sm:px-5 py-3 sm:py-5 flex items-center space-x-2 sm:space-x-3">
                    <Laptop />
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

            <div className="grid grid-cols-[repeat(auto-fill,_minmax(130px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(170px,_1fr))] gap-4 sm:gap-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
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
