import DataTablePagination from '@/components/data-table-pagination';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RiFilter3Line, RiSortDesc } from '@remixicon/react';
import { FC, Suspense } from 'react';
import CategoryPageSideFilter from './_components/category-page-side-filter';
import { getAvailableBrands } from '@/lib/data/brand';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import ProductsGridContainer from '../../_components/products-grid-container';
import { DUMMY_PRODUCTS } from '@/dummy';
import { getAvailableProducts } from '@/lib/data/product';
import { ISearchParams } from '@/types';
import { PRODUCT_CATEGORIES } from '@/constants';
import { notFound } from 'next/navigation';
import { ProductCategory } from '@/types/product';

interface Props {
  searchParams: Promise<ISearchParams>;
  params: Promise<{ category: string }>;
}

const CategoryPage: FC<Props> = async ({ searchParams, params }) => {
  const { category } = await params;

  const categoryExists = PRODUCT_CATEGORIES.find(
    (product_category) => product_category.value === category
  );

  if (!categoryExists) notFound();

  const searchParamsObject = await searchParams;

  return (
    <>
      {/* hero */}
      <section className="h-[50vh] bg-secondary"></section>

      <section className="pt-7 container grid md:grid-cols-[250px,_1fr]">
        <aside className="sticky top-[calc(80px+8px)] border border-border h-[calc(100vh-80px-16px)] hidden md:block rounded-lg overflow-hidden">
          <ScrollArea className="h-full py-3 px-2">
            <Suspense>
              <Filter />
            </Suspense>
          </ScrollArea>
        </aside>

        <div className="container md:pr-0">
          <div className="flex md:hidden justify-end space-x-2 py-2 mb-3 bg-background sticky top-[63px] md:top-[79px] z-[3]">
            <Sheet>
              <SheetTrigger asChild>
                <Button size={'sm'} variant={'outline'}>
                  <RiFilter3Line />
                  <span className="inline-block">Filter</span>
                </Button>
              </SheetTrigger>

              <SheetContent side={'bottom'} className="md:hidden p-0">
                <ScrollArea className="h-[70vh] p-6">
                  <Suspense>
                    <Filter sheetClose={SheetClose} />
                  </Suspense>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          <Suspense>
            <ProductsGrid
              searchParams={searchParamsObject}
              category={category as ProductCategory}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;

const Filter: FC<{ sheetClose?: any }> = async ({ sheetClose }) => {
  const brands = await getAvailableBrands();

  const formatted_brands = brands.map((brand) => ({
    name: brand.name,
    value: brand._id,
  }));

  return (
    <>
      <CategoryPageSideFilter
        brands={formatted_brands}
        sheetClose={sheetClose}
      />
    </>
  );
};

const ProductsGrid: FC<{
  searchParams: ISearchParams;
  category: ProductCategory;
}> = async ({ searchParams, category }) => {
  const { data: products, pagination } = await getAvailableProducts({
    ...searchParams,
    category,
  });

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
          <div className="flex items-center justify-center h-[calc(100vh-80px)] md:h-full">
            <span className="text-muted-foreground">
              No products to display
            </span>
          </div>
        )}
      </div>
    </>
  );
};
