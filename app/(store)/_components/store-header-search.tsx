'use client';

import { ArrowLeft, Search } from 'lucide-react';
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import useSearchProducts from '@/lib/hooks/product/use-search-products';

interface Props {}

const StoreHeaderSearch: FC<Props> = () => {
  const [searchString, setSearchString] = useState('');
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (searchString === '') {
      newSearchParams.delete('search_query');
    } else {
      newSearchParams.set('search_query', searchString);
    }

    router.replace(`/products?${newSearchParams}`);

    setMobileSearchActive(false);
    setPopoverOpen(false);
    setSearchString('');
  };

  const {
    data: searchReturn,
    isLoading: isSearching,
    isError,
    error,
    refetch,
  } = useSearchProducts(searchString);

  const search = () => {
    let timeout: NodeJS.Timeout;

    return async (e: ChangeEvent<HTMLInputElement>) => {
      setSearchString(e.target.value);

      setPopoverOpen(false);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (e.target.value === '') {
          setPopoverOpen(false);
          return;
        }

        refetch();
      }, 2500);
    };
  };

  const debounceSearch = useMemo(() => search(), []);

  React.useEffect(() => {
    if (searchReturn && searchReturn?.data.length > 0) {
      setPopoverOpen(true);
    }
  }, [searchReturn]);

  return (
    <>
      {/* desktop search */}
      <div className="relative hidden md:inline-block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />

        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Search products..."
            className="shadow-sm text-base dark:bg-secondary/50 pl-10 w-auto"
            value={searchString}
            onChange={debounceSearch}
            onBlur={() => {
              const timeout = setTimeout(() => {
                setPopoverOpen(false);
              }, 500);
            }}
          />
        </form>

        {searchReturn && searchReturn.data.length > 0 && (
          <div
            data-state={popoverOpen ? 'open' : 'closed'}
            className="absolute right-1/2 translate-x-1/2 top-[calc(100%+4px)] p-2 w-96 grid grid-cols-2 gap-2 z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=closed]:invisible data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          >
            {searchReturn.data.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="flex items-center space-x-2 p-1 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary/40"
                onClick={() => {
                  setPopoverOpen(false);
                  setSearchString('');
                }}
              >
                <div className="w-[50px] h-[50px] bg-secondary rounded-sm sm:rounded-md flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="max-w-[80%] max-h-[80%] object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {product.brand.name}
                  </span>
                  <span className="text-sm">{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* mobile search */}
      <div className="block md:hidden">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="h-8 sm:h-10 w-8 sm:w-10"
          onClick={() => setMobileSearchActive(true)}
        >
          <Search className="sm:!w-5 sm:!h-5" />
        </Button>

        {mobileSearchActive && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-background container w-full absolute left-0 top-0 z-10 h-full flex items-center gap-3"
          >
            <Button
              variant={'ghost'}
              size={'icon'}
              className="h-8 sm:h-10 w-8 sm:w-10"
              type="button"
              onClick={() => {
                setPopoverOpen(false);
                setMobileSearchActive(false);
              }}
            >
              <ArrowLeft className="sm:!w-5 sm:!h-5" />
            </Button>

            <Input
              placeholder="Search products..."
              className="shadow-sm text-base dark:bg-secondary/50 w-full"
              value={searchString}
              onChange={debounceSearch}
              onBlur={() => {
                const timeout = setTimeout(() => {
                  setPopoverOpen(false);
                }, 500);
              }}
              autoFocus
            />

            <Button
              variant={'ghost'}
              size={'icon'}
              className="h-8 sm:h-10 w-8 sm:w-10"
            >
              <Search className="sm:!w-5 sm:!h-5" />
            </Button>

            {searchReturn && searchReturn.data.length > 0 && (
              <div
                data-state={popoverOpen ? 'open' : 'closed'}
                className="absolute right-1/2 translate-x-1/2 top-[calc(100%+4px)] p-2 w-72 sm:w-96 grid sm:grid-cols-2 gap-2 z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=closed]:invisible data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              >
                {searchReturn.data.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    className="flex items-center space-x-2 p-1 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary/40"
                    onClick={() => {
                      setPopoverOpen(false);
                      setSearchString('');
                      setMobileSearchActive(false);
                    }}
                  >
                    <div className="w-[50px] h-[50px] bg-secondary rounded-sm sm:rounded-md flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="max-w-[80%] max-h-[80%] object-contain"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {product.brand.name}
                      </span>
                      <span className="text-sm">{product.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default StoreHeaderSearch;
