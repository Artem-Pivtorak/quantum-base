import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectSections } from '../../redux/sections/sectionsSlice';
import { setSelectedSectionTitle, selectSelectedSectionTitle } from '../../redux/uiSlice';
import css from './SectionsSidebar.module.css';

const SectionsSidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sections = useSelector(selectSections);
  const selectedTitle = useSelector(selectSelectedSectionTitle);

  return (
    <div className={css.sidebar}>
      <h3>{t('sections')}</h3>
      <ul className={css.sectionList}>
        <li
          className={`${css.sectionItem} ${selectedTitle === null ? css.active : ''}`}
          onClick={() => dispatch(setSelectedSectionTitle(null))}
        >
          <span className={css.sectionImage}>
           <img src={`${import.meta.env.BASE_URL}images/brain.png`} alt={t('allKnowledge')} />
          </span>
          <span className={css.sectionTitle}>{t('allKnowledge')}</span>
        </li>
        {sections.map(section => (
          <li
            key={section.id}
            className={`${css.sectionItem} ${selectedTitle === section.title ? css.active : ''}`}
            onClick={() => dispatch(setSelectedSectionTitle(section.title))}
          >
            <img src={section.image} alt={section.title} className={css.sectionImage} />
            <span className={css.sectionTitle}>{section.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionsSidebar;