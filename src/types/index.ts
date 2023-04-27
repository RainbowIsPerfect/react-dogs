export type RelativeRoutes =
  | 'signup'
  | 'signin'
  | 'me'
  | 'cart'
  | 'products/:productId'
  | 'products/:productId/:edit'
  | 'edit'
  | 'create_product';
export type AbsoluteRoutes = `/${Exclude<RelativeRoutes, '/'>}` | '/';
export type DynamicRoutes = Extract<
  RelativeRoutes | AbsoluteRoutes,
  `${string}:${string}`
>;
export type Routes = AbsoluteRoutes | RelativeRoutes;

export type ExtractParams<T> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
    ? { [k in Param]: string }
    : never;

export type DynamicRoutesParams<T extends DynamicRoutes> = ExtractParams<T>;

interface BaseResponseData {
  __v: number;
  _id: string;
}

interface CreateData<T extends string | Author> {
  author: T;
  created_at: string;
  updated_at: string;
}

export interface Author extends BaseResponseData {
  about: string;
  avatar: string;
  email: string;
  name: string;
}

export interface User extends Author {
  group: string;
}

export interface Review extends BaseResponseData, CreateData<Author> {
  product: string;
  rating: number;
  text: string;
}

interface CustomProductProps {
  isLiked: boolean;
  discountedPrice: number;
  rating: number;
}

export interface Product extends BaseResponseData, CreateData<Author> {
  available: boolean;
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
  wight: string;
}

export type ProductWithCustomProps = Product & CustomProductProps;

export interface ApiResponse<T extends Product[] | ProductWithCustomProps[]> {
  products: T;
  total: number;
}

export type BaseApiResponse = ApiResponse<Product[]>;
export type CustomApiResponse = ApiResponse<ProductWithCustomProps[]>;

export interface UserData {
  data: User;
  token: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData extends UserSignInData {
  group: string;
  name: string;
}

export interface ExtendedUserSignUpData extends UserSignUpData {
  confirmPassword: string;
}

export interface UserRegisterData extends User {
  isAdmin: boolean;
}

export interface ProductCartInfo {
  id: string;
  image: string;
  name: string;
  stock: number;
}

export type UserInfo = Pick<User, 'about' | 'name' | 'avatar'>;

export type AdditionalProductInfo = Pick<
  Product,
  'stock' | 'wight' | 'created_at' | 'updated_at' | '_id'
>;

export type NewProduct = Pick<
  Product,
  | 'name'
  | 'price'
  | 'description'
  | 'stock'
  | 'pictures'
  | 'tags'
  | 'discount'
  | 'wight'
>;

export type NewProductUpdate = Partial<NewProduct> & Pick<Product, '_id'>;

export type DataResponse<T> = {
  data: T;
};

export type SortingType =
  | 'price_low'
  | 'price_high'
  | 'name'
  | 'sale'
  | 'popularity';

export interface SearchQuery {
  search: string;
  sorting: SortingType;
}
