import AdminDashboardBrandsFilter from '@/app/admin/dashboard/_components/admin-dashboard-brands-filter';
import AdminDashboardResourceSort from '@/app/admin/dashboard/_components/admin-dashboard-resource-sort';
import AdminDashboardResourceHeader from '@/app/admin/dashboard/_components/admin-dashboard-resource-header';
import BooleanBadge from '@/components/boolean-badge';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import {
  DeleteProductDialog,
  RestoreProductDialog,
} from '@/app/admin/dashboard/products/_components/delete-restore-product-dialogs';
import EditBrandDialog from '@/app/admin/dashboard/products/_components/edit-product-dialog';
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
import getCurrentUser from '@/lib/data/get-current-user';
import { redirect } from 'next/navigation';
import { getAllBrands } from '@/lib/data/brand';

interface Props {}

const AdminDashboardBrandsPage: FC<Props> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login?return_to=/admin/dashboard/brands');
  }

  if (user && !user.email_verified) {
    redirect('/auth/verify-email?return_to=/admin/dashboard/brands');
  }

  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <div className="sticky top-16 md:top-20 z-[1] p-5 border-b bg-background">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">
              Breadcrumbs here!
            </span>

            <h1 className="pb-3 pt-2 text-foreground font-bold text-2xl">
              Brands
            </h1>

            <div className="text-foreground/90 text-base font-medium">
              All brands{' '}
              <Suspense>
                <TotalResource />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 space-y-7">
          <Suspense>
            <BrandsTable />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardBrandsPage;

const TotalResource: FC = async () => {
  const { data: brands, pagination } = await getAllBrands();

  return (
    <>
      <span className="text-muted-foreground">
        ({pagination.total_records})
      </span>
    </>
  );
};

const headers = ['#', 'brand', 'deleted', 'actions'];

const BrandsTable: FC = async () => {
  const { data: brands, pagination } = await getAllBrands();

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

            <AdminDashboardResourceSort sort_items={[]} />

            <Suspense>
              <NewBrandDialog />
            </Suspense>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="font-medium text-xs bg-background/50 hover:bg-background/50">
              {headers.map((header, index) => (
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
                    <EditBrandDialog /> {/* TODO: change */}
                    {brand.is_deleted ? (
                      <RestoreProductDialog /> // TODO: change
                    ) : (
                      <DeleteProductDialog /> // TODO: change
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
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