import {
  DefaultPropsWithChildren,
  HTMLOptionProps,
} from '../../../types/prop-types';

export const FormOption = ({
  value,
  children,
}: HTMLOptionProps & DefaultPropsWithChildren) => {
  return <option value={value}>{children}</option>;
};
