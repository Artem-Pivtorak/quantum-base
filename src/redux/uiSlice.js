import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedSectionId: null, // null означає "всі розділи"
  },
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSectionId = action.payload;
    },
  },
});

export const { setSelectedSection } = uiSlice.actions;
export const selectSelectedSectionId = state => state.ui.selectedSectionId;
export default uiSlice.reducer;