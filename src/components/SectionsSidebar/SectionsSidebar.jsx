import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router-dom';
import { selectSections } from '../../redux/sections/sectionsSlice';
import { setSelectedSectionTitle, selectSelectedSectionTitle } from '../../redux/uiSlice';
import css from './SectionsSidebar.module.css';

const SectionsSidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sections = useSelector(selectSections);
  const selectedTitle = useSelector(selectSelectedSectionTitle);
  const { sidebarOpen, setSidebarOpen } = useOutletContext();

  const handleItemClick = (title) => {
    dispatch(setSelectedSectionTitle(title));
    // На мобільних після вибору закриваємо меню
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Затемнення фону на мобільних */}
      {sidebarOpen && <div className={css.overlay} onClick={() => setSidebarOpen(false)} />}
      <div className={`${css.sidebar} ${sidebarOpen ? css.open : ''}`}>
        <h3>{t('sections')}</h3>
        <ul className={css.sectionList}>
          <li
            className={`${css.sectionItem} ${selectedTitle === null ? css.active : ''}`}
            onClick={() => handleItemClick(null)}
          >
            <span className={css.sectionImage}>
              <img src={`${import.meta.env.BASE_URL}images/Brain.png`} alt="brain" />
            </span>
            <span className={css.sectionTitle}>{t('allKnowledge')}</span>
          </li>
          {sections.map(section => (
            <li
              key={section.id}
              className={`${css.sectionItem} ${selectedTitle === section.title ? css.active : ''}`}
              onClick={() => handleItemClick(section.title)}
            >
              <img src={`${import.meta.env.BASE_URL}${section.image}`} alt={section.title} className={css.sectionImage} />
              <span className={css.sectionTitle}>{section.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SectionsSidebar;