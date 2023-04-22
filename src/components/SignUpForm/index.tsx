import { Formik } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import { FormikForm } from '../FormikForm';
import { ExtendedUserSignUpData } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useRegistUserMutation } from '../../store/slices/userApiSlice';
import s from './form.module.scss';

const SignupSchema = Yup.object().shape({
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

const signUpIputsMock = [
  {
    name: 'name',
    type: 'text',
    labelText: 'Name',
  },
  {
    name: 'group',
    type: 'text',
    labelText: 'Group',
  },
  {
    name: 'email',
    type: 'email',
    labelText: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    labelText: 'Password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    labelText: 'Confirm password',
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
    return <Navigate to="/signin" />;
  }

  return (
    <div className={s['form-container']}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => registUser(values)}
      >
        <FormikForm
          heading="Sign Up"
          inputs={signUpIputsMock}
          linkText="Already have an account?"
          linkPath="/signin"
          errorMessage={getErrorMessage(error)}
        />
      </Formik>
    </div>
  );
};
