import { createSlice, nanoid, createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filterSlice';

const framesSlice = createSlice({
  name: 'frames',
  initialState: {
    items: [],
  },
  reducers: {
    addFrame: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ title, info }) {
        return {
          payload: {
            id: nanoid(),
            title,
            info,
          },
        };
      },
    },
    deleteFrame(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    importFrames(state, action) {
      const newFrames = action.payload.map(({ title, info }) => ({
        id: nanoid(),
        title,
        info,
      }));
      state.items.push(...newFrames);
    },
    clearFrames(state) {
      state.items = [];
    },
  },
});

export const { addFrame, deleteFrame, importFrames, clearFrames } = framesSlice.actions;

export const selectFrames = state => state.frames.items;

export const selectFilteredFrames = createSelector(
  [selectFrames, selectFilter],
  (frames, filter) => {
    const normalized = filter.toLowerCase();
    return frames.filter(frame =>
      frame.title.toLowerCase().includes(normalized)
    );
  }
);

export default framesSlice.reducer;