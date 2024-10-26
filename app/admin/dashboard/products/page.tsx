import AdminDashboardResourceHeader from '@/components/admin-dashboard-resource-header';
import BooleanBadge from '@/components/boolean-badge';
import DataTableItemsPerPage from '@/components/data-table-items-per-page';
import DataTablePagination from '@/components/data-table-pagination';
import ResourceSearch from '@/components/resource-search';
import SelectInput from '@/components/select-input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PRODUCT_CATEGORIES } from '@/constants';
import { DUMMY_PRODUCTS } from '@/dummy';
import { cn } from '@/lib/cn';
import {
  RiFilter2Line,
  RiFilter3Line,
  RiFilterLine,
  RiSortAsc,
  RiSortDesc,
} from '@remixicon/react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface Props {}

const AdminDashboardProductsPage: FC<Props> = () => {
  return (
    <>
      <div className="flex flex-col bg-secondary min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
        <AdminDashboardResourceHeader title="Products" total={10} />

        <div className="flex-1 p-5 space-y-7">
          <ProductsTable />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardProductsPage;

const headers = [
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

const ProductsTable: FC = () => {
  return (
    <>
      <div className="rounded-2xl shadow border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-background p-5">
          <ResourceSearch
            placeholder="Search products..."
            className="shadow-sm text-base dark:bg-secondary/50"
          />

          <div className="space-x-2">
            <Button size={'sm'} variant={'outline'}>
              <RiFilter3Line />
              <span className="md:inline-block hidden">Filter</span>
            </Button>

            <Button size={'sm'} variant={'outline'}>
              <RiSortDesc />
              <span className="md:inline-block hidden">Sort</span>
            </Button>

            <Button size={'sm'}>
              <Plus />
              Add new product
            </Button>
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
            {DUMMY_PRODUCTS && DUMMY_PRODUCTS.length > 0 ? (
              DUMMY_PRODUCTS.map((product, index) => (
                <TableRow
                  key={product._id}
                  className="font-medium text-xs bg-background hover:bg-background"
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell className="flex items-center gap-3 min-w-[200px] sm:min-w-[300px]">
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
                    )?.title || '-'}
                  </TableCell>

                  <TableCell>
                    <BooleanBadge truthy={product.is_featured}>
                      {`${product.is_featured}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell>{product.price}</TableCell>

                  <TableCell>{product.stock}</TableCell>

                  <TableCell>
                    {' '}
                    <BooleanBadge truthy={product.is_archived}>
                      {`${product.is_archived}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell>
                    {' '}
                    <BooleanBadge truthy={product.is_deleted}>
                      {`${product.is_deleted}`}
                    </BooleanBadge>
                  </TableCell>

                  <TableCell className="space-x-1">
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      className="w-9 h-9 text-muted-foreground"
                    >
                      <Pencil />
                    </Button>

                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      className="w-9 h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
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

          <DataTablePagination totalPages={50} totalPagesToDisplay={3} />
        </div>
      </div>
    </>
  );
};
