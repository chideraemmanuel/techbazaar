import { CURRENCIES } from '@/constants';

const formatCurrency = (
  amount: number,
  toCurrency: string = 'NGN',
  locale: string = 'en-US'
) => {
  //! This method does not work for all currency codes
  //   return new Intl.NumberFormat(locale, {
  //     style: 'currency',
  //     currency: currency,
  //   }).format(amount);

  // Format number to a "currency-like" format but without the currency symbol
  const formatted = new Intl.NumberFormat(locale, {
    style: 'decimal', // Use 'decimal' style instead of 'currency'
    minimumFractionDigits: 2, // Control number of decimal places
    maximumFractionDigits: 2, // Control number of decimal places
  }).format(amount);

  // get currency symbol
  const symbol =
    CURRENCIES.find((currency) => currency.code === toCurrency)?.symbol || '';

  // TODO: format for different locales
  return `${symbol}${formatted}`;
};

export default formatCurrency;
