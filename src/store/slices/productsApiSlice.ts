import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from '..';
import {
  CustomApiResponse,
  BaseApiResponse,
  Product,
  ProductWithCustomProps,
  SearchQuery,
} from '../../types';
import { getCustomProduct } from '../../utils/extendProductWithCustomProps';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<CustomApiResponse, SearchQuery>({
      queryFn: async (searchQuery, { getState }, _, baseQuery) => {
        const userId = (getState() as RootState).user.userData._id;
        const response = await baseQuery(
          searchQuery.search
            ? `products/search?query=${searchQuery.search}`
            : `products`
        );
        const res = response.data as BaseApiResponse | Product[];

        if (response.error) {
          return { error: response.error as FetchBaseQueryError };
        }

        const products = getCustomProduct(
          'total' in res ? res.products : res,
          userId
        );

        switch (searchQuery.sorting) {
          case 'price_low':
            products.data.products.sort((a, b) => a.price - b.price);
            return products;
          case 'price_high':
            products.data.products.sort((a, b) => b.price - a.price);
            return products;
          case 'name':
            products.data.products.sort((a, b) => a.name.localeCompare(b.name));
            return products;
          case 'sale':
            products.data.products.sort((a, b) => b.discount - a.discount);
            return products;
          case 'popularity':
            products.data.products.sort((a, b) => b.rating - a.rating);
            return products;
          default:
            return products;
        }
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
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useToggleLikeMutation,
} = productsApiSlice;
