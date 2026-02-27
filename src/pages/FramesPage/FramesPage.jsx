import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Компоненти
import Filter from '../../components/Filter/Filter';
import SectionsSidebar from '../../components/SectionsSidebar/SectionsSidebar';
import FrameList from '../../components/FrameList/FrameList';

// Слайси та селектори
import { importFrames } from '../../redux/frames/framesSlice';
import { selectFrames } from '../../redux/frames/framesSlice';
import { addSection } from '../../redux/sections/sectionsSlice';
import { selectSections } from '../../redux/sections/sectionsSlice';

// Стилі
import css from './FramesPage.module.css';

export default function FramesPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const frames = useSelector(selectFrames);
  const sections = useSelector(selectSections);

  // Стан для фонових кружечків
  const [circles, setCircles] = useState([]);

  // Рефи для запобігання подвійному завантаженню
  const sectionsLoaded = useRef(false);
  const framesLoaded = useRef(false);

  // Генерація випадкових сяючих кружечків
  useEffect(() => {
    const newCircles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 60 + 20; // 20–80px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 15; // 15–35s
      const opacity = Math.random() * 0.5 + 0.3; // 0.3–0.8
      newCircles.push({
        id: i,
        style: {
          width: size,
          height: size,
          left: left + '%',
          top: top + '%',
          animationDelay: delay + 's',
          animationDuration: duration + 's',
          background: `rgba(255, 255, 255, ${opacity})`,
          boxShadow: `0 0 ${size/2}px rgba(255, 255, 255, 0.5), 0 0 ${size}px rgba(255, 255, 255, 0.3)`,
        },
      });
    }
    setCircles(newCircles);
  }, []); // Пустий масив – виконується один раз

  // Завантаження розділів
  useEffect(() => {
    if (sections.length === 0 && !sectionsLoaded.current) {
      sectionsLoaded.current = true;
      fetch('/sections.json')
        .then((res) => {
          if (!res.ok) throw new Error('sections.json not found');
          return res.json();
        })
        .then((data) => {
          data.forEach((section) => dispatch(addSection(section)));
        })
        .catch((err) => {
          console.error('Помилка завантаження розділів:', err);
          sectionsLoaded.current = false; // дозволяємо повторну спробу
        });
    }
  }, [dispatch, sections.length]);

  // Завантаження фреймів
  useEffect(() => {
    if (frames.length === 0 && !framesLoaded.current) {
      framesLoaded.current = true;
      fetch('/frames.json')
        .then((res) => {
          if (!res.ok) throw new Error('frames.json not found');
          return res.json();
        })
        .then((data) => {
          dispatch(importFrames(data));
        })
        .catch((err) => {
          console.error('Помилка завантаження фреймів:', err);
          framesLoaded.current = false;
        });
    }
  }, [dispatch, frames.length]);

  return (
    <div className={css.container}>
      {/* Фонові кружечки */}
      <div className={css.circlesBackground}>
        {circles.map((circle) => (
          <div key={circle.id} className={css.circle} style={circle.style} />
        ))}
      </div>

      {/* Ліва панель розділів */}
      <SectionsSidebar />

      {/* Основний контент */}
      <div className={css.main}>
        <h1 className={css.title}>{t('title')}</h1>
        <div className={css.searchContainer}>
          <Filter className={css.searchInput} placeholder={t('searchPlaceholder')} />
        </div>
        <FrameList />
      </div>
    </div>
  );
}