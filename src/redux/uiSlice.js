import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { selectedSectionTitle: null },
  reducers: {
    setSelectedSectionTitle: (state, action) => {
      state.selectedSectionTitle = action.payload;
    },
  },
});

export const { setSelectedSectionTitle } = uiSlice.actions;
export const selectSelectedSectionTitle = state => state.ui.selectedSectionTitle;
export default uiSlice.reducer;