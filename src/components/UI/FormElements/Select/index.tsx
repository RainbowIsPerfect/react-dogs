import { FieldProps } from 'formik';
import {
  DefaultPropsWithChildren,
  HTMLSelectProps,
} from '../../../../types/prop-types';
import s from './select.module.scss';

type SelectProps = Omit<HTMLSelectProps, 'form'> &
  DefaultPropsWithChildren &
  Partial<FieldProps>;

export const Select = ({
  children,
  className,
  field,
  form,
  ...props
}: SelectProps) => {
  return (
    <select className={`${s.select} ${className}`} {...props} {...field}>
      {children}
    </select>
  );
};
