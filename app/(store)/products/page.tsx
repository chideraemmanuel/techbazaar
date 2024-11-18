import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getAvailableProducts } from '@/lib/data/product';
import { ISearchParams } from '@/types';
import { RiFilter3Line } from '@remixicon/react';
import { FC, Suspense } from 'react';
import ProductsGridContainer from '../_components/products-grid-container';
import ProductCard from '@/components/product-card';
import DataTablePagination from '@/components/data-table-pagination';
import { getAvailableBrands } from '@/lib/data/brand';
import ProductsPageSideFilter from './_components/products-page-side-filter';
import { Loader2 } from 'lucide-react';
import SideFilterLoading from '../_components/side-filter-loading';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  searchParams: Promise<ISearchParams>;
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const searchParamsObject = await searchParams;
  const { search_query } = searchParamsObject;

  return {
    title: search_query
      ? `Search results for ${search_query}`
      : 'Explore Our Gadget Collection',
    description:
      'Browse our wide selection of gadgets, including smartphones, laptops, smartwatches, and more. Find high-quality tech products tailored to your lifestyle.',
    openGraph: {
      title: '',
      description: '',
    },
  };
}

const ProductsPage: FC<Props> = async ({ searchParams }) => {
  const searchParamsObject = await searchParams;
  const { search_query } = searchParamsObject;

  return (
    <>
      <section className="pt-2 container grid md:grid-cols-[250px,_1fr]">
        <aside className="sticky top-[calc(80px+8px)] border border-border h-[calc(100vh-80px-16px)] hidden md:block rounded-lg overflow-hidden">
          <ScrollArea className="h-full py-3 px-2">
            <Suspense fallback={<SideFilterLoading />}>
              <Filter />
            </Suspense>
          </ScrollArea>
        </aside>

        <div className="container md:pr-0 py-5 flex flex-col">
          <div className="pb-4 md:pb-5">
            <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
              {search_query ? `Results for ${search_query}` : 'All products'}
            </h1>
          </div>

          <div className="flex md:hidden justify-end space-x-2 py-2 mb-3 bg-background sticky top-[63px] md:top-[79px] z-[3]">
            <Sheet>
              <SheetTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                  <RiFilter3Line />
                  <span className="inline-block">Filter</span>
                </Button>
              </SheetTrigger>

              <SheetContent side={'bottom'} className="md:hidden p-0">
                <ScrollArea className="h-[50vh] p-6">
                  <Suspense fallback={<SideFilterLoading />}>
                    <Filter sheetClose={SheetClose} />
                  </Suspense>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
            }
          >
            <ProductsGrid searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;

const Filter: FC<{ sheetClose?: any }> = async ({ sheetClose }) => {
  const brands = await getAvailableBrands();

  const formatted_brands = brands.map((brand) => ({
    name: brand.name,
    value: brand._id,
  }));

  return (
    <>
      <ProductsPageSideFilter
        brands={formatted_brands}
        sheetClose={sheetClose}
      />
    </>
  );
};

const ProductsGrid: FC<{
  searchParams: ISearchParams;
}> = async ({ searchParams }) => {
  const { data: products, pagination } = await getAvailableProducts(
    searchParams
  );

  return (
    <>
      <div className="flex flex-col h-full">
        {products.length > 0 ? (
          <>
            <div className="flex-1">
              <ProductsGridContainer className="mb-10">
                {products.map((product, index) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </ProductsGridContainer>
            </div>

            <div className="flex justify-center pb-7">
              <DataTablePagination
                totalPages={pagination.total_pages}
                totalPagesToDisplay={3}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[50vh] md:h-full">
            <span className="text-muted-foreground">
              No products to display
            </span>
          </div>
        )}
      </div>
    </>
  );
};
