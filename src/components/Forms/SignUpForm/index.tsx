import * as Yup from 'yup';
import { FormikForm } from '../../FormikForm';
import { ExtendedUserSignUpData } from '../../../types';
import { useRegistUserMutation } from '../../../store/slices/userApiSlice';
import { TypedNavigate } from '../../TypedLinks/TypedNavigate';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  group: Yup.string().required('Group is required'),
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
});

export const SignUpForm = () => {
  const [registUser, { error, isSuccess }] = useRegistUserMutation();
  const initialValues: ExtendedUserSignUpData = {
    name: '',
    group: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  if (isSuccess) {
    return <TypedNavigate to="/signin" />;
  }

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={(values) => registUser(values)}
    >
      <FormikForm.FormContainer>
        <FormikForm.FormComponent errorMsg={error}>
          <FormikForm.Heading>Sign Up</FormikForm.Heading>
          <FormikForm.FormField as="input" name="name" labelText="Name" />
          <FormikForm.FormField as="input" name="group" labelText="Group" />
          <FormikForm.FormField as="input" name="email" labelText="Email" />
          <FormikForm.FormField
            as="input"
            name="password"
            labelText="Password"
            type="password"
          />
          <FormikForm.FormField
            as="input"
            name="confirmPassword"
            labelText="Confirm password"
            type="password"
          />
          <FormikForm.SubmitButton />
          <FormikForm.RedirectLink to="/signin">
            Already have an account?
          </FormikForm.RedirectLink>
        </FormikForm.FormComponent>
      </FormikForm.FormContainer>
    </FormikForm>
  );
};
