import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import zhCNTranslations from './locales/zh.json';
import zhTWTranslations from './locales/zh-TW.json';
import enTranslations from './locales/en.json';

const resources = {
  zh: {
    translation: zhCNTranslations,
  },
  'zh-TW': {
    translation: zhTWTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;