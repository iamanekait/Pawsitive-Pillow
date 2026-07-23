import { Currency } from '../types';

export interface CurrencyMeta {
  code: Currency;
  symbol: string;
  rate: number;
  label: string;
  decimals: number;
}

export const CURRENCY_MAP: Record<Currency, CurrencyMeta> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    label: 'USD ($)',
    decimals: 2,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 85.0,
    label: 'INR (₹)',
    decimals: 0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    label: 'EUR (€)',
    decimals: 2,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    label: 'GBP (£)',
    decimals: 2,
  },
};

/**
 * Converts a base price in USD to the target currency and formats it with appropriate currency symbol.
 */
export function formatPrice(priceInUSD: number, currency: Currency | string = 'USD'): string {
  const code = (currency || 'USD') as Currency;
  const meta = CURRENCY_MAP[code] || CURRENCY_MAP.USD;
  const converted = priceInUSD * meta.rate;

  if (meta.decimals === 0) {
    const rounded = Math.round(converted);
    return `${meta.symbol}${rounded.toLocaleString()}`;
  } else {
    return `${meta.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: meta.decimals,
      maximumFractionDigits: meta.decimals,
    })}`;
  }
}

/**
 * Returns numeric value converted to target currency.
 */
export function convertPrice(priceInUSD: number, currency: Currency | string = 'USD'): number {
  const code = (currency || 'USD') as Currency;
  const meta = CURRENCY_MAP[code] || CURRENCY_MAP.USD;
  return priceInUSD * meta.rate;
}
