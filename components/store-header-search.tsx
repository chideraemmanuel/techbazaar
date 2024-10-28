import { Search } from 'lucide-react';
import { FC } from 'react';
import ResourceSearch from './resource-search';
import { Button } from './ui/button';

interface Props {}

const StoreHeaderSearch: FC<Props> = () => {
  return (
    <>
      {/* desktop search */}
      <div className="relative hidden md:inline-block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />

        <ResourceSearch
          placeholder="Search products..."
          className="shadow-sm text-base dark:bg-secondary/50 pl-10 w-auto"
        />
      </div>

      {/* mobile search trigger */}
      <div className="inline-block md:hidden">
        <Button
          variant={'ghost'}
          size={'icon'}
          className="h-8 sm:h-10 w-8 sm:w-10"
        >
          <Search className="sm:!w-5 sm:!h-5" />
        </Button>
      </div>
    </>
  );
};

export default StoreHeaderSearch;
