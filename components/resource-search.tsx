'use client';

import { ComponentPropsWithoutRef, FC, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import useUpdateSearchParams from '@/hooks/use-update-search-params';

type Props = ComponentPropsWithoutRef<typeof Input>;

const ResourceSearch: FC<Props> = (props) => {
  const [searchString, setSearchString] = useState('');

  const updateSearchParams = useUpdateSearchParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateSearchParams('search_query', searchString);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        {...props}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </form>
  );
};

export default ResourceSearch;
