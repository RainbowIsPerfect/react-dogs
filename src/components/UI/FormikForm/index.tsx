import { Form, ErrorMessage, Field } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import s from './form.module.scss';

interface InputData {
  name: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  placeholder?: string;
}

interface FormikFormProps {
  heading: string;
  inputs: InputData[];
  linkText: string;
  linkPath: string;
}

export const FormikForm = ({
  heading,
  inputs,
  linkText,
  linkPath,
}: FormikFormProps) => {
  return (
    <Form className={s.form}>
      <h1 className={s.form__heading}>{heading}</h1>
      {inputs.map((input) => {
        return (
          <div className={s['form__input-container']} key={input.name}>
            <label className={s.form__label} htmlFor={input.name}>
              {input.labelText}
            </label>
            <Field
              id={input.name}
              className={s.form__input}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
            />
            <ErrorMessage
              name={input.name}
              render={(msg) => <p className={s.form__error}>{msg}</p>}
            />
          </div>
        );
      })}
      <Button className={s.form__button} variant="primary" type="submit">
        Submit
      </Button>
      <Link className={s.form__link} to={linkPath}>
        {linkText}
      </Link>
    </Form>
  );
};
