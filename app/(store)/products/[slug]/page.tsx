import ProductCard from '@/components/product-card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
import ProductsGridContainer from '../../_components/products-grid-container';
import {
  getAvailableProductByIdOrSlug,
  getRelatedProducts,
} from '@/lib/data/product';
import CartAction from './_components/cart-action';
import WishlistAction from './_components/wishlist-action';
import StoreFooter from '../../_components/store-footer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import RegionalPriceFormat from '@/components/regional-price-format';

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;

  const product = await getAvailableProductByIdOrSlug(slug);

  if (!product) notFound();

  return (
    <>
      <div className="container space-y-20">
        <section className="pt-5 space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="md:h-[50vh] flex flex-col md:flex-row gap-5 mb-12">
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
              <div>
                <span className="block text-sm text-muted-foreground">
                  {product.brand.name}
                </span>

                <span
                  className="block font-bold text-2xl md:text-4xl mb-5"
                  title={product.name}
                >
                  {product.name}
                </span>

                <RegionalPriceFormat
                  price={product.price}
                  className="block font-semibold text-xl md:text-2xl w-full truncate"
                />
              </div>

              <p
                className="text-muted-foreground line-clamp-4 md:w-[min(500px,_100%)]"
                title={product.description}
              >
                {product.description}
              </p>

              <div className="flex items-center space-x-2 md:w-[min(500px,_100%)]">
                <CartAction product={product} />

                <WishlistAction product={product} />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Related products</h2>

          <Suspense>
            <RelatedProducts slug={slug} />
          </Suspense>
        </section>

        <StoreFooter />
      </div>
    </>
  );
};

export default ProductDetailsPage;

const RelatedProducts: FC<{ slug: string }> = async ({ slug }) => {
  const products = await getRelatedProducts(slug);

  return (
    <>
      {products.length > 0 ? (
        <ProductsGridContainer>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </ProductsGridContainer>
      ) : (
        <div>
          <span>No related products</span>
        </div>
      )}
    </>
  );
};
