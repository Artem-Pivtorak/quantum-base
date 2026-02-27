import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredFramesBySectionTitle } from '../../redux/frames/framesSlice';
import Frame from '../Frame/Frame';
import css from './FrameList.module.css';

const FrameList = () => {
  const frames = useSelector(selectFilteredFramesBySectionTitle);
  const listRef = useRef(null);
  const frameRefs = useRef([]);
  const [scrollTrigger, setScrollTrigger] = useState(0); // просто для ререндеру

  // Прив'язка рефів
  useEffect(() => {
    frameRefs.current = frameRefs.current.slice(0, frames.length);
  }, [frames]);

  // Слухач скролу
  useEffect(() => {
    const handleScroll = () => {
      setScrollTrigger(prev => prev + 1); // викликає ререндер
    };
    const container = listRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  // Функція обчислення масштабу
  const getScale = useCallback((index) => {
    const frameEl = frameRefs.current[index];
    const container = listRef.current;
    if (!frameEl || !container) return 1;

    const containerRect = container.getBoundingClientRect();
    const frameRect = frameEl.getBoundingClientRect();
    const relativeTop = frameRect.top - containerRect.top; // позиція відносно контейнера

    if (relativeTop < 0) {
      // Фрейм виїхав за верхній край
      const progress = Math.min(1, Math.abs(relativeTop) / frameRect.height);
      return Math.max(0.5, 1 - progress * 0.5);
    }
    return 1;
  }, [scrollTrigger]); // залежність від scrollTrigger оновлює масштаб при скролі

  return (
    <div className={css.listContainer} ref={listRef}>
      {frames.map((frame, index) => {
        const scale = getScale(index);
        return (
          <div
            key={frame.id}
            ref={(el) => (frameRefs.current[index] = el)}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.1s ease',
              marginBottom: '16px',
              width: '100%',
            }}
          >
            <Frame data={frame} />
          </div>
        );
      })}
    </div>
  );
};

export default FrameList;