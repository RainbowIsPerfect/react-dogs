import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import { FormikForm } from '../FormikForm';
import { ExtendedUserSignUpData } from '../../types';
import { useRegistUserMutation } from '../../store/slices/userApiSlice';
import { FormInput } from '../FormikForm/types';
import { TypedLink } from '../TypedLink';

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

const signUpIputsMock: FormInput[] = [
  {
    name: 'name',
    type: 'text',
    labelText: 'Name',
    as: 'input',
  },
  {
    name: 'group',
    type: 'text',
    labelText: 'Group',
    as: 'input',
  },
  {
    name: 'email',
    type: 'email',
    labelText: 'Email',
    as: 'input',
  },
  {
    name: 'password',
    type: 'password',
    labelText: 'Password',
    as: 'input',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    labelText: 'Confirm password',
    as: 'input',
  },
];

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
    return <TypedLink component="Navigate" to="/signin" />;
  }

  return (
    <FormikForm
      form={{ formHeading: 'Sign In', submitButton: 'Sign In' }}
      redirectLink={{
        linkText: 'Already have an account?',
        linkPath: '/signin',
      }}
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={(values) => registUser(values)}
      inputs={signUpIputsMock}
      errorMessage={error}
    />
  );
};
