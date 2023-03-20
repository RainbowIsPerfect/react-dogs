import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
