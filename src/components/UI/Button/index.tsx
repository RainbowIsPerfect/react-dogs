import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'icon';
  children: ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export const Button = ({
  variant,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${s[`button-${variant}`]} ${s.button} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
