import ProductCard from '@/components/product-card';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PRODUCT_CATEGORIES, SERVICES } from '@/constants';
import { cn } from '@/lib/cn';
import { ChevronRight, Loader2, LucideProps } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ComponentPropsWithoutRef,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
  Suspense,
} from 'react';
// import heroImage from '@/assets/images/hero-image.png';
import heroImage from '@/assets/images/hero.png';
import phone from '@/assets/images/phone.png';
import ProductsGridContainer from './_components/products-grid-container';
import StoreFooter from './_components/store-footer';
import {
  getFeaturedProducts,
  getNewProducts,
  getRandomProducts,
} from '@/lib/data/product';
import { getAvailableBrands } from '@/lib/data/brand';
import shuffleArray from '@/lib/shuffle-array';

interface Props {}

interface IProductCategories {
  name: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  image: string;
  hero_image: string;
  hero_header: string;
  hero_paragraph: string;
}

const Homepage: FC<Props> = () => {
  return (
    <>
      <section className="h-[60vh] md:h-[70vh] bg-secondary">
        <div className="container h-full flex items-center gap-7">
          <div className="flex-[3] space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
              Your Go-To Spot for the Best Gadgets
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Find the latest tech made easy. From smart devices to everyday
              essentials, we bring you gadgets that fit right into your
              lifestyle – all in one place, all at the right price.
            </p>

            <Link
              href={'/products'}
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              Shop now
            </Link>
          </div>

          <div className="flex-[2] h-full py-7 hidden md:block">
            <Image
              src={heroImage.src}
              alt="hero"
              width={heroImage.width}
              height={heroImage.width}
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
                  key={category.value}
                  href={`/categories/${category.value}`}
                  className="group rounded-lg"
                >
                  <Card className="px-3 sm:px-5 py-3 sm:py-5 flex items-center space-x-2 sm:space-x-3 group-hover:border-foreground/20 group-hover:bg-secondary/50 transition-colors">
                    {/* <div className="w-[50px] h-[50px]">
                      <Image
                        src={phone.src}
                        alt="#"
                        width={426}
                        height={585}
                        className="w-full h-full object-contain transition-transform group-hover:scale-110"
                      />
                    </div> */}
                    <category.icon className="text-foreground/75" />
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
            <Suspense
              fallback={
                <>
                  <SectionHeader
                    title="Featured products"
                    // addSeeAll={true}
                    // seeAllHref="#"
                  />
                  <div className="flex items-center justify-center h-[265px]">
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                </>
              }
            >
              <FeaturedProducts />
            </Suspense>
          </div>
        </section>

        <section>
          <div className="container">
            <Suspense
              fallback={
                <>
                  <SectionHeader title="Shop by brand" />
                  <div className="flex items-center justify-center h-[92px]">
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                </>
              }
            >
              <Brands />
            </Suspense>
          </div>
        </section>

        <section>
          <div className="container">
            <Suspense
              fallback={
                <>
                  <SectionHeader title="New Arrivals" />
                  <div className="flex items-center justify-center h-[265px]">
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                </>
              }
            >
              <NewProducts />
            </Suspense>
          </div>
        </section>

        <RandomCategory />

        <section>
          <div className="container">
            <Suspense
              fallback={
                <>
                  <SectionHeader
                    title="Top products for you"
                    addSeeAll={true}
                    seeAllHref="/products"
                  />
                  <div className="flex items-center justify-center h-[265px]">
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>
                </>
              }
            >
              <RandomProducts />
            </Suspense>
          </div>
        </section>

        <section>
          <div className="container">
            <SectionHeader title="Services to help you shop" />

            <Services />
          </div>
        </section>
      </div>

      <div className="container">
        <StoreFooter />
      </div>
    </>
  );
};

export default Homepage;

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

const FeaturedProducts: FC = async () => {
  const { data: featured_products, pagination } = await getFeaturedProducts();

  return (
    <>
      {featured_products.length > 0 && (
        <>
          <SectionHeader
            title="Featured products"
            // addSeeAll={true}
            // seeAllHref="#"
          />

          <ProductsGridContainer>
            {featured_products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductsGridContainer>
        </>
      )}
    </>
  );
};

const Brands: FC = async () => {
  const brands = await getAvailableBrands();

  return (
    <>
      <SectionHeader title="Shop by brand" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-in fade-in-0 duration-700">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/products?brand=${brand._id}`}
            className="group rounded-lg"
          >
            <Card className="px-3 sm:px-5 py-3 sm:py-5 flex items-center space-x-2 sm:space-x-3 group-hover:border-foreground/20 group-hover:bg-secondary/50 transition-colors">
              <div className="w-[50px] h-[50px] bg-secondary p-2 rounded">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt="#"
                    width={426}
                    height={585}
                    className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  />
                ) : (
                  <span className="h-full flex items-center justify-center text-xl">
                    {brand.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="capitalize text-sm sm:text-base">
                {brand.name}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

const NewProducts: FC = async () => {
  const { data: new_products, pagination } = await getNewProducts();

  return (
    <>
      {new_products.length > 0 && (
        <>
          <SectionHeader title="New Arrivals" />

          <Carousel className="animate-in fade-in-0 duration-700">
            <CarouselContent>
              {new_products.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="basis-[80%] [@media_(min-width:_375px)]:basis-[60%] [@media_(min-width:_440px)]:basis-[40%] [@media_(min-width:_520px)]:basis-[30%] sm:!basis-[30%] md:!basis-[23%] lg:!basis-[15%]"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </>
      )}
    </>
  );
};

const RandomCategory: FC = () => {
  const random_category =
    shuffleArray<IProductCategories>(PRODUCT_CATEGORIES)[0];

  return (
    <>
      <section className="h-[40vh] md:h-[50vh] bg-secondary">
        <div className="container h-full flex items-center gap-5">
          <div className="flex-[3] space-y-5">
            <h1 className="text-3xl lg:text-4xl font-semibold">
              {random_category.hero_header}
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              {random_category.hero_paragraph}
            </p>

            <Link
              href={`/categories/${random_category.value}`}
              className={buttonVariants()}
            >
              Shop now
            </Link>
          </div>

          <div className="flex-[2] h-full py-7 hidden md:block">
            <Image
              src={random_category.hero_image}
              alt={'#'}
              width={295}
              height={379}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const RandomProducts: FC = async () => {
  const random_products = await getRandomProducts();

  return (
    <>
      {random_products.length > 0 && (
        <>
          <SectionHeader
            title="Top products for you"
            addSeeAll={true}
            seeAllHref="#"
          />

          <ProductsGridContainer>
            {random_products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ProductsGridContainer>
        </>
      )}
    </>
  );
};

const Services: FC = () => {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-3">
        {SERVICES.map((service) => (
          <Link key={service.title} href={service.href} className="group">
            <Card className="overflow-hidden grid grid-rows-2 h-[370px] max-w-none md:max-w-[400px] bg-secondary shadow-sm">
              <CardHeader className="flex flex-col justify-center">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>

              <CardFooter className="p-0 overflow-hidden">
                <Image
                  src={service.image.src}
                  alt={service.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full group-hover:scale-110 transition-transform"
                />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};
