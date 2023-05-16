import { ComponentProps } from 'react';
import { TypedLink } from '../../TypedLinks/TypedLink';
import s from './redirect-link.module.scss';

type RedirectLinkProps = ComponentProps<typeof TypedLink>;

export const RedirectLink = ({
  className = '',
  children,
  variant,
  ...props
}: RedirectLinkProps) => {
  return (
    <TypedLink
      variant={variant || 'transparent'}
      className={`${s.form__link} ${className}`}
      {...props}
    >
      {children}
    </TypedLink>
  );
};
