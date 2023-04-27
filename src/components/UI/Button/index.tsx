import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
  type?: 'submit' | 'reset' | 'button';
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${s[`button_${variant}`]} ${s.button}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
