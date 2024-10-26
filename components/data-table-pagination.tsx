'use client';

import { FC } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  totalPages: number;
  totalPagesToDisplay?: number;
}

const DataTablePagination: FC<Props> = ({
  totalPages,
  totalPagesToDisplay = 5,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getCurrentPage = () => {
    const pageParam = searchParams.get('page');
    if (!pageParam || pageParam === '') {
      return 1;
    } else if (isNaN(+pageParam)) {
      return 1;
    } else if (+pageParam > totalPages) {
      return totalPages;
    } else {
      return +pageParam;
    }
  };

  const currentPage = getCurrentPage();

  const updateSearchParam = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value === '' || isNaN(+value)) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', value);
    }

    router.replace(`?${newSearchParams}`);
  };

  const showLeftEllipsis = +currentPage - 1 > totalPagesToDisplay / 2;
  const showRightEllipsis =
    totalPages - +currentPage + 1 > totalPagesToDisplay / 2;

  const getPageNumbers = () => {
    if (totalPages <= totalPagesToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const half = Math.floor(totalPagesToDisplay / 2);
      // To ensure that the current page is always in the middle
      let start = +currentPage - half;
      let end = +currentPage + half;
      // If the current page is near the start
      if (start < 1) {
        start = 1;
        end = totalPagesToDisplay;
      }
      // If the current page is near the end
      if (end > totalPages) {
        start = totalPages - totalPagesToDisplay + 1;
        end = totalPages;
      }
      // If showLeftEllipsis is true, add an ellipsis before the start page
      if (showLeftEllipsis) {
        start++;
      }
      // If showRightEllipsis is true, add an ellipsis after the end page
      if (showRightEllipsis) {
        end--;
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          // href="#"
          className="cursor-pointer"
          isActive={pageNumber === +currentPage}
          onClick={() => updateSearchParam(`${pageNumber}`)}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <>
      {totalPages > 0 && (
        <Pagination className="mx-0 inline-block w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                // href="#"
                onClick={() =>
                  +currentPage > 1 && updateSearchParam(`${+currentPage - 1}`)
                }
                className={`cursor-pointer ${
                  +currentPage === 1 &&
                  'text-muted-foreground cursor-not-allowed hover:bg-transparent hover:text-muted-foreground'
                }`}
                aria-disabled={+currentPage === 1}
              />
            </PaginationItem>
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                // href="#"
                onClick={() =>
                  +currentPage < totalPages &&
                  updateSearchParam(`${+currentPage + 1}`)
                }
                className={`cursor-pointer ${
                  +currentPage === totalPages &&
                  'text-muted-foreground cursor-not-allowed hover:bg-transparent hover:text-muted-foreground'
                }`}
                aria-disabled={+currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default DataTablePagination;
