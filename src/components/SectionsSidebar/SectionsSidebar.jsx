import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSections, addSection, deleteSection } from '../../redux/sections/sectionsSlice';
import { setSelectedSection, selectSelectedSectionId } from '../../redux/uiSlice';
import css from './SectionsSidebar.module.css';

const SectionsSidebar = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSections);
  const selectedId = useSelector(selectSelectedSectionId);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    dispatch(addSection({ title: newTitle, image: newImage }));
    setNewTitle('');
    setNewImage('');
  };

  return (
    <div className={css.sidebar}>
      <h3>Розділи</h3>
      <ul className={css.sectionList}>
        <li
          className={`${css.sectionItem} ${selectedId === null ? css.active : ''}`}
          onClick={() => dispatch(setSelectedSection(null))}
        >
          <span className={css.sectionImage}>🏠</span>
          <span className={css.sectionTitle}>Всі фрейми</span>
        </li>
        {sections.map(section => (
          <li
            key={section.id}
            className={`${css.sectionItem} ${selectedId === section.id ? css.active : ''}`}
            onClick={() => dispatch(setSelectedSection(section.id))}
          >
            <span className={css.sectionImage}>{section.image}</span>
            <span className={css.sectionTitle}>{section.title}</span>
            {isAdmin && (
              <button
                className={css.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteSection(section.id));
                  // Якщо видаляємо вибраний розділ, скидаємо вибір на всі
                  if (selectedId === section.id) {
                    dispatch(setSelectedSection(null));
                  }
                }}
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
      {isAdmin && (
        <form onSubmit={handleAddSection} className={css.addForm}>
          <input
            type="text"
            placeholder="Назва розділу"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Іконка (emoji або URL)"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
          <button type="submit">Додати розділ</button>
        </form>
      )}
    </div>
  );
};

export default SectionsSidebar;