import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './Frame.module.css';

const Frame = ({ data }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const isOverflowing = element.scrollHeight > element.clientHeight;
    setIsTruncated(isOverflowing);
  }, [data.info]);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    frameRef.current.style.setProperty('--mouse-x', x + '%');
    frameRef.current.style.setProperty('--mouse-y', y + '%');
  };

  return (
    <div ref={frameRef} className={css.frame} onMouseMove={handleMouseMove}>
      <h3 className={css.title}>{data.title}</h3>
      <div
        ref={textRef}
        className={`${css.info} ${!expanded ? css.truncate : ''}`}
      >
        {data.info}
      </div>
      {isTruncated && (
        <button onClick={() => setExpanded(!expanded)} className={css.toggleButton}>
          {expanded ? t('showLess') : t('readMore')}
        </button>
      )}
    </div>
  );
};

export default Frame;