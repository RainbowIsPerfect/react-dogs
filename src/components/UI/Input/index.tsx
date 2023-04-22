import { InputHTMLAttributes, ReactNode } from 'react';
import s from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = ({
  placeholder,
  startIcon,
  endIcon,
  containerClassName = '',
  inputClassName = '',
  ...props
}: InputProps) => {
  return (
    <div className={`${s.container} ${containerClassName}`}>
      {!!startIcon && <div className={s.start}>{startIcon}</div>}
      <input
        className={`${s.input} ${inputClassName} ${
          startIcon ? s.input_start : ''
        } ${endIcon ? s.input_end : ''}`}
        placeholder={placeholder}
        {...props}
      />
      {!!endIcon && <div className={s.end}>{endIcon}</div>}
    </div>
  );
};
