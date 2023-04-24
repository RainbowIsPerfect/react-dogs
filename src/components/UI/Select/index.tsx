import { OptionHTMLAttributes, SelectHTMLAttributes } from 'react';
import s from './select.module.scss';

interface OptionProps<T extends string = string>
  extends OptionHTMLAttributes<HTMLOptionElement> {
  value: T;
  text: string;
}

interface SelectProps<T extends string = string>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: OptionProps<T>[];
  className?: string;
}

export const Select = <T extends string = string>({
  className,
  options,
  ...props
}: SelectProps<T>) => {
  return (
    <select className={`${s.select} ${className}`} {...props}>
      {options.map(
        ({ value, text, className: optionClassName, ...optionProps }) => {
          return (
            <option
              className={`${s.option} ${optionClassName}`}
              key={value}
              value={value}
              {...optionProps}
            >
              {text}
            </option>
          );
        }
      )}
    </select>
  );
};
