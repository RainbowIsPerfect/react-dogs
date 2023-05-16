import { ErrorMessage, Field } from 'formik';
import { ComponentProps } from 'react';
import { Input } from '../../UI/FormElements/Input';
import { Select } from '../../UI/FormElements/Select';
import { Textarea } from '../../UI/FormElements/Textarea';
import s from './form-field.module.scss';

type CustomInputProps = ComponentProps<typeof Input>;
type CustomSelectProps = ComponentProps<typeof Select>;
type CustomTextareaProps = ComponentProps<typeof Textarea>;

type As = 'input' | 'textarea' | 'select';

type BaseFieldProps<T extends As> = {
  name: string;
  as?: T;
  labelText?: string;
  children?: never;
};

type InputFormFieldProps = CustomInputProps & BaseFieldProps<'input'>;

type TextAreaFormFieldProps = BaseFieldProps<'textarea'> &
  Omit<CustomTextareaProps, 'children'>;

type SelectFormFieldProps = Omit<BaseFieldProps<'select'>, 'children'> &
  CustomSelectProps;

type FormFieldProps =
  | InputFormFieldProps
  | TextAreaFormFieldProps
  | SelectFormFieldProps;

export const FormField = ({
  as = 'input',
  name,
  children,
  labelText,
  placeholder,
  ...props
}: FormFieldProps) => {
  const getCurrentComponent = (type: As) => {
    switch (type) {
      case 'input':
        return Input;
      case 'select':
        return Select;
      case 'textarea':
        return Textarea;
      default:
        return Input;
    }
  };

  return (
    <div className={s.field}>
      {labelText && (
        <label className={s.field__label} htmlFor={name}>
          {labelText}
        </label>
      )}
      <Field
        className={`${s.field__input}`}
        component={getCurrentComponent(as)}
        name={name}
        placeholder={placeholder || labelText}
        {...props}
      >
        {children}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <p className={s.field__error}>{msg}</p>}
      />
    </div>
  );
};
