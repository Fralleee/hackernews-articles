import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { hackernewsApi } from 'services/hackernews';

export const store = configureStore({
  reducer: {
    [hackernewsApi.reducerPath]: hackernewsApi.reducer
  },
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), hackernewsApi.middleware],
  devTools: true
});

setupListeners(store.dispatch);
