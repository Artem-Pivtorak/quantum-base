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

const framesPersistConfig = {
  key: 'frames',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    frames: persistReducer(framesPersistConfig, framesReducer),
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);