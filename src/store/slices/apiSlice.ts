import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '..';

export const apiSlice = createApi({
  tagTypes: ['Products', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.react-learning.ru/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).user;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
