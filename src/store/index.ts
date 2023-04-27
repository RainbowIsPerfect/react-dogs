import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
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
import { apiSlice } from './slices/apiSlice';
import { cartSliceReducer } from './slices/cartSlice';
import { userSliceReducer } from './slices/userSlice';
import { themeSliceReducer } from './slices/themeSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['api'],
};

const rootReducer = combineReducers({
  theme: themeSliceReducer,
  user: userSliceReducer,
  cart: cartSliceReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
