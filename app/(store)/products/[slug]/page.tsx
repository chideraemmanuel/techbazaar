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
import { FC, Suspense } from 'react';
import ProductsGridContainer from '../../_components/products-grid-container';
import {
  getAvailableProductByIdOrSlug,
  getRelatedProducts,
} from '@/lib/data/product';
import AddToCartButton from '../../user/cart/_components/add-to-cart-button';
import CartAction from './_components/cart-action';

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;

  const product = await getAvailableProductByIdOrSlug(slug);

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

              <span className="block font-semibold text-xl md:text-2xl w-full truncate">
                ₦{product.price.toFixed(2)}
              </span>
            </div>

            <p
              className="text-muted-foreground line-clamp-4 md:w-[min(500px,_100%)]"
              title={product.description}
            >
              {product.description}
            </p>

            <div className="flex items-center space-x-2 md:w-[min(500px,_100%)]">
              <CartAction product={product} />

              <Button variant={'secondary'}>
                <Heart />
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl mb-4">Related products</h2>

          <Suspense>
            <RelatedProducts slug={slug} />
          </Suspense>
        </section>
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
