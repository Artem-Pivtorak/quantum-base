import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

// Компоненти
import FrameForm from '../../components/FrameForm/FrameForm';
import FrameList from '../../components/FrameList/FrameList';
import Filter from '../../components/Filter/Filter';
import SectionsSidebar from '../../components/SectionsSidebar/SectionsSidebar';
import JsonImport from '../../components/JsonImport/JsonImport';

// Слайси та селектори
import { importFrames } from '../../redux/frames/framesSlice';
import { selectFrames } from '../../redux/frames/framesSlice';
import { addSection } from '../../redux/sections/sectionsSlice';
import { selectSections } from '../../redux/sections/sectionsSlice';

// Стилі
import css from './FramesPage.module.css';

export default function FramesPage() {
  const dispatch = useDispatch();
  const { isAdmin } = useOutletContext(); // отримуємо статус адміна з Layout

  const frames = useSelector(selectFrames);
  const sections = useSelector(selectSections);

  // Завантаження початкових даних (тільки якщо вони відсутні)
  useEffect(() => {
    // Додаємо тестові розділи, якщо їх немає
    if (sections.length === 0) {
      dispatch(addSection({ title: 'Загальне', image: '📌' }));
      dispatch(addSection({ title: 'Важливе', image: '⭐' }));
    }

    // Завантажуємо початкові фрейми з JSON, якщо немає жодного фрейма
    if (frames.length === 0) {
      fetch('/frames.json') // або '/data/frames.json' – залежно від розташування файлу
        .then(response => {
          if (!response.ok) throw new Error('Не вдалося завантажити frames.json');
          return response.json();
        })
        .then(data => {
          dispatch(importFrames(data));
        })
        .catch(error => console.error('Помилка завантаження початкових фреймів:', error));
    }
  }, [dispatch, sections.length, frames.length]);

  return (
    <div className={css.container}>
      {/* Ліва панель з розділами */}
      <SectionsSidebar isAdmin={isAdmin} />

      {/* Основний контент */}
      <div className={css.main}>
        <h1>Фрейми</h1>

        {/* Фільтр (пошук) – завжди доступний */}
        <Filter />

        {/* Адмін-панель: додавання фрейма та імпорт JSON */}
        {isAdmin && (
          <>
            <FrameForm />
            <JsonImport />
          </>
        )}

        {/* Список фреймів (з урахуванням фільтра та вибраного розділу) */}
        <FrameList isAdmin={isAdmin} />
      </div>
    </div>
  );
}