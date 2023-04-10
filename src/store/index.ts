import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './slices/productsSlice';
import { authSliceReducer } from './slices/authSlice';
import { themeSliceReducer } from './slices/themeSlice';
import { localStorageHandler } from '../utils/localStorageHanlder';

export const store = configureStore({
  reducer: {
    theme: themeSliceReducer,
    auth: authSliceReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorageHandler
    .set('color-theme', state.theme.theme)
    .set('user-token', state.auth.token)
    .set('user-data', state.auth.userData);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
