import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageHandler } from '../../utils/localStorageHanlder';
import type { User, UserData } from './productsSlice';

interface UserState {
  token: string | null;
  userData: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: localStorageHandler.get('user-token'),
  userData: localStorageHandler.get('user-data'),
  isLoggedIn: Boolean(localStorageHandler.get('user-token')) || false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserData>) => {
      state.token = action.payload.token;
      state.userData = action.payload.data;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.token = null;
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
