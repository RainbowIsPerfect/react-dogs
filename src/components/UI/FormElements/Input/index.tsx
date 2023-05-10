import { FieldProps } from 'formik';
import { ReactNode } from 'react';
import { HTMLInputProps } from '../../../../types/prop-types';
import s from './input.module.scss';

interface InputProps extends Omit<HTMLInputProps, 'form'>, Partial<FieldProps> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = ({
  startIcon,
  endIcon,
  className = '',
  inputClassName = '',
  field,
  form,
  ...props
}: InputProps) => {
  return (
    <div className={`${s.container} ${className}`}>
      {!!startIcon && <div className={s.start}>{startIcon}</div>}
      <input
        {...props}
        {...field}
        className={`${s.input} ${inputClassName} ${
          startIcon ? s.input_start : ''
        } ${endIcon ? s.input_end : ''}`}
      />
      {!!endIcon && <div className={s.end}>{endIcon}</div>}
    </div>
  );
};
