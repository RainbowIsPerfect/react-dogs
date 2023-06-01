import * as dayjs from 'dayjs';
import {
  Product,
  ProductWithCustomProps,
  BaseApiResponse,
  DataResponse,
  CustomApiResponse,
} from '../../types';

const countDiscountedPrice = (p: number, d: number): number => {
  return p - Math.floor((p * d) / 100);
};

const checkProductIsLiked = (likes: string[], userLike: string): boolean => {
  return likes.includes(userLike);
};

const addDiscountToTags = (tags: string[], discount: number): string[] => {
  return discount ? [`-${discount}%`, ...tags] : tags;
};

const formatDate = (date: string, isFullMonthName?: boolean) => {
  if (isFullMonthName) {
    return dayjs(date).format('DD MMMM, YYYY HH:mm:ss');
  }
  return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
};

const extendProductWithCustomProps = (
  product: Product,
  userId: string
): ProductWithCustomProps => {
  return {
    ...product,
    isLiked: checkProductIsLiked(product.likes, userId),
    discountedPrice: countDiscountedPrice(product.price, product.discount),
    tags: addDiscountToTags(product.tags, product.discount),
    created_at: formatDate(product.created_at),
    updated_at: formatDate(product.updated_at),
    reviews: product.reviews.map((review) => ({
      ...review,
      created_at: formatDate(review.created_at, true),
      updated_at: formatDate(review.updated_at, true),
    })),
  };
};

const wrapResponse = <T>(res: T): DataResponse<T> => ({ data: res });

type ReturnResult<T> = T extends Product[] | BaseApiResponse
  ? DataResponse<CustomApiResponse>
  : DataResponse<ProductWithCustomProps>;

type ResponseType = Product | Product[] | BaseApiResponse;

export const getCustomProduct = <T extends ResponseType>(
  productResponse: T,
  userId: string
) => {
  if (Array.isArray(productResponse)) {
    return wrapResponse({
      products: productResponse.map((product) =>
        extendProductWithCustomProps(product, userId)
      ),
      total: productResponse.length,
    }) as ReturnResult<T>;
  }

  if ('total' in productResponse) {
    return wrapResponse({
      total: productResponse.total,
      products: productResponse.products.map((product) =>
        extendProductWithCustomProps(product, userId)
      ),
    }) as ReturnResult<T>;
  }

  return wrapResponse(
    extendProductWithCustomProps(productResponse, userId)
  ) as ReturnResult<T>;
};

export const getCurrentUserProducts = (
  obj: DataResponse<CustomApiResponse>,
  userId: string
) => {
  const filteredProducts = obj.data.products.filter(
    (product) => product.author._id === userId
  );

  return wrapResponse({
    products: filteredProducts,
    total: filteredProducts.length,
  });
};
