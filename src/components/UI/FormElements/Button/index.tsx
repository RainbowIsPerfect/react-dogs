import {
  DefaultPropsWithChildren,
  HTMLButtonProps,
} from '../../../../types/prop-types';
import s from './button.module.scss';

interface ButtonProps extends HTMLButtonProps, DefaultPropsWithChildren {
  variant?: 'primary' | 'secondary' | 'icon' | 'transparent';
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${s[`button_${variant}`]} ${s.button}`}
      {...props}
    >
      {children}
    </button>
  );
};
