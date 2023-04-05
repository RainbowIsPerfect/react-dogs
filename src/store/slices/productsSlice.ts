import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MGMiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.jvxFYnjWqNIeSQpNyOTbUziWoOipBVHFN3ooAlYOUV4';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.react-learning.ru/',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ApiResponse, void>({
      query: () => `products`,
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
