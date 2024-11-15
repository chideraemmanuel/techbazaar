'use client';

import formatCurrency from '@/lib/format-currency';
import axios from 'axios';
import { ComponentPropsWithoutRef, FC } from 'react';
import { useQuery } from 'react-query';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/cn';
import useExchangeRates from '@/lib/hooks/use-exchange-rates';
import useIPInformation from '@/lib/hooks/use-ip-information';
import convertPrice from '@/lib/convert-price';

type Props = ComponentPropsWithoutRef<'span'> & {
  price: number;
};

const RegionalPriceFormat: FC<Props> = ({ price, className, ...props }) => {
  const {
    data: rates,
    isLoading: isFetchingExchangeRates,
    isError: errorFetchingExchangeRates,
  } = useExchangeRates();

  const {
    data: IP_information,
    isLoading: isFetchingIPInformation,
    isError: errorFetchingIPInformation,
  } = useIPInformation();

  //   if (errorFetchingExchangeRates || errorFetchingIPInformation) {
  //     return <span>use defaults..?</span>;
  //   }

  return (
    <>
      {isFetchingExchangeRates ||
        (isFetchingIPInformation && <Skeleton className="h-5 w-32" />)}

      {!isFetchingExchangeRates && !isFetchingIPInformation && (
        <span {...props} className={cn('tracking-wide', className)}>
          {formatCurrency(
            convertPrice(price, IP_information?.currency, rates),
            IP_information?.currency,
            navigator.language
          )}
        </span>
      )}
    </>
  );
};

export default RegionalPriceFormat;
