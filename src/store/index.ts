import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import { userSliceReducer } from './slices/userSlice';
import { themeSliceReducer } from './slices/themeSlice';
import { localStorageHandler } from '../utils/localStorageHanlder';

const extendedReducer = combineReducers({
  theme: themeSliceReducer,
  user: userSliceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: extendedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorageHandler.setAll([
    ['color-theme', state.theme.theme],
    ['user-token', state.user.token],
    ['user-data', state.user.userData],
    ['cart', state.user.cart],
  ]);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
