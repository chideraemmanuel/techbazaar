import AdminDashboardBrandsFilter from '@/app/admin/dashboard/_components/admin-dashboard-brands-filter';
import AdminDashboardResourceSort from '@/app/admin/dashboard/_components/admin-dashboard-resource-sort';
import AdminDashboardResourceHeader from '@/app/admin/dashboard/_components/admin-dashboard-resource-header';
import BooleanBadge from '@/components/boolean-badge';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import {
  DeleteBrandDialog,
  RestoreBrandDialog,
} from '@/app/admin/dashboard/brands/_components/delete-restore-brand-dialogs';
import NewBrandDialog from '@/app/admin/dashboard/brands/_components/new-brand-dialog';
import ResourceSearch from '@/components/resource-search';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/cn';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { FC, Suspense } from 'react';
import { getCurrentUser } from '@/lib/data/user';
import { redirect } from 'next/navigation';
import { getAllBrands } from '@/lib/data/brand';
import EditBrandDialog from './_components/edit-brand-dialog';
import { BRANDS_SORT_ITEMS } from '@/constants';
import { ISearchParams } from '@/types';
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

interface Props {
  searchParams: Promise<ISearchParams>;
}

const AdminDashboardBrandsPage: FC<Props> = async ({ searchParams }) => {
  const headerList = await headers();
  const pathname =
    headerList.get('x-current-path') || '/admin/dashboard/brands';

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
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <AdminDashboardResourceHeader
          title="Brands"
          subtitle="All brands"
          fetchFunction={getAllBrands}
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
                  <BreadcrumbPage>Brands</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          }
        />

        <div className="flex-1 p-5 space-y-7">
          <Suspense>
            <BrandsTable searchParams={searchParamsObject} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardBrandsPage;

const tableHeaders = ['#', 'brand', 'deleted', 'actions'];

const BrandsTable: FC<{ searchParams: ISearchParams }> = async ({
  searchParams,
}) => {
  const { data: brands, pagination } = await getAllBrands(searchParams);

  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-background p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />

            <ResourceSearch
              placeholder="Search brands..."
              className="shadow-sm text-base dark:bg-secondary/50 pl-10"
            />
          </div>

          <div className="space-x-2">
            <AdminDashboardBrandsFilter />

            <AdminDashboardResourceSort sort_items={BRANDS_SORT_ITEMS} />

            <NewBrandDialog />
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
            {brands && brands.length > 0 ? (
              brands.map((brand, index) => (
                <TableRow
                  key={brand._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell
                    className="flex items-center gap-3 min-w-[200px] sm:min-w-[300px]"
                    title={brand.name}
                  >
                    <div className="w-[70px] h-[70px] object-cover bg-secondary p-2 rounded">
                      {brand.logo ? (
                        <Image
                          className="w-full h-full"
                          src={brand.logo}
                          alt={brand.name}
                          width={426}
                          height={585}
                        />
                      ) : (
                        <span className="h-full flex items-center justify-center text-xl">
                          {brand.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <span className="w-[120px] sm:w-[200px] truncate">
                      {brand.name}
                    </span>
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={brand.is_deleted}>
                      {`${brand.is_deleted}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell className="space-x-1">
                    <EditBrandDialog brand={brand} />

                    {brand.is_deleted ? (
                      <RestoreBrandDialog brand={brand} />
                    ) : (
                      <DeleteBrandDialog brand={brand} />
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
                  No brands to display
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
