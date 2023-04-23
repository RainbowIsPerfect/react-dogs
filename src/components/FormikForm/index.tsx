import {
  Form,
  ErrorMessage,
  Field,
  Formik,
  FormikConfig,
  FormikValues,
} from 'formik';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import * as Yup from 'yup';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../types';
import { Button } from '../UI/Button';
import { getErrorMessage } from '../../utils/getErrorMessage';
import s from './form.module.scss';

interface FormInput {
  name: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  placeholder?: string;
}

interface RedirectLink {
  linkText: string;
  linkPath: Routes;
}

interface FormProps {
  formHeading: string;
  submitButton?: ReactNode;
}

interface FormikFormProps<T extends FormikValues> extends FormikConfig<T> {
  inputs: FormInput[];
  form: FormProps;
  validationSchema: Yup.ObjectSchema<T>;
  redirectLink?: RedirectLink;
  errorMessage?: FetchBaseQueryError | SerializedError;
}

export const FormikForm = <T extends FormikValues>({
  form,
  inputs,
  redirectLink,
  errorMessage,
  initialValues,
  validationSchema,
  onSubmit,
  ...props
}: FormikFormProps<T>) => {
  return (
    <div className={s['form-container']}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        {...props}
      >
        <Form className={s.form}>
          <h1 className={s.form__heading}>{form.formHeading}</h1>
          {!!errorMessage && (
            <p className={`${s.form__error} ${s['form__res-error']}`}>
              {getErrorMessage(errorMessage)}
            </p>
          )}
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
                  placeholder={
                    input.placeholder ? input.placeholder : input.labelText
                  }
                />
                <ErrorMessage
                  name={input.name}
                  render={(msg) => <p className={s.form__error}>{msg}</p>}
                />
              </div>
            );
          })}
          <Button className={s.form__button} variant="primary" type="submit">
            {form.submitButton || 'Submit'}
          </Button>
          {redirectLink ? (
            <Link className={s.form__link} to={redirectLink.linkPath}>
              {redirectLink.linkText}
            </Link>
          ) : null}
        </Form>
      </Formik>
    </div>
  );
};
