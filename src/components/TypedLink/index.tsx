import { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { getPath } from '../../utils/getPath';
import { DynamicRoutes, DynamicRoutesParams, Routes } from '../../types';
import s from './link.module.scss';

type LinkComponents = 'Link' | 'Navigate' | 'NavLink';

type ParamsType<T> = T extends DynamicRoutes
  ? {
      params: DynamicRoutesParams<T>;
    }
  : { params?: never };

type DefaultProps = {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'icon' | 'transparent';
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

export const TypedLink = <T extends Routes, C extends LinkComponents>({
  to,
  params,
  component,
  replace,
  children,
  className,
  variant,
  ...props
}: TypedLinkProps<T, C>) => {
  switch (component) {
    case 'Link':
      return (
        <Link
          className={`${s.link} ${s[`link_${variant}`]} ${className}`}
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
          className={`${s.link} ${className}`}
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
