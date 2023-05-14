export const ITEMS_PER_PAGE = 8;
export const SORTING_VALUES = [
  'price_low',
  'price_high',
  'name',
  'sale',
  'popularity',
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
