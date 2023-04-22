import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikForm } from '../FormikForm';
import { UserSignInData } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useSetSignInMutation } from '../../store/slices/userApiSlice';
import s from './form.module.scss';

const SignupSchema = Yup.object().shape({
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
    <div className={s['form-container']}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => signIn(values)}
      >
        <FormikForm
          heading="Sign In"
          inputs={signInInputsMock}
          linkText="Need an account?"
          linkPath="/signup"
          errorMessage={getErrorMessage(error)}
        />
      </Formik>
    </div>
  );
};
