import { NavLink } from 'react-router-dom';
import { Routes } from '../../../types';
import s from '../link.module.scss';
import { TypedNavLinkProps, Variant } from '../types';

type ExtendedTypedNavLinkProps<T extends Routes> = TypedNavLinkProps<T> & {
  variant?: Variant;
};

export const TypedNavLink = <T extends Routes>({
  to,
  children,
  variant = 'transparent',
  className = '',
  ...props
}: ExtendedTypedNavLinkProps<T>) => {
  const defaultClasses = `${s.link} ${s[`link_${variant}`]} ${className}`;
  const classes =
    typeof className === 'string'
      ? ({ isActive }: { isActive: boolean; isPending: boolean }) => {
          return isActive
            ? `${defaultClasses} ${s[`link_${variant}_active`]}`
            : `${defaultClasses} ${s[`link_${variant}`]}`;
        }
      : className;

  return (
    <NavLink className={classes} to={to} {...props}>
      {children}
    </NavLink>
  );
};
