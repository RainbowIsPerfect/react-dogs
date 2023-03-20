import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Author {
  about: string;
  avatar: string;
  email: string;
  name: string;
  __v: number;
  _id: string;
}

interface Review {
  author: string;
  created_at: string;
  product: string;
  rating: number;
  text: string;
  updated_at: string;
  __v: number;
  _id: string;
}

export interface Product {
  author: Author;
  available: boolean;
  created_at: string;
  description: string;
  discount: number;
  isPublished: boolean;
  likes: string[];
  name: string;
  pictures: string;
  price: number;
  reviews: Review[];
  stock: number;
  tags: string[];
  updated_at: string;
  wight: string;
  __v: number;
  _id: string;
}

interface ApiResponse {
  products: Product[];
  total: number;
}

interface InitialState {
  products: Product[];
  total: number;
  status: 'loading' | 'fullfield' | 'rejected';
}

export const fetchProducts = createAsyncThunk<
  ApiResponse,
  undefined,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  const { data, status } = await axios.get<ApiResponse>(
    'https://api.react-learning.ru/products',
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MGMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.jvxFYnjWqNIeSQpNyOTbUziWoOipBVHFN3ooAlYOUV4',
      },
    }
  );

  if (status !== 200) {
    return rejectWithValue('Error');
  }

  return data;
});

const initialState: InitialState = {
  products: [],
  total: 0,
  status: 'loading',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'fullfield';
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export default productsSlice.reducer;
