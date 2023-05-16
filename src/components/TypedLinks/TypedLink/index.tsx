import { Link } from 'react-router-dom';
import { DynamicRoutes, Routes } from '../../../types';
import { getPath } from '../../../utils/getPath';
import { TypedLinkProps, Variant } from '../types';
import s from '../link.module.scss';

type ExtendedTypedLinkProps<T extends Routes> = TypedLinkProps<T> & {
  variant?: Variant;
};

export const TypedLink = <T extends Routes>({
  to,
  params,
  children,
  variant = 'primary',
  className = '',
  ...props
}: ExtendedTypedLinkProps<T>) => {
  return (
    <Link
      to={params ? getPath(to as DynamicRoutes, params) : to}
      className={
        variant === 'unstyled'
          ? `${s.link} ${className}`
          : `${s.link} ${s[`link_${variant}`]} ${className}`
      }
      {...props}
    >
      {children}
    </Link>
  );
};
