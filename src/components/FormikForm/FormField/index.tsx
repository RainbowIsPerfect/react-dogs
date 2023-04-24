import { ErrorMessage, Field } from 'formik';
import { FormInput } from '../types';
import s from './form-field.module.scss';

interface FormFieldProps<T extends FormInput> {
  input: T;
}

export const FormField = <T extends FormInput>({
  input: { as, labelText, name, options, ...props },
}: FormFieldProps<T>) => {
  return (
    <div className={s.field} key={name}>
      <label className={s.field__label} htmlFor={name}>
        {labelText}
      </label>
      <Field
        id={name}
        as={as}
        className={`${s.field__input} ${s[`field__input_${as}`]}`}
        name={name}
        {...props}
      >
        {options
          ? options.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.text}
                </option>
              );
            })
          : null}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <p className={s.field__error}>{msg}</p>}
      />
    </div>
  );
};
