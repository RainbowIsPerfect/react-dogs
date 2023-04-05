import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageHandler } from '../../utils/localStorageHanlder';

interface UserState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: localStorageHandler('get', 'user-token') || null,
  isLoggedIn: Boolean(localStorageHandler('get', 'user-token')) || false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<Pick<UserState, 'token'>>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
