const config = window.storePOSConfig || {};
const currency = config.currency || {};

/**
 * Format price according to WooCommerce settings
 */
export const formatPrice = (amount) => {
  const { symbol = '$', position = 'left', decimals = 2, decimal_separator = '.', thousand_separator = ',' } = currency;
  
  const formatted = parseFloat(amount).toFixed(decimals)
    .replace('.', decimal_separator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separator);
  
  switch (position) {
    case 'left':
      return symbol + formatted;
    case 'right':
      return formatted + symbol;
    case 'left_space':
      return symbol + ' ' + formatted;
    case 'right_space':
      return formatted + ' ' + symbol;
    default:
      return symbol + formatted;
  }
};

/**
 * Parse price string to float
 */
export const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  const { decimal_separator = '.', thousand_separator = ',' } = currency;
  return parseFloat(
    priceString
      .replace(new RegExp('\\' + thousand_separator, 'g'), '')
      .replace(decimal_separator, '.')
  ) || 0;
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = () => {
  return currency.symbol || '$';
};

/**
 * Get currency code
 */
export const getCurrencyCode = () => {
  return currency.code || 'USD';
};
