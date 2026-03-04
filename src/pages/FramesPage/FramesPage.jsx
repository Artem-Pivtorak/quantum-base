import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filter from '../../components/Filter/Filter';
import SectionsSidebar from '../../components/SectionsSidebar/SectionsSidebar';
import FrameList from '../../components/FrameList/FrameList';
import { importFrames, clearFrames } from '../../redux/frames/framesSlice'; // додано clearFrames
import { selectFrames } from '../../redux/frames/framesSlice';
import { addSection } from '../../redux/sections/sectionsSlice';
import { selectSections } from '../../redux/sections/sectionsSlice';
import css from './FramesPage.module.css';

export default function FramesPage() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const frames = useSelector(selectFrames);
  const sections = useSelector(selectSections);
  const [circles, setCircles] = useState([]);
  const sectionsLoaded = useRef(false);
  const [currentLang, setCurrentLang] = useState(i18n.language.startsWith('uk') ? 'uk' : 'en');

  // Відстежуємо зміну мови
  useEffect(() => {
    const lang = i18n.language.startsWith('uk') ? 'uk' : 'en';
    if (lang !== currentLang) {
      setCurrentLang(lang);
    }
  }, [i18n.language, currentLang]);

  // Генерація фонових кружечків
  useEffect(() => {
    const newCircles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 60 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 15;
      const opacity = Math.random() * 0.5 + 0.3;
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
  }, []);

  // Завантаження розділів (один раз)
  useEffect(() => {
    if (sections.length === 0 && !sectionsLoaded.current) {
      sectionsLoaded.current = true;
      fetch(`${import.meta.env.BASE_URL}sections.json`)
        .then(res => res.json())
        .then(data => data.forEach(section => dispatch(addSection(section))))
        .catch(err => console.error('Error loading sections:', err));
    }
  }, [dispatch, sections.length]);

  // Завантаження фреймів відповідно до мови
  useEffect(() => {
    // Очищаємо попередні фрейми перед завантаженням нових
    dispatch(clearFrames());

    fetch(`${import.meta.env.BASE_URL}frames-${currentLang}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`frames-${currentLang}.json not found`);
        return res.json();
      })
      .then(data => {
        dispatch(importFrames(data));
      })
      .catch(err => console.error('Error loading frames:', err));
  }, [dispatch, currentLang]);

  return (
    <div className={css.container}>
      <div className={css.circlesBackground}>
        {circles.map(circle => (
          <div key={circle.id} className={css.circle} style={circle.style} />
        ))}
      </div>
      <SectionsSidebar />
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