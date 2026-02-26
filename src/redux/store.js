import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import framesReducer from './frames/framesSlice';
import filterReducer from './filterSlice';
import sectionsReducer from './sections/sectionsSlice';
import uiReducer from './uiSlice';

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['selectedSectionId'],
};

export const store = configureStore({
  reducer: {
    frames: framesReducer,          // БЕЗ persist
    filter: filterReducer,
    sections: sectionsReducer,      // БЕЗ persist
    ui: persistReducer(uiPersistConfig, uiReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);