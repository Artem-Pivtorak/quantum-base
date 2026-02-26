// src/redux/frames/migrations.js
import { nanoid } from '@reduxjs/toolkit';

const framesMigrations = {
  0: (state) => {
    // Версія 0 -> 1: додаємо sectionId зі значенням null для всіх існуючих фреймів
    return {
      ...state,
      items: state.items.map(item => ({
        ...item,
        sectionId: null, // нове поле
      })),
    };
  },
  1: (state) => {
    // Версія 1 -> 2: додаємо поле createdAt з поточною датою для старих фреймів
    return {
      ...state,
      items: state.items.map(item => ({
        ...item,
        createdAt: new Date().toISOString(), // нове поле
      })),
    };
  },
  // Додавайте нові міграції тут
};

export default framesMigrations;