'use client';

import { FC } from 'react';
import SelectInput from './select-input';
import useUpdateSearchParams from '@/lib/hooks/use-update-search-params';

interface Props {}

const items = [
  {
    id: '10',
    name: '10',
    value: '10',
  },
  {
    id: '20',
    name: '20',
    value: '20',
  },
  {
    id: '30',
    name: '30',
    value: '30',
  },
  {
    id: '40',
    name: '40',
    value: '40',
  },
  {
    id: '50',
    name: '50',
    value: '50',
  },
];

const DataTableItemsPerPage: FC<Props> = () => {
  const updateSearchParams = useUpdateSearchParams();

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">
          Items per page
        </span>

        <SelectInput
          selectInputItems={items}
          defaultValue="20"
          onItemSelect={(value) => updateSearchParams('limit', value)}
          selectInputTriggerProps={{
            className: '!p-[5px] h-[auto] text-xs shadow-sm',
          }}
          selectInputContentProps={{
            className: '!min-w-[--radix-popover-trigger-width] ',
          }}
          selectInputItemProps={{ className: 'text-xs' }}
        />
      </div>
    </>
  );
};

export default DataTableItemsPerPage;
