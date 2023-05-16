import { ComponentProps, ReactNode } from 'react';
import { Button } from '../../UI/FormElements/Button';
import s from './form-error.module.scss';

type SubmitButtonProps = Omit<
  ComponentProps<typeof Button>,
  'type' | 'children'
> & {
  children?: ReactNode;
};

export const SubmitButton = ({
  children = 'Submit',
  className = '',
  variant = 'primary',
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      className={`${s.form__button} ${className}`}
      type="submit"
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};
