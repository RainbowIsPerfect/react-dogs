import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { UserSignInData } from '../../store/slices/productsSlice';
import { useAuth } from '../../hooks/useAuth';
import { FormikForm } from '../UI/FormikForm';
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
  const [logInUser, { isError }] = useAuth();
  const navigate = useNavigate();
  const initialValues: UserSignInData = {
    email: '',
    password: '',
  };

  const login = async (values: UserSignInData) => {
    await logInUser(values);
    navigate('/products');
  };

  return (
    <div className={s['form-container']}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => login(values)}
      >
        <FormikForm
          heading="Sign In"
          inputs={signInInputsMock}
          linkText="Need an account?"
          linkPath="signup"
        />
      </Formik>
    </div>
  );
};
