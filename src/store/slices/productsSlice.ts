import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type RootState } from '..';

interface Author {
  about: string;
  avatar: string;
  email: string;
  name: string;
  __v: number;
  _id: string;
}

interface User extends Author {
  group: string;
}

export interface Review {
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

interface UserData {
  data: User;
  token: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData extends UserSignInData {
  group: string;
  name: string;
}

interface UserRegisterData {
  name: string;
  about: string;
  avatar: string;
  isAdmin: boolean;
  _id: string;
  email: string;
  group: string;
  __v: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.react-learning.ru/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse, void>({
      query: () => `products/`,
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => `v2/group-11/users/me`,
    }),
    setSignIn: builder.mutation<UserData, UserSignInData>({
      query: (userData) => {
        return {
          url: `signin`,
          method: 'POST',
          body: userData,
        };
      },
    }),
    registUser: builder.mutation<UserRegisterData, UserSignUpData>({
      query: (signUpData) => {
        return {
          url: `signup`,
          method: 'POST',
          body: signUpData,
        };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSetSignInMutation,
  useGetCurrentUserQuery,
  useRegistUserMutation,
} = productsApi;
