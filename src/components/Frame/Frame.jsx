import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import css from './Frame.module.css';

const Frame = ({ data, onDelete, isAdmin }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const infoRef = useRef(null);

  // перевіряємо чи текст не вміщається у 2 рядки
  const checkOverflow = () => {
    const el = infoRef.current;
    if (!el) return;

    const cs = getComputedStyle(el);
    // lineHeight може бути 'normal' або '20px' — намагаємося привести до числа px
    let lineHeightPx = parseFloat(cs.lineHeight);
    if (isNaN(lineHeightPx)) {
      // запасний варіант: використовуємо font-size * line-height multiplier
      const fontSizePx = parseFloat(cs.fontSize) || 16;
      const multiplier = parseFloat(cs.lineHeight) || 1.5;
      lineHeightPx = fontSizePx * multiplier;
    }

    const twoLinesPx = Math.round(lineHeightPx * 2);

    // якщо повна висота більше, ніж два рядки — є переповнення
    setIsOverflowing(el.scrollHeight > twoLinesPx + 1);

    // також підстрахуємо max-height для плавного переходу:
    if (!expanded) {
      // встановлюємо inline стиль maxHeight у px щоб fallback .truncate не залежав від em
      el.style.maxHeight = twoLinesPx + 'px';
    } else {
      el.style.maxHeight = el.scrollHeight + 'px';
    }
  };

  // виконуємо перевірку після render (useLayoutEffect щоб уникнути мерехтіння)
  useLayoutEffect(() => {
    checkOverflow();
    // якщо змінюється текст, згортаємо назад
    setExpanded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.info]);

  // реагуємо на зміну розміру через ResizeObserver або window.resize
  useEffect(() => {
    const el = infoRef.current;
    if (!el) return;

    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => checkOverflow());
      ro.observe(el);
      // також стежимо за батьком — ширина контейнера може змінитись
      if (el.parentElement) ro.observe(el.parentElement);
    } else {
      window.addEventListener('resize', checkOverflow);
    }

    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', checkOverflow);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  // при кліку — перемикаємо згорнуто/розгорнуто і оновлюємо maxHeight
  const toggle = () => {
    setExpanded(prev => {
      const next = !prev;
      // після state change, закликаємо переглянути DOM у наступному такті
      requestAnimationFrame(checkOverflow);
      return next;
    });
  };

  return (
    <div className={css.frame}>
      <h3>{data.title}</h3>

      <div
        ref={infoRef}
        className={`${css.info} ${!expanded ? css.truncate : ''}`}
        aria-expanded={expanded}
      >
        {data.info}
      </div>

      <div className={css.controls}>
        {isOverflowing && (
          <button className={css.toggleBtn} onClick={toggle}>
            {expanded ? 'Згорнути' : 'Читати далі'}
          </button>
        )}

        {isAdmin && (
          <button className={css.toggleBtn} onClick={() => onDelete(data.id)}>
            Видалити
          </button>
        )}
      </div>
    </div>
  );
};

export default Frame;