import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from '..';
import {
  CustomApiResponse,
  BaseApiResponse,
  Product,
  ProductWithCustomProps,
  SearchQuery,
  NewProduct,
  NewProductUpdate,
  UserReview,
} from '../../types';
import {
  getCurrentUserProducts,
  getCustomProduct,
  sortProducts,
} from '../../utils/extendProductWithCustomProps';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<CustomApiResponse, SearchQuery>({
      queryFn: async (searchQuery, { getState }, _, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;

        const response = await baseQuery(
          searchQuery.search
            ? `products?query=${searchQuery.search}&page=${searchQuery.page}&limit=${searchQuery.itemsPerPage}`
            : `products?page=${searchQuery.page}&limit=${searchQuery.itemsPerPage}`
        );
        const res = response.data as BaseApiResponse | Product[];

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        const products = getCustomProduct(res, userId);

        return sortProducts(products, searchQuery.sorting);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<ProductWithCustomProps, string>({
      queryFn: async (productId, { getState }, _, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;
        const response = await baseQuery(`products/${productId}`);
        const res = response.data as Product;

        if (response.error) {
          return { error: response.error };
        }

        return getCustomProduct(res, userId);
      },
      providesTags: (result, error, arg) => [{ type: 'Products', id: arg }],
    }),
    toggleLike: builder.mutation<Product, Pick<Product, '_id' | 'likes'>>({
      queryFn: async (product, { getState }, _, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;
        const userLike = product.likes.find((like) => like === userId);
        const response = await baseQuery({
          url: `products/likes/${product._id}`,
          method: userLike ? 'DELETE' : 'PUT',
        });

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        return { data: response.data as Product };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Products', id: arg._id }];
      },
    }),
    createNewProduct: builder.mutation<ProductWithCustomProps, NewProduct>({
      query: (newProduct) => {
        return {
          url: 'https://api.react-learning.ru/products',
          method: 'POST',
          body: newProduct,
        };
      },
      invalidatesTags: ['Products'],
    }),
    getCurrentUserProducts: builder.query<CustomApiResponse, void>({
      queryFn: async (arg, { getState }, extraOptions, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;
        const response = await baseQuery(`products`);
        const res = response.data as BaseApiResponse;
        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        const products = getCustomProduct(res, userId);

        return getCurrentUserProducts(products, userId);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: (productId) => {
        return {
          url: `products/${productId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Products', id: arg }];
      },
    }),
    updateProduct: builder.mutation<Product, NewProductUpdate>({
      query: ({ _id, ...body }) => {
        return {
          url: `products/${_id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Products', id: arg._id }];
      },
    }),
    getUserCartProducts: builder.query<CustomApiResponse, string[]>({
      queryFn: async (arg, { getState }, extraOptions, baseQuery) => {
        const response = await Promise.all(
          arg.map((item) => baseQuery(`products/${item}`))
        );
        const res = response
          .filter((item) => item.data)
          .map((item) => item.data) as Product[];

        const userId = (getState() as RootState).user.userData._id;

        return getCustomProduct(res, userId);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    addReview: builder.mutation<Product, UserReview>({
      query: ({ _id, ...review }) => {
        return {
          url: `products/review/${_id}`,
          method: 'POST',
          body: review,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Products', id: arg._id },
      ],
    }),
    deleteReview: builder.mutation<Product, { _id: string; reviewId: string }>({
      query: ({ _id, reviewId }) => {
        return {
          url: `/products/review/${_id}/${reviewId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Products', id: arg._id },
      ],
    }),
    getFavoriteUserProducts: builder.query<CustomApiResponse, void>({
      queryFn: async (arg, { getState }, _, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;
        const response = await baseQuery(`products`);
        const res = response.data as BaseApiResponse;

        if (response.error) {
          return { error: response.error };
        }

        return getCustomProduct(
          res.products.filter((product) => product.likes.includes(userId)),
          userId
        );
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useToggleLikeMutation,
  useCreateNewProductMutation,
  useGetCurrentUserProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetUserCartProductsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetFavoriteUserProductsQuery,
} = productsApiSlice;
