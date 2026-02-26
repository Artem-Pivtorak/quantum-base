import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import framesReducer from './frames/framesSlice';
import framesMigrations from './frames/migrations';
import sectionsReducer from './sections/sectionsSlice';
import sectionsMigrations from './sections/migrations';
import uiReducer from './uiSlice';
import filterReducer from './filterSlice';

// Конфігурація для frames
const framesPersistConfig = {
  key: 'frames',
  storage,
  version: 2, // поточна версія
  migrate: createMigrate(framesMigrations, { debug: process.env.NODE_ENV === 'development' }),
  whitelist: ['items'],
};

// Конфігурація для sections
const sectionsPersistConfig = {
  key: 'sections',
  storage,
  version: 1,
  migrate: createMigrate(sectionsMigrations, { debug: process.env.NODE_ENV === 'development' }),
  whitelist: ['items'],
};

// Конфігурація для ui (якщо потрібно)
const uiPersistConfig = {
  key: 'ui',
  storage,
  version: 0, // початкова версія
  whitelist: ['selectedSectionId'],
};

export const store = configureStore({
  reducer: {
    frames: persistReducer(framesPersistConfig, framesReducer),
    sections: persistReducer(sectionsPersistConfig, sectionsReducer),
    ui: persistReducer(uiPersistConfig, uiReducer),
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);