import * as Yup from 'yup';
import { createContext, ReactNode } from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';
import { RedirectLink } from './RedirectLink';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';
import { FormContainer } from './FormContainer';
import { Heading } from './FormHeading';
import { FormComponent } from './FormComponent';
import { FormOption } from './FormOption';

const FormContext = createContext(null);

interface CustomFormProps<T extends FormikValues> extends FormikConfig<T> {
  validationSchema: Yup.ObjectSchema<T>;
  children: ReactNode;
}

export const FormikForm = <T extends FormikValues>({
  onSubmit,
  initialValues,
  validationSchema,
  children,
  ...props
}: CustomFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...props}
    >
      {children}
    </Formik>
  );
};

FormikForm.FormComponent = FormComponent;
FormikForm.FormContainer = FormContainer;
FormikForm.Heading = Heading;
FormikForm.RedirectLink = RedirectLink;
FormikForm.FormField = FormField;
FormikForm.FormOption = FormOption;
FormikForm.SubmitButton = SubmitButton;
