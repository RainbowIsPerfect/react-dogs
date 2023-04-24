import { InputHTMLAttributes, ReactNode } from 'react';
import s from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = ({
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
        {...props}
        className={`${s.input} ${inputClassName} ${
          startIcon ? s.input_start : ''
        } ${endIcon ? s.input_end : ''}`}
      />
      {!!endIcon && <div className={s.end}>{endIcon}</div>}
    </div>
  );
};
