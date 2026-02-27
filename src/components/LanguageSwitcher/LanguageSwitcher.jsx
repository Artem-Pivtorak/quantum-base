import React from 'react';
import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith('uk') ? 'uk' : 'en';

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('appLanguage', lang);
  };

  return (
    <div className={css.switcher}>
      <button
        onClick={() => handleLanguageChange('uk')}
        className={`${css.button} ${currentLang === 'uk' ? css.active : ''}`}
      >
        UA
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`${css.button} ${currentLang === 'en' ? css.active : ''}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;