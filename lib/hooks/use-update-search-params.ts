import { useRouter, useSearchParams } from 'next/navigation';

const useUpdateSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value === '') {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, value);
    }

    router.replace(`?${newSearchParams}`);
  };

  return updateSearchParam;
};

export default useUpdateSearchParams;
