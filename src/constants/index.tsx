export const ITEMS_PER_PAGE = 16;
export const SORTING_VALUES = [
  'PRICE_ASC',
  'PRICE_DESC',
  'NAME',
  'DISCOUNT',
  'DATE_NEWEST',
  'DATE_OLDEST',
] as const;
export const ROUTES = [
  'signup',
  'signin',
  'me',
  'cart',
  'products/:productId',
  'products/edit/:productId',
  'edit',
  'create_product',
  'favorite',
] as const;
