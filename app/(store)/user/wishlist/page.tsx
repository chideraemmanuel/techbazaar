import DataTablePagination from '@/components/data-table-pagination';
import ProductCard from '@/components/product-card';
import { getCurrentUser } from '@/lib/data/user';
import { getCurrentUserWishlist } from '@/lib/data/wishlist';
import { ISearchParams } from '@/types';
import { redirect } from 'next/navigation';
import { FC, Suspense } from 'react';
import ProductsGridContainer from '../../_components/products-grid-container';
import StoreFooter from '../../_components/store-footer';
import { headers } from 'next/headers';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const UserWishlistPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/user/wishlist';

  const searchParamsObject = await searchParams;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }

  return (
    <>
      <div className="container py-5 flex flex-col min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <div className="pb-4 md:pb-5">
          <span className="block pb-1 md:pb-2 text-muted-foreground font-medium text-sm sm:text-base">
            Hello, {user.first_name}
          </span>

          <h1 className="inline-block font-bold text-xl sm:text-2xl md:text-3xl">
            Your wishlist
          </h1>
        </div>

        {/* <Suspense> */}
        <WishlistContent searchParams={searchParamsObject} />
        {/* </Suspense> */}
      </div>

      <div className="container">
        <StoreFooter />
      </div>
    </>
  );
};

export default UserWishlistPage;

const WishlistContent: FC<{
  searchParams: ISearchParams;
}> = async ({ searchParams }) => {
  const { data: items, pagination } = await getCurrentUserWishlist(
    searchParams
  );

  return (
    <>
      <div className="flex-1 flex flex-col">
        {items.length > 0 ? (
          <>
            <div className="flex-1">
              <ProductsGridContainer className="mb-10">
                {items.map((item, index) => (
                  <ProductCard key={item._id} product={item.product} />
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
          <div className="flex items-center justify-center h-[50vh]">
            <span className="text-muted-foreground">
              You haven't added any item to your wishlist
            </span>
          </div>
        )}
      </div>
    </>
  );
};
// h-[calc(100vh-80px)]
