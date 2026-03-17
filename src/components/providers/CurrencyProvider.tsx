"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CurrencyCode, SUPPORTED_CURRENCIES, getExchangeRates, ExchangeRates, convertPrice, formatPrice } from '@/lib/currency';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: ExchangeRates | null;
  loading: boolean;
  convertAndFormat: (priceInINR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR',
  setCurrency: () => {},
  rates: null,
  loading: true,
  convertAndFormat: (price) => `₹${price}`,
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Detect user locale or saved preference
    const savedCurrency = localStorage.getItem('motherera_currency') as CurrencyCode;
    if (savedCurrency && SUPPORTED_CURRENCIES[savedCurrency]) {
      setCurrency(savedCurrency);
    } else {
      // Auto-detect
      const locale = navigator.language;
      let detected: CurrencyCode = 'INR';
      
      if (locale.includes('US')) detected = 'USD';
      else if (locale.includes('GB')) detected = 'GBP';
      else if (locale.match(/(DE|FR|IT|ES|NL|BE|AT)/)) detected = 'EUR';
      
      setCurrency(detected);
    }

    // 2. Fetch rates
    const fetchRates = async () => {
      try {
        const fetchedRates = await getExchangeRates();
        if (fetchedRates) {
          setRates(fetchedRates);
        }
      } catch (error) {
        console.error("CurrencyProvider: Failed to load rates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // Update localStorage when currency changes
  const updateCurrency = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    localStorage.setItem('motherera_currency', newCurrency);
  };

  const convertAndFormat = (priceInINR: number) => {
    if (currency === 'INR') return formatPrice(priceInINR, 'INR');
    if (!rates) return formatPrice(priceInINR, 'INR'); // Fallback if rates not loaded

    const converted = convertPrice(priceInINR, currency, rates);
    return formatPrice(converted, currency);
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: updateCurrency, 
      rates, 
      loading, 
      convertAndFormat 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}
