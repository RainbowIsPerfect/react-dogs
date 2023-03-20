import { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: ReactNode;
}

export const Button = ({ variant, children }: ButtonProps) => {
  return (
    <button type="button" className={`${s[`button-${variant}`]} ${s.button}`}>
      {children}
    </button>
  );
};
