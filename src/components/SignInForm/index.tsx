import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { UserSignInData } from '../../types';
import { useSetSignInMutation } from '../../store/slices/userApiSlice';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const signInInputsMock = [
  {
    name: 'email',
    type: 'email',
    labelText: 'Email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    labelText: 'Password',
    placeholder: 'Password',
  },
];

export const SignInForm = () => {
  const [signIn, { error, isSuccess }] = useSetSignInMutation();
  const initialValues: UserSignInData = {
    email: '',
    password: '',
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <FormikForm
      form={{ formHeading: 'Sign Up', submitButton: 'Sign Up' }}
      redirectLink={{
        linkText: 'Need an account?',
        linkPath: '/signup',
      }}
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => signIn(values)}
      inputs={signInInputsMock}
      errorMessage={error}
    />
  );
};
