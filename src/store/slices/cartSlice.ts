import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { ProductCartInfo } from '../../types';

const cartAdapter = createEntityAdapter<ProductCartInfo>({
  selectId: (item) => item._id,
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartAdapter.getInitialState(),
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Pick<ProductCartInfo, '_id' | 'stock'>>
    ) => {
      const currentItem = state.entities[action.payload._id];
      if (!currentItem) {
        cartAdapter.addOne(state, { ...action.payload, currentInCart: 1 });
      }
    },
    changeProductAmount: (
      state,
      action: PayloadAction<
        Pick<ProductCartInfo, '_id' | 'stock'> & { amount: number }
      >
    ) => {
      const currentItem = state.entities[action.payload._id];
      if (currentItem) {
        currentItem.currentInCart = action.payload.amount;
      }
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      const currentItem = state.entities[action.payload];

      if (currentItem) {
        cartAdapter.removeOne(state, action.payload);
      }
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

export const { deleteFromCart, changeProductAmount, addToCart } =
  cartSlice.actions;

export const cartSliceReducer = cartSlice.reducer;
