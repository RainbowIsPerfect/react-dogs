import { Form } from 'formik';
import { ComponentProps } from 'react';
import { ComponentWithChildren, ErrorType } from '../../../types/prop-types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import s from './form-component.module.scss';

type FormComponentProps = ComponentProps<typeof Form> &
  ComponentWithChildren & {
    errorMsg: ErrorType;
  };

export const FormComponent = ({
  children,
  className,
  errorMsg,
  ...props
}: FormComponentProps) => {
  return (
    <Form className={`${s.form} ${className}`} {...props}>
      {errorMsg && (
        <p className={`${s.form__error} ${s['form__res-error']}`}>
          {getErrorMessage(errorMsg)}
        </p>
      )}
      {children}
    </Form>
  );
};
