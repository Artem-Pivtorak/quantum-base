import React from 'react';
import css from './SearchBox.module.css';

const SearchBox = ({ filter, onChange }) => {
  return (
    <div className={css.search}>
      <label>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={(e) => onChange(e.target.value)}
          className={css.input}
        />
      </label>
    </div>
  );
};

export default SearchBox;
