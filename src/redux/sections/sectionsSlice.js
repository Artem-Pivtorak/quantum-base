// src/redux/sections/sectionsSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [], // порожньо, щоб завантажувати з JSON
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
            image: image || '📁',
          },
        };
      },
    },
  },
});

export const { addSection } = sectionsSlice.actions;
export const selectSections = (state) => state.sections.items;
export default sectionsSlice.reducer;