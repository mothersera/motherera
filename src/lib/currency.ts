// Supported currencies
export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR';

interface CurrencyConfig {
  code: CurrencyCode;
  locale: string;
  symbol: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', locale: 'en-IN', symbol: '₹', name: 'Indian Rupee' },
  USD: { code: 'USD', locale: 'en-US', symbol: '$', name: 'US Dollar' },
  GBP: { code: 'GBP', locale: 'en-GB', symbol: '£', name: 'British Pound' },
  EUR: { code: 'EUR', locale: 'de-DE', symbol: '€', name: 'Euro' },
};

// Map browser locales to currency codes
const LOCALE_CURRENCY_MAP: Record<string, CurrencyCode> = {
  'en-IN': 'INR',
  'hi-IN': 'INR',
  'en-US': 'USD',
  'en-GB': 'GBP',
  'en-IE': 'EUR',
  'fr-FR': 'EUR',
  'de-DE': 'EUR',
  'es-ES': 'EUR',
  'it-IT': 'EUR',
  // Add more as needed
};

// API Endpoint (Using a free public API for demo purposes, replace with paid key in production if needed)
// We use open.er-api.com which is a free derivative of exchangerate-api
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/INR';

export interface ExchangeRates {
  [key: string]: number;
}

// Helper to detect currency from browser locale
export function detectCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'INR';
  
  const browserLocale = navigator.language;
  
  // Try exact match
  if (LOCALE_CURRENCY_MAP[browserLocale]) {
    return LOCALE_CURRENCY_MAP[browserLocale];
  }

  // Try partial match (e.g. 'en-US' -> 'en')
  // Simple heuristic: 
  if (browserLocale.includes('US')) return 'USD';
  if (browserLocale.includes('GB')) return 'GBP';
  if (browserLocale.includes('IN')) return 'INR';
  
  // Default for Europe (rough approximation)
  const euLocales = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT'];
  if (euLocales.some(c => browserLocale.includes(c))) return 'EUR';

  return 'INR'; // Fallback
}

// Fetch exchange rates with caching
export async function getExchangeRates(): Promise<ExchangeRates | null> {
  const CACHE_KEY = 'motherera_exchange_rates';
  const CACHE_TIME_KEY = 'motherera_exchange_rates_timestamp';
  const CACHE_DURATION = 3600 * 1000; // 1 hour

  // Check cache
  const cachedRates = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

  if (cachedRates && cachedTime) {
    const age = Date.now() - parseInt(cachedTime, 10);
    if (age < CACHE_DURATION) {
      return JSON.parse(cachedRates);
    }
  }

  // Fetch new rates
  try {
    const res = await fetch(EXCHANGE_RATE_API);
    const data = await res.json();
    
    if (data && data.rates) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data.rates));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      return data.rates;
    }
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
  }

  return null;
}

// Convert price
export function convertPrice(priceInINR: number, targetCurrency: CurrencyCode, rates: ExchangeRates | null): number {
  if (targetCurrency === 'INR') return priceInINR;
  if (!rates || !rates[targetCurrency]) return priceInINR;

  return priceInINR * rates[targetCurrency];
}

// Format currency
export function formatPrice(price: number, currency: CurrencyCode): string {
  const config = SUPPORTED_CURRENCIES[currency];
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
}
