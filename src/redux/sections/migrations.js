// src/redux/sections/migrations.js
const sectionsMigrations = {
  0: (state) => {
    // Припустимо, у версії 0 не було поля image, додаємо дефолтне
    return {
      ...state,
      items: state.items.map(section => ({
        ...section,
        image: section.image || '📁', // дефолтна іконка
      })),
    };
  },
  // інші міграції
};

export default sectionsMigrations;