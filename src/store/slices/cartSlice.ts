import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { ProductCartInfo, Cart } from '../../types';

type AddToCartWithAmount = Pick<ProductCartInfo, '_id'> & { amount: number };

const cartAdapter = createEntityAdapter<Cart>({
  selectId: (item) => item._id,
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState({
    price: 0,
    discountedPrice: 0,
  }),
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCartInfo>) => {
      const currentItem = state.entities[action.payload._id];
      if (!currentItem) {
        cartAdapter.addOne(state, {
          ...action.payload,
          currentPrice: action.payload.price,
          currentDiscountedPrice: action.payload.discountedPrice,
          currentInCart: 1,
        });
        state.price += action.payload.price;
        state.discountedPrice += action.payload.discountedPrice;
      }
    },
    setProductAmount: (state, action: PayloadAction<AddToCartWithAmount>) => {
      const currentItem = state.entities[action.payload._id];
      if (currentItem) {
        currentItem.currentInCart = action.payload.amount;
      }
    },
    incrementProductAmount: (state, action: PayloadAction<string>) => {
      const currentItem = state.entities[action.payload];
      if (currentItem && currentItem.stock > currentItem.currentInCart) {
        cartAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            currentInCart: currentItem.currentInCart + 1,
            currentPrice: currentItem.currentPrice + currentItem.price,
            currentDiscountedPrice:
              currentItem.currentDiscountedPrice + currentItem.discountedPrice,
          },
        });
        state.price += currentItem.price;
        state.discountedPrice += currentItem.discountedPrice;
      }
    },
    decrementProductAmount: (state, action: PayloadAction<string>) => {
      const currentItem = state.entities[action.payload];

      if (currentItem) {
        cartAdapter.updateOne(state, {
          id: action.payload,
          changes: {
            currentInCart: currentItem.currentInCart - 1,
            currentPrice: currentItem.currentPrice - currentItem.price,
            currentDiscountedPrice:
              currentItem.currentDiscountedPrice - currentItem.discountedPrice,
          },
        });
        state.price -= currentItem.price;
        state.discountedPrice -= currentItem.discountedPrice;
        if (state.entities[action.payload]?.currentInCart === 0) {
          cartAdapter.removeOne(state, action.payload);
        }
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.entities[action.payload];

      if (currentItem) {
        state.price -= currentItem.currentPrice;
        state.discountedPrice -= currentItem.currentDiscountedPrice;
        cartAdapter.removeOne(state, action.payload);
      }
    },
    clearCart: (state) => {
      cartAdapter.removeAll(state);
      state.price = 0;
      state.discountedPrice = 0;
    },
  },
});

const adapterSelectors = cartAdapter.getSelectors();

export const getAllCartProducts = (state: RootState) =>
  adapterSelectors.selectAll(state.cart);

export const getCartProductById = (state: RootState, id: string) =>
  adapterSelectors.selectById(state.cart, id);

export const getAllCartIds = (state: RootState) =>
  adapterSelectors.selectIds(state.cart) as string[];

export const getCartProductsTotal = (state: RootState) =>
  adapterSelectors.selectTotal(state.cart);

export const {
  deleteFromCart,
  setProductAmount,
  addToCart,
  decrementProductAmount,
  incrementProductAmount,
  clearCart,
} = cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
