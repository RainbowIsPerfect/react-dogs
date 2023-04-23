import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageHandler } from '../../utils/localStorageHanlder';
import type { ProductCartInfo, User, UserData, UserInfo } from '../../types';

interface UserState {
  token: string;
  userData: User;
  isLoggedIn: boolean;
  cart: ProductCartInfo[];
}

const initialState: UserState = {
  token: localStorageHandler.get('user-token') || '',
  userData: localStorageHandler.get<User>('user-data') || {
    name: '',
    __v: 0,
    _id: '',
    about: '',
    avatar: '',
    email: '',
    group: '',
  },
  isLoggedIn: Boolean(localStorageHandler.get('user-token')) || false,
  cart: localStorageHandler.get<ProductCartInfo[]>('cart') || [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserData>) => {
      state.token = action.payload.token;
      state.userData = action.payload.data;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.token = '';
      state.userData = initialState.userData;
      state.isLoggedIn = false;
    },
    edit: (state, action: PayloadAction<UserInfo>) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    addToCart: (state, action: PayloadAction<ProductCartInfo>) => {
      const currentItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (!currentItem) {
        state.cart.push(action.payload);
      } else {
        currentItem.stock += action.payload.stock;
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.cart.find((item) => item.id === action.payload);

      if (currentItem) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export type UserReturnType = { user: ReturnType<typeof userSlice.reducer> };

export const { logIn, logOut, edit, addToCart, deleteFromCart } =
  userSlice.actions;

export const userSliceReducer = userSlice.reducer;