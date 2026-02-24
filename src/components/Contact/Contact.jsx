import React from 'react';
import css from './Contact.module.css';

const Contact = ({ data, onDelete }) => {
  return (
    <div className={css.contact}>
      <p>
        {data.name}: {data.number}
      </p>
      <button onClick={() => onDelete(data.id)} className={css.btn}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
