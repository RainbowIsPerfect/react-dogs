import { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { getPath } from '../../utils/getPath';
import { DynamicRoutes, DynamicRoutesParams, Routes } from '../../types';

type ParamsType<T> = T extends DynamicRoutes
  ? {
      params: DynamicRoutesParams<T>;
    }
  : { params?: never };

type TypedLinkProps<T> = AnchorHTMLAttributes<HTMLAnchorElement> &
  ParamsType<T> & {
    to: T;
    children: ReactNode;
    replace?: boolean;
    className?: string;
  };

export const TypedLink = <T extends Routes>({
  to,
  params,
  replace,
  children,
  className,
  ...props
}: TypedLinkProps<T>) => {
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
};
