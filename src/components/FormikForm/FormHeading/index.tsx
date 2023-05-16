import { DefaultPropsWithChildren } from '../../../types/prop-types';
import s from './form-heading.module.scss';

interface FormHeadingProps extends DefaultPropsWithChildren {
  as?: keyof JSX.IntrinsicElements;
}

export const Heading = ({
  children,
  as = 'h1',
  className = '',
}: FormHeadingProps) => {
  const Element = as;
  return (
    <Element className={`${s.form__heading} ${className}`}>{children}</Element>
  );
};
