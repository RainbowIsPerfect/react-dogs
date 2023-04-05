import { InputHTMLAttributes, ReactNode, useRef } from 'react';
import s from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  placeholder?: string;
  className?: string;
}

export const Input = ({
  placeholder,
  startIcon,
  endIcon,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={`${s.container} ${className}`}>
      {!!startIcon && <div className={s.start}>{startIcon}</div>}
      <input
        className={`${s.input} ${startIcon ? s.input_start : ''} ${
          endIcon ? s.input_end : ''
        }`}
        placeholder={placeholder}
        {...props}
      />
      {!!endIcon && <div className={s.end}>{endIcon}</div>}
    </div>
  );
};
