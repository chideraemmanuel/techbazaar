import AdminDashboardProductsFilter from '@/app/admin/dashboard/_components/admin-dashboard-products-filter';
import AdminDashboardResourceSort from '@/app/admin/dashboard/_components/admin-dashboard-resource-sort';
import AdminDashboardResourceHeader from '@/app/admin/dashboard/_components/admin-dashboard-resource-header';
import BooleanBadge from '@/components/boolean-badge';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import {
  DeleteProductDialog,
  RestoreProductDialog,
} from '@/app/admin/dashboard/products/_components/delete-restore-product-dialogs';
import EditProductDialog from '@/app/admin/dashboard/products/_components/edit-product-dialog';
import NewProductDialog from '@/app/admin/dashboard/products/_components/new-product-dialog';
import ResourceSearch from '@/components/resource-search';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BODY_HEIGHT_WITH_HEADER,
  PRODUCT_CATEGORIES,
  PRODUCTS_SORT_ITEMS,
} from '@/constants';
import { DUMMY_PRODUCTS } from '@/dummy';
import { cn } from '@/lib/cn';
import { Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import { FC, Suspense } from 'react';
import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { getAllProducts } from '@/lib/data/product';
import NewProduct from './_components/new-product';
import EditProduct from './_components/edit-product';
import { ISearchParams } from '@/types';
import { getAvailableBrands } from '@/lib/data/brand';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { headers } from 'next/headers';
import RegionalPriceFormat from '@/components/regional-price-format';
import { delay } from '@/lib/delay';

interface Props {
  searchParams: Promise<ISearchParams>;
}

const AdminDashboardProductsPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname =
    headerList.get('x-current-path') || '/admin/dashboard/products';

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
      <div
        className={cn(BODY_HEIGHT_WITH_HEADER, 'flex flex-col bg-secondary')}
      >
        <AdminDashboardResourceHeader
          title="Products"
          subtitle="All products"
          fetchFunction={getAllProducts}
          breadcrumbs={
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <Suspense
            fallback={
              <div className="h-[70vh] flex items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
            }
          >
            <ProductsTable searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardProductsPage;

const tableHeaders = [
  '#',
  'product',
  'brand',
  'category',
  'featured',
  'price',
  'stock count',
  'archived',
  'deleted',
  'actions',
];

const ProductsTable: FC<{ searchParams: ISearchParams }> = async ({
  searchParams,
}) => {
  const productsPromise = getAllProducts(searchParams);
  const brandsPromise = getAvailableBrands();

  const [{ data: products, pagination }, brands] = await Promise.all([
    productsPromise,
    brandsPromise,
  ]);

  const formatted_brands = brands.map((brand) => ({
    name: brand.name,
    value: brand._id,
  }));

  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-background p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />

            <ResourceSearch
              placeholder="Search products..."
              className="shadow-sm text-base dark:bg-secondary/50 pl-10"
            />
          </div>

          <div className="space-x-2">
            <AdminDashboardProductsFilter brands={formatted_brands} />

            <AdminDashboardResourceSort sort_items={PRODUCTS_SORT_ITEMS} />

            <Suspense>
              <NewProduct />
            </Suspense>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="font-medium text-xs bg-background/50 hover:bg-background/50">
              {tableHeaders.map((header, index) => (
                <TableHead
                  className={cn(
                    'capitalize min-w-[150px]',
                    index === 0 && 'min-w-5'
                  )}
                  key={index}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <TableRow
                  key={product._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell
                    className="flex items-center gap-3 min-w-[200px] sm:min-w-[300px]"
                    title={product.name}
                  >
                    <div className="w-[70px] h-[70px] object-cover bg-secondary p-2 rounded">
                      <Image
                        className="w-full h-full"
                        src={product.image}
                        alt={product.name}
                        width={426}
                        height={585}
                      />
                    </div>

                    <span className="w-[120px] sm:w-[200px] truncate">
                      {product.name}
                    </span>
                  </TableCell>

                  <TableCell>{product.brand.name}</TableCell>

                  <TableCell className="capitalize">
                    {PRODUCT_CATEGORIES.find(
                      (category) => category.value === product.category
                    )?.name || '-'}
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={product.is_featured}>
                      {`${product.is_featured}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell>
                    <RegionalPriceFormat price={product.price} />
                  </TableCell>

                  <TableCell>{product.stock}</TableCell>

                  <TableCell>
                    <BooleanBadge truthy={product.is_archived}>
                      {`${product.is_archived}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={product.is_deleted}>
                      {`${product.is_deleted}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell className="space-x-1">
                    <Suspense>
                      <EditProduct product={product} />
                    </Suspense>

                    {product.is_deleted ? (
                      <RestoreProductDialog product={product} />
                    ) : (
                      <DeleteProductDialog product={product} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className="h-24 text-center bg-background hover:bg-background"
                >
                  No products to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="bg-background/50 border-t p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
          <DataTableItemsPerPage />

          <DataTablePagination
            totalPages={pagination.total_pages}
            totalPagesToDisplay={3}
          />
        </div>
      </div>
    </>
  );
};
