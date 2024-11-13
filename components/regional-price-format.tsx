'use client';

import formatCurrency from '@/lib/format-currency';
import axios from 'axios';
import { ComponentPropsWithoutRef, FC } from 'react';
import { useQuery } from 'react-query';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/cn';

interface IExchangeRatesResponse {
  result: 'success' | 'error';
  provider: 'https://www.exchangerate-api.com';
  documentation: 'https://www.exchangerate-api.com/docs/free';
  terms_of_use: 'https://www.exchangerate-api.com/terms';
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  time_eol_unix: number;
  base_code: 'NGN';
  rates: Record<string, number>;
}

interface IPInformationResponse {
  query: string;
  status: 'success' | 'error';
  continent: string;
  continentCode: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  district: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  offset: number;
  currency: string;
  isp: string;
  org: string;
  as: string;
  asname: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
}

type Props = ComponentPropsWithoutRef<'span'> & {
  price: number;
};

const DEFAULT_RATES = {
  result: 'success',
  provider: 'https://www.exchangerate-api.com',
  documentation: 'https://www.exchangerate-api.com/docs/free',
  terms_of_use: 'https://www.exchangerate-api.com/terms',
  time_last_update_unix: 1729814551,
  time_last_update_utc: 'Fri, 25 Oct 2024 00:02:31 +0000',
  time_next_update_unix: 1729901501,
  time_next_update_utc: 'Sat, 26 Oct 2024 00:11:41 +0000',
  time_eol_unix: 0,
  base_code: 'USD',
  rates: {
    USD: 1,
    AED: 3.6725,
    AFN: 66.489456,
    ALL: 91.316126,
    AMD: 387.919864,
    ANG: 1.79,
    AOA: 919.410946,
    ARS: 986.33,
    AUD: 1.506499,
    AWG: 1.79,
    AZN: 1.699947,
    BAM: 1.809037,
    BBD: 2,
    BDT: 119.483988,
    BGN: 1.809226,
    BHD: 0.376,
    BIF: 2907.379577,
    BMD: 1,
    BND: 1.319309,
    BOB: 6.917441,
    BRL: 5.694,
    BSD: 1,
    BTN: 84.104736,
    BWP: 13.394919,
    BYN: 3.287646,
    BZD: 2,
    CAD: 1.384482,
    CDF: 2839.392177,
    CHF: 0.865887,
    CLP: 945.511188,
    CNY: 7.121588,
    COP: 4298.103451,
    CRC: 514.685533,
    CUP: 24,
    CVE: 101.989142,
    CZK: 23.320728,
    DJF: 177.721,
    DKK: 6.897211,
    DOP: 60.184928,
    DZD: 133.378883,
    EGP: 48.775737,
    ERN: 15,
    ETB: 118.34169,
    EUR: 0.924955,
    FJD: 2.236916,
    FKP: 0.771033,
    FOK: 6.897331,
    GBP: 0.77104,
    GEL: 2.729666,
    GGP: 0.771033,
    GHS: 16.220982,
    GIP: 0.771033,
    GMD: 70.86387,
    GNF: 8663.521511,
    GTQ: 7.726799,
    GYD: 208.968374,
    HKD: 7.77031,
    HNL: 25.175884,
    HRK: 6.969004,
    HTG: 131.645683,
    HUF: 372.527485,
    IDR: 15591.305822,
    ILS: 3.784225,
    IMP: 0.771033,
    INR: 84.101459,
    IQD: 1308.193275,
    IRR: 41980.935551,
    ISK: 137.685464,
    JEP: 0.771033,
    JMD: 158.539268,
    JOD: 0.709,
    JPY: 151.78794,
    KES: 128.877444,
    KGS: 85.147915,
    KHR: 4074.030224,
    KID: 1.506521,
    KMF: 455.043475,
    KRW: 1379.40808,
    KWD: 0.306273,
    KYD: 0.833333,
    KZT: 484.586067,
    LAK: 21909.474521,
    LBP: 89500,
    LKR: 293.278398,
    LRD: 192.082476,
    LSL: 17.667836,
    LYD: 4.812026,
    MAD: 9.875624,
    MDL: 17.885037,
    MGA: 4592.82513,
    MKD: 56.825921,
    MMK: 2097.312823,
    MNT: 3374.81538,
    MOP: 8.003451,
    MRU: 39.818284,
    MUR: 46.057187,
    MVR: 15.407337,
    MWK: 1739.368007,
    MXN: 19.829184,
    MYR: 4.348912,
    MZN: 63.876661,
    NAD: 17.667836,
    NGN: 1646.139785,
    NIO: 36.765712,
    NOK: 10.94174,
    NPR: 134.567578,
    NZD: 1.663454,
    OMR: 0.384497,
    PAB: 1,
    PEN: 3.753142,
    PGK: 3.963685,
    PHP: 57.935078,
    PKR: 277.776861,
    PLN: 4.016198,
    PYG: 7968.519062,
    QAR: 3.64,
    RON: 4.6041,
    RSD: 108.352421,
    RUB: 96.423823,
    RWF: 1363.534902,
    SAR: 3.75,
    SBD: 8.499321,
    SCR: 13.608725,
    SDG: 510.989875,
    SEK: 10.564664,
    SGD: 1.319348,
    SHP: 0.771033,
    SLE: 22.641024,
    SLL: 22641.024267,
    SOS: 570.97273,
    SRD: 33.658053,
    SSP: 3308.107951,
    STN: 22.661171,
    SYP: 12911.673632,
    SZL: 17.667836,
    THB: 33.679763,
    TJS: 10.665518,
    TMT: 3.498054,
    TND: 3.102277,
    TOP: 2.342232,
    TRY: 34.294667,
    TTD: 6.758388,
    TVD: 1.506521,
    TWD: 32.03279,
    TZS: 2714.406338,
    UAH: 41.244554,
    UGX: 3657.607058,
    UYU: 41.428661,
    UZS: 12792.139101,
    VES: 40.8803,
    VND: 25377.780996,
    VUV: 119.784975,
    WST: 2.753996,
    XAF: 606.724633,
    XCD: 2.7,
    XDR: 0.751496,
    XOF: 606.724633,
    XPF: 110.375625,
    YER: 250.098153,
    ZAR: 17.664495,
    ZMW: 26.514608,
    ZWL: 27.4436,
  },
};

const RegionalPriceFormat: FC<Props> = ({ price, className, ...props }) => {
  const {
    data: rates,
    isLoading: isFetchingExchangeRates,
    isError: errorFetchingExchangeRates,
  } = useQuery({
    queryKey: ['fetch exchange rates'],
    queryFn: async () => {
      const response = await axios.get<IExchangeRatesResponse>(
        'https://open.er-api.com/v6/latest/NGN'
      );

      return response.data.rates;
    },
    retry: false,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const {
    data: IP_information,
    isLoading: isFetchingIPInformation,
    isError: errorFetchingIPInformation,
  } = useQuery({
    queryKey: ['get ip address information'],
    queryFn: async () => {
      const IP_response = await axios.get<{ ip: string }>(
        'https://api.ipify.org/?format=json'
      );

      const IP_information_response = await axios.get<IPInformationResponse>(
        `http://ip-api.com/json/${IP_response.data.ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,query`
      );

      return IP_information_response.data;
    },
    retry: false,
    cacheTime: 1000 * 60 * 60, // 1 hour
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  //   if (errorFetchingExchangeRates || errorFetchingIPInformation) {
  //     return <span>use defaults..?</span>;
  //   }

  const convertPrice = (
    amount: number,
    currency: string = 'NGN',
    rates: Record<string, number> = DEFAULT_RATES.rates
  ) => {
    return amount * rates[currency];
  };

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
