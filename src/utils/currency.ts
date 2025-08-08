import React from 'react';
import { useTranslation } from 'react-i18next';

// 货币类型定义
export type Currency = 'CNY' | 'HKD' | 'USD';

// 货币配置
export const CURRENCY_CONFIG = {
  CNY: {
    symbol: '¥',
    name: '人民币',
    code: 'CNY',
    locale: 'zh-CN'
  },
  HKD: {
    symbol: 'HK$',
    name: '港币',
    code: 'HKD',
    locale: 'zh-HK'
  },
  USD: {
    symbol: '$',
    name: 'US Dollar',
    code: 'USD',
    locale: 'en-US'
  }
};

// 基础汇率（以CNY为基准）
export const EXCHANGE_RATES = {
  CNY: 1,
  HKD: 1.1, // 1 CNY = 1.1 HKD
  USD: 0.14  // 1 CNY = 0.14 USD
};

// 根据语言获取货币类型
export const getCurrencyByLanguage = (language: string): Currency => {
  switch (language) {
    case 'zh-TW':
      return 'HKD';
    case 'zh':
      return 'CNY';
    case 'en':
    default:
      return 'USD';
  }
};

// 货币转换函数
export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // 先转换为CNY基准
  const cnyAmount = amount / EXCHANGE_RATES[fromCurrency];
  // 再转换为目标货币
  const convertedAmount = cnyAmount * EXCHANGE_RATES[toCurrency];
  
  return Math.round(convertedAmount * 100) / 100; // 保留两位小数
};

// 格式化价格显示
export const formatPrice = (
  amount: number,
  currency: Currency,
  showSymbol: boolean = true
): string => {
  const config = CURRENCY_CONFIG[currency];
  
  const formattedAmount = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
  
  if (showSymbol) {
    return `${config.symbol}${formattedAmount}`;
  }
  
  return formattedAmount;
};

// 获取当前语言对应的价格
export const getCurrentPrice = (
  basePrice: number,
  baseCurrency: Currency = 'CNY',
  currentLanguage: string
): { amount: number; currency: Currency; formatted: string } => {
  const targetCurrency = getCurrencyByLanguage(currentLanguage);
  const convertedAmount = convertCurrency(basePrice, baseCurrency, targetCurrency);
  const formatted = formatPrice(convertedAmount, targetCurrency);
  
  return {
    amount: convertedAmount,
    currency: targetCurrency,
    formatted
  };
};

// React Hook for currency conversion
export const useCurrency = () => {
  const { i18n } = useTranslation();
  
  const convertPrice = (basePrice: number, baseCurrency: Currency = 'CNY') => {
    return getCurrentPrice(basePrice, baseCurrency, i18n.language);
  };
  
  const formatCurrencyPrice = (amount: number, currency?: Currency) => {
    const targetCurrency = currency || getCurrencyByLanguage(i18n.language);
    return formatPrice(amount, targetCurrency);
  };
  
  const getCurrentCurrency = () => {
    return getCurrencyByLanguage(i18n.language);
  };
  
  return {
    convertPrice,
    formatCurrencyPrice,
    getCurrentCurrency,
    currentCurrency: getCurrencyByLanguage(i18n.language)
  };
};

// 价格组件Props类型
export interface PriceProps {
  basePrice: number;
  baseCurrency?: Currency;
  className?: string;
  showCurrency?: boolean;
}

// 价格显示组件
export const Price: React.FC<PriceProps> = ({
  basePrice,
  baseCurrency = 'CNY',
  className = '',
  showCurrency = true
}) => {
  const { convertPrice } = useCurrency();
  const priceInfo = convertPrice(basePrice, baseCurrency);
  
  return React.createElement(
    'span',
    { className },
    showCurrency ? priceInfo.formatted : priceInfo.amount.toFixed(2)
  );
};

export default {
  getCurrencyByLanguage,
  convertCurrency,
  formatPrice,
  getCurrentPrice,
  useCurrency,
  Price,
  CURRENCY_CONFIG,
  EXCHANGE_RATES
};