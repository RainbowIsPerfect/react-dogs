import { LinkProps, NavigateProps, NavLinkProps } from 'react-router-dom';
import { DynamicRoutes, DynamicRoutesParams, Routes } from '../../types';

export type LinkComponents = 'Link' | 'Navigate' | 'NavLink';

type SpecificLinkProps<T extends LinkComponents> = T extends 'Link'
  ? Omit<LinkProps, 'to'>
  : T extends 'NavLink'
  ? Omit<NavLinkProps, 'to'>
  : T extends 'Navigate'
  ? Omit<NavigateProps, 'to'>
  : never;

type Params<T> = T extends DynamicRoutes
  ? { to: T; params: DynamicRoutesParams<T> }
  : { to: T; params?: never };

export type TypedLinkProps<T extends Routes> = SpecificLinkProps<'Link'> &
  Params<T>;
export type TypedNavLinkProps<T extends Routes> = SpecificLinkProps<'NavLink'> &
  Params<T>;
export type TypedNavigateProps<T extends Routes> =
  SpecificLinkProps<'Navigate'> & Params<T>;

export type LinkComponentProps<
  T extends Routes,
  C extends LinkComponents
> = C extends 'Link'
  ? TypedLinkProps<T>
  : C extends 'NavLink'
  ? TypedNavLinkProps<T>
  : C extends 'Navigate'
  ? TypedNavigateProps<T>
  : never;

export type TypedProps<T extends Routes, C extends LinkComponents> = {
  component: C;
} & LinkComponentProps<T, C>;

export type Variant =
  | 'primary'
  | 'secondary'
  | 'icon'
  | 'transparent'
  | 'unstyled';
