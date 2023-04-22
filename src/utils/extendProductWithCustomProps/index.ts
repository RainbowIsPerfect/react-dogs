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

const addDiscountToTags = (tags: string[], discount: number) => {
  return discount ? [...tags, `${discount}%`] : tags;
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

const sortProducts = (productData: DataResponse, sortingQuery: SortingType) => {
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
    default:
      return productData;
  }
};
