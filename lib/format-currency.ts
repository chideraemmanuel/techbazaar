// =============================================================================
// Using Intl.NumberFormat
// =============================================================================
const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Example usage:
const price = 1234.56;
console.log(formatCurrency(price)); // "$1,234.56"

// =============================================================================
//  Manual Currency Masking
// =============================================================================
// const formatCurrency = (amount, currency = 'USD') => {
//   let formattedAmount = amount.toFixed(2); // Always 2 decimals

//   // Split the amount into integer and decimal parts
//   let [integer, decimal] = formattedAmount.split('.');

//   // Add commas to the integer part
//   integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//   // For USD, prepend the dollar symbol
//   const symbol = currency === 'USD' ? '$' : '';

//   return `${symbol}${integer}.${decimal}`;
// };

// // Example usage:
// const price = 1234.56;
// console.log(formatCurrency(price)); // "$1,234.56"

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
