import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import * as Yup from 'yup';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { FormField } from './FormField';
import { FormInput, FormProps, RedirectLink } from './types';
import s from './form.module.scss';

interface FormikFormProps<T extends FormikValues> extends FormikConfig<T> {
  inputs: FormInput[];
  form: FormProps;
  redirectLink?: RedirectLink;
  validationSchema: Yup.ObjectSchema<T>;
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
          {errorMessage ? (
            <p className={`${s.form__error} ${s['form__res-error']}`}>
              {getErrorMessage(errorMessage)}
            </p>
          ) : null}
          {inputs.map((input) => {
            return <FormField key={input.name} input={input} />;
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
