import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationUK from './locales/uk.json';
import translationEN from './locales/en.json';

const resources = {
  uk: { translation: translationUK },
  en: { translation: translationEN }
};

i18n
  .use(LanguageDetector) // автоматичне визначення мови браузера
  .use(initReactI18next) // інтеграція з React
  .init({
    resources,
    fallbackLng: 'uk', // якщо мова не визначена, використовуємо українську
    interpolation: {
      escapeValue: false // React вже екранує
    }
  });

export default i18n;