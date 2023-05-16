import { createSlice } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';
import type { User } from '../../types';

interface UserState {
  token: string;
  userData: User;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  token: '',
  userData: {
    name: '',
    __v: 0,
    _id: '',
    about: '',
    avatar: '',
    email: '',
    group: '',
  },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApiSlice.endpoints.setSignIn.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.userData = action.payload.data;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        userApiSlice.endpoints.editUser.matchFulfilled,
        (state, action) => {
          state.userData = action.payload;
        }
      );
  },
});

export const { logOut } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
