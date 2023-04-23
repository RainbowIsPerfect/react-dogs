import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from '..';
import {
  CustomApiResponse,
  BaseApiResponse,
  Product,
  ProductWithCustomProps,
  SearchQuery,
  NewProduct,
} from '../../types';
import {
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
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useToggleLikeMutation,
  useCreateNewProductMutation,
} = productsApiSlice;
