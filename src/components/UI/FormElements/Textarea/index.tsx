import { FieldProps } from 'formik';
import {
  HTMLTextAreaProps,
  DefaultPropsWithChildren,
} from '../../../../types/prop-types';
import s from './textarea.module.scss';

type TextareaProps = Omit<HTMLTextAreaProps, 'form'> &
  DefaultPropsWithChildren &
  Partial<FieldProps>;

export const Textarea = ({
  children,
  className = '',
  field,
  form,
  ...props
}: TextareaProps) => {
  return (
    <textarea className={`${s.textarea} ${className}`} {...props} {...field}>
      {children}
    </textarea>
  );
};
