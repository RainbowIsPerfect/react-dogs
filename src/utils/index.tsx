import { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';

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

type LinkComponents = 'Link' | 'Navigate' | 'NavLink';

type ParamsType<T> = T extends DynamicRoutes
  ? {
      params: DynamicRoutesParams<T>;
    }
  : { params?: never };

type DefaultProps = {
  children: ReactNode;
  className?: string;
};

type OmitDefaultProps = {
  [K in keyof DefaultProps]?: never;
};

type AchorDefaultType<T extends LinkComponents> = T extends 'Navigate'
  ? OmitDefaultProps
  : AnchorHTMLAttributes<HTMLAnchorElement> & DefaultProps;

type TypedLinkProps<T, C extends LinkComponents> = ParamsType<T> &
  AchorDefaultType<C> & {
    to: T;
    component: C;
    replace?: boolean;
  };

export const getPath = <
  T extends DynamicRoutes,
  K extends DynamicRoutesParams<T>,
  U extends Record<keyof K, string>
>(
  path: T,
  params: U
): string => {
  return (
    path.slice(0, path.indexOf(':')) +
    Object.keys(params)
      .map((param) =>
        param.replace(param, params[param as keyof typeof params])
      )
      .join('/')
  );
};

export const TypedLink = <T extends Routes, C extends LinkComponents>({
  to,
  params,
  component,
  replace,
  children,
  className,
  ...props
}: TypedLinkProps<T, C>) => {
  switch (component) {
    case 'Link':
      return (
        <Link
          className={className}
          replace={replace}
          to={params ? getPath(to as DynamicRoutes, params) : to}
          {...props}
        >
          {children}
        </Link>
      );
    case 'NavLink':
      return (
        <NavLink
          className={className}
          replace={replace}
          to={params ? getPath(to as DynamicRoutes, params) : to}
          {...props}
        >
          {children}
        </NavLink>
      );
    case 'Navigate':
      return (
        <Navigate
          to={params ? getPath(to as DynamicRoutes, params) : to}
          replace={replace}
        />
      );
    default:
      return null;
  }
};
