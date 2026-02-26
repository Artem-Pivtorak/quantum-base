// src/redux/frames/framesSlice.js
import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filterSlice';
import { selectSelectedSectionId } from '../uiSlice';

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
      prepare({ title, info, sectionId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            info,
            sectionId: sectionId || null,
          },
        };
      },
    },
    deleteFrame(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    importFrames(state, action) {
      const newFrames = action.payload.map(({ title, info, sectionId }) => ({
        id: nanoid(),
        title,
        info,
        sectionId: sectionId || null,
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

export const selectFilteredFramesBySection = createSelector(
  [selectFrames, selectFilter, selectSelectedSectionId],
  (frames, filter, selectedSectionId) => {
    const normalizedFilter = filter.toLowerCase().trim();
    return frames.filter((frame) => {
      const matchesFilter =
        normalizedFilter === '' || frame.title.toLowerCase().includes(normalizedFilter);
      const matchesSection =
        selectedSectionId === null || frame.sectionId === selectedSectionId;
      return matchesFilter && matchesSection;
    });
  }
);

export default framesSlice.reducer;