import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id, title, image }]
};

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, image }) {
        return {
          payload: {
            id: nanoid(),
            title,
            image: image || '📁', // якщо немає зображення, ставимо емодзі
          },
        };
      },
    },
    deleteSection(state, action) {
      state.items = state.items.filter(section => section.id !== action.payload);
    },
    updateSection(state, action) {
      const { id, title, image } = action.payload;
      const section = state.items.find(s => s.id === id);
      if (section) {
        if (title !== undefined) section.title = title;
        if (image !== undefined) section.image = image;
      }
    },
  },
});

export const { addSection, deleteSection, updateSection } = sectionsSlice.actions;
export const selectSections = state => state.sections.items;
export default sectionsSlice.reducer;