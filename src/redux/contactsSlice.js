import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../redux/filterSlice'; 



// Початковий стан
const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      })

      .addMatcher(isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addMatcher(isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled), state => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

// Селектори
export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  }
);

export const selectError = state => state.contacts.error;
export const selectLoading = state => state.contacts.isLoading;
export default contactsSlice.reducer;

