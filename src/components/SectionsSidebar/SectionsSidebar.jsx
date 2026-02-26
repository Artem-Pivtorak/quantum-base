import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections } from '../../redux/sections/sectionsSlice';
import { setSelectedSection, selectSelectedSectionId } from '../../redux/uiSlice';
import css from './SectionsSidebar.module.css';

const SectionsSidebar = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSections);
  const selectedId = useSelector(selectSelectedSectionId);

  return (
    <div className={css.sidebar}>
      <h3>Sections</h3>
      <ul className={css.sectionList}>
        <li
          className={`${css.sectionItem} ${selectedId === null ? css.active : ''}`}
          onClick={() => dispatch(setSelectedSection(null))}
        >
          <span className={css.sectionImage}><img src="/images/brain.png" alt="all-knowledge" /></span>
          <span className={css.sectionTitle}>All knowledge</span>
        </li>
        {sections.map(section => (
          <li
            key={section.id}
            className={`${css.sectionItem} ${selectedId === section.id ? css.active : ''}`}
            onClick={() => dispatch(setSelectedSection(section.id))}
          >
            <img src={section.image} alt={section.title} className={css.sectionImage} />
            <span className={css.sectionTitle}>{section.title}</span>
            {/* Кнопка видалення видалена */}
          </li>
        ))}
      </ul>
      {/* Форма додавання видалена */}
    </div>
  );
};

export default SectionsSidebar;