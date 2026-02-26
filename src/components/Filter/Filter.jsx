import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/filterSlice';

const Filter = ({ className }) => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search info..."
      value={filter}
      onChange={handleChange}
      className={className} // використовуємо переданий клас
    />
  );
};

export default Filter;