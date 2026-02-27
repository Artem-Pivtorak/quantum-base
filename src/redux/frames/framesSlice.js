// src/redux/frames/framesSlice.js
import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filterSlice';
import { selectSelectedSectionTitle } from '../uiSlice';

const initialState = {
  items: [],
};

const framesSlice = createSlice({
  name: 'frames',
  initialState,
  reducers: {
    addFrame: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, info, sectionTitle }) {
        return {
          payload: {
            id: nanoid(),
            title,
            info,
            sectionTitle: sectionTitle || null,
          },
        };
      },
    },
    deleteFrame(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    importFrames(state, action) {
      const newFrames = action.payload.map(({ title, info, sectionTitle }) => ({
        id: nanoid(),
        title,
        info,
        sectionTitle: sectionTitle || null,
      }));
      state.items.push(...newFrames);
    },
    clearFrames(state) {
      state.items = [];
    },
  },
});

export const { addFrame, deleteFrame, importFrames, clearFrames } = framesSlice.actions;

export const selectFrames = (state) => state.frames.items;

// Селектор для фільтрації за назвою розділу
export const selectFilteredFramesBySectionTitle = createSelector(
  [selectFrames, selectFilter, selectSelectedSectionTitle],
  (frames, filter, selectedTitle) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return frames.filter((frame) => {
      const matchesFilter = normalizedFilter === '' || frame.title.toLowerCase().includes(normalizedFilter);
      const matchesSection = selectedTitle === null || frame.sectionTitle === selectedTitle;
      return matchesFilter && matchesSection;
    });
  }
);

export default framesSlice.reducer;