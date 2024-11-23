import axios from 'axios';
import { useQuery } from 'react-query';
import { DEFAULT_RATES } from '../convert-price';

export interface IExchangeRatesResponse {
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
  rates: Record<keyof typeof DEFAULT_RATES.rates, number>;
}

const useExchangeRates = () => {
  return useQuery({
    queryKey: ['fetch exchange rates'],
    queryFn: async () => {
      const response = await axios.get<IExchangeRatesResponse>(
        'https://open.er-api.com/v6/latest/NGN'
      );

      return response.data.rates;
    },
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useExchangeRates;
