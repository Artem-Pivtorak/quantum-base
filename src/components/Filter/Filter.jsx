import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/filterSlice';
import { useTranslation } from 'react-i18next';

const Filter = ({ className, placeholder }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const { t } = useTranslation();

  return (
    <input
      type="text"
      placeholder={placeholder || t('searchPlaceholder')}
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      className={className}
    />
  );
};

export default Filter;