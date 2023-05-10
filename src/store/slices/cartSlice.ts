import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types';

const initialState: Cart = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.products.find(
        (product) => product._id === action.payload
      );

      if (!currentItem) {
        state.products.push({
          _id: action.payload,
          currentInCart: 1,
          isSelected: true,
        });
      }
    },
    // setProductAmount: (state, action: PayloadAction<AddToCartWithAmount>) => {
    //   const currentItem = state.entities[action.payload._id];
    //   if (currentItem) {
    //     currentItem.currentInCart = action.payload.amount;
    //   }
    // },
    incrementProductAmount: (state, action: PayloadAction<string>) => {
      const currentItem = state.products.find(
        (product) => product._id === action.payload
      );

      if (currentItem) {
        currentItem.currentInCart += 1;
      }
    },
    decrementProductAmount: (state, action: PayloadAction<string>) => {
      const currentItem = state.products.find(
        (product) => product._id === action.payload
      );

      if (currentItem) {
        currentItem.currentInCart -= 1;
        if (currentItem.currentInCart === 0) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.products.find(
        (product) => product._id === action.payload
      );

      if (currentItem) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      }
    },
    deleteByIds: (state, action: PayloadAction<string[]>) => {
      state.products = state.products.filter(
        (product) => !action.payload.includes(product._id)
      );
    },
    clearCart: (state) => {
      state.products = [];
      // state.totalDiscountedPrice = 0;
      // state.totalPrice = 0;
    },
    toggleIsSelected: (state, action: PayloadAction<string>) => {
      const currentItem = state.products.find(
        (product) => product._id === action.payload
      );
      if (currentItem) {
        currentItem.isSelected = !currentItem.isSelected;
      }
    },
    toggleSelectAll: (state) => {
      const isEverySelected = state.products.every((item) => item.isSelected);

      state.products = state.products.map((product) => ({
        ...product,
        isSelected: !isEverySelected,
      }));
    },
  },
});

export const {
  // setProductAmount,
  addToCart,
  decrementProductAmount,
  incrementProductAmount,
  deleteByIds,
  toggleIsSelected,
  toggleSelectAll,
  clearCart,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
