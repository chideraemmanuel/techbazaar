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

  let formattedAmount = amount.toFixed(2);

  // Split the amount into integer and decimal parts
  let [integer, decimal] = formattedAmount.split('.');

  // Add commas to the integer part
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  //   get currency symbol
  const symbol =
    CURRENCIES.find((currency) => currency.code === toCurrency)?.symbol || '';

  // TODO: format for different locales
  return `${symbol}${integer}.${decimal}`;
};

export default formatCurrency;

// =============================================================================
// Currency Masking with Input Fields
// =============================================================================
// const currencyInput = document.getElementById('currency-input');

// currencyInput.addEventListener('input', (event) => {
//   let value = event.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
//   value = parseFloat(value).toFixed(2); // Ensure two decimal places
//   value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
//   event.target.value = '$' + value; // Prefix with dollar sign
// });
