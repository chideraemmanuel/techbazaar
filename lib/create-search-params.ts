import { ISearchParams } from '@/types';

/**
 * Creates a valid URLSearchParams instance from an object with value type as either STRING, ARRAY OF STRINGS, or UNDEFINED.
 * In the case of an array (duplicate search parameters), only the first item is used.
 */
const createSearchParams = (params: ISearchParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      searchParams.append(key, value[0]);
    } else {
      searchParams.append(key, value as string);
    }
  });

  return searchParams;
};

export default createSearchParams;
