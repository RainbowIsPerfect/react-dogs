import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import type { ProductCartInfo, User, UserData, UserInfo } from '../../types';

interface UserState {
  token: string;
  userData: User;
  isLoggedIn: boolean;
  cart: ProductCartInfo[];
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
  cart: [],
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
    logOut: () => {
      return initialState;
    },
    edit: (state, action: PayloadAction<UserInfo>) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    addToCart: (
      state,
      action: PayloadAction<Pick<ProductCartInfo, '_id' | 'stock'>>
    ) => {
      const currentItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!currentItem) {
        state.cart.push({ ...action.payload, currentInCart: 1 });
      }
    },
    changeProductAmount: (
      state,
      action: PayloadAction<
        Pick<ProductCartInfo, '_id' | 'stock'> & { amount: number }
      >
    ) => {
      const currentItem = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (currentItem) {
        currentItem.currentInCart = action.payload.amount;
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.cart.find(
        (item) => item._id === action.payload
      );

      if (currentItem) {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      }
    },
  },
});

export const findProductById = (state: RootState, id: string) => {
  const item = state.user.cart.find((product) => product._id === id);
  return item ? item.currentInCart : 0;
};
export const getCartProductsIds = (state: RootState) =>
  state.user.cart.map(({ _id }) => _id);

export const {
  logIn,
  logOut,
  edit,
  addToCart,
  deleteFromCart,
  changeProductAmount,
} = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
