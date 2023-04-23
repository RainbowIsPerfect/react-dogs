import * as dayjs from 'dayjs';
import {
  Product,
  ProductWithCustomProps,
  Review,
  BaseApiResponse,
  DataResponse,
  SortingType,
} from '../../types';

const countDiscountedPrice = (p: number, d: number): number => {
  return p - Math.floor((p * d) / 100);
};

const countAverageRating = (reviews: Review[]): number => {
  return reviews.length
    ? Math.round(
        reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
      )
    : 0;
};

const checkProductIsLiked = (likes: string[], userLike: string): boolean => {
  return likes.includes(userLike);
};

const addDiscountToTags = (tags: string[], discount: number): string[] => {
  return discount ? [...tags, `${discount}%`] : tags;
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
    rating: countAverageRating(product.reviews),
    created_at: formatDate(product.created_at),
    updated_at: formatDate(product.updated_at),
    reviews: product.reviews.map((review) => ({
      ...review,
      created_at: formatDate(review.created_at, true),
      updated_at: formatDate(review.updated_at, true),
    })),
  };
};

const wrapResonseInObject = <T>(res: T) => {
  return { data: res };
};

type ReturnResult<T> = T extends Product[] | BaseApiResponse
  ? { data: { products: ProductWithCustomProps[]; total: number } }
  : { data: ProductWithCustomProps };

export const getCustomProduct = <
  T extends Product | Product[] | BaseApiResponse
>(
  productResponse: T,
  userId: string
) => {
  if (Array.isArray(productResponse)) {
    return wrapResonseInObject({
      products: productResponse.map((product) =>
        extendProductWithCustomProps(product, userId)
      ),
      total: productResponse.length,
    }) as ReturnResult<T>;
  }

  if ('total' in productResponse) {
    return wrapResonseInObject({
      total: productResponse.total,
      products: productResponse.products.map((product) =>
        extendProductWithCustomProps(product, userId)
      ),
    }) as ReturnResult<T>;
  }

  return wrapResonseInObject(
    extendProductWithCustomProps(productResponse, userId)
  ) as ReturnResult<T>;
};

export const sortProducts = (
  productData: DataResponse,
  sortingQuery: SortingType
): DataResponse => {
  switch (sortingQuery) {
    case 'price_low':
      productData.data.products.sort((a, b) => a.price - b.price);
      return productData;
    case 'price_high':
      productData.data.products.sort((a, b) => b.price - a.price);
      return productData;
    case 'name':
      productData.data.products.sort((a, b) => a.name.localeCompare(b.name));
      return productData;
    case 'sale':
      productData.data.products.sort((a, b) => b.discount - a.discount);
      return productData;
    case 'popularity':
      productData.data.products.sort((a, b) => b.rating - a.rating);
      return productData;
    default:
      return productData;
  }
};
