import {
  DefaultPropsWithChildren,
  HTMLOptionProps,
} from '../../../../types/prop-types';
import s from './option.module.scss';

type OptionProps = HTMLOptionProps & DefaultPropsWithChildren;

export const Option = ({ children, className = '', ...props }: OptionProps) => {
  return (
    <option className={`${s.option} ${className}`} {...props}>
      {children}
    </option>
  );
};
