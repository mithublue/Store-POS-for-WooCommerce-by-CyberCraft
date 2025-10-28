const config = window.storePOSConfig || {};
const currency = config.currency || {};

export const decodeHtmlEntities = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
};

/**
 * Format price according to WooCommerce settings
 */
export const formatPrice = (amount) => {
  const {
    symbol = '$',
    position = 'left',
    decimals = 2,
    decimal_separator = '.',
    thousand_separator = ',',
  } = currency;

  const decodedSymbol = decodeHtmlEntities(symbol);
  
  const formatted = parseFloat(amount).toFixed(decimals)
    .replace('.', decimal_separator)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separator);
  
  switch (position) {
    case 'left':
      return decodedSymbol + formatted;
    case 'right':
      return formatted + decodedSymbol;
    case 'left_space':
      return decodedSymbol + ' ' + formatted;
    case 'right_space':
      return formatted + ' ' + decodedSymbol;
    default:
      return decodedSymbol + formatted;
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
  return decodeHtmlEntities(currency.symbol || '$');
};

/**
 * Get currency code
 */
export const getCurrencyCode = () => {
  return currency.code || 'USD';
};
