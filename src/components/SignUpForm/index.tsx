import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  useRegistUserMutation,
  UserSignUpData,
} from '../../store/slices/productsSlice';
import { FormikForm } from '../FormikForm';
import { Routes } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
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
    placeholder: 'Name',
  },
  {
    name: 'group',
    type: 'text',
    labelText: 'Group',
    placeholder: 'Group',
  },
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
  {
    name: 'confirmPassword',
    type: 'password',
    labelText: 'Confirm password',
    placeholder: 'Confirm password',
  },
];

type FieldsData = UserSignUpData & { confirmPassword: string };

export const SignUpForm = () => {
  const [registUser, { error }] = useRegistUserMutation();
  const navigate = useNavigate();

  const initialValues: FieldsData = {
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
    name: '',
  };

  const login = async (values: FieldsData) => {
    const { confirmPassword, ...rest } = values;
    await registUser(rest).unwrap();
    navigate(Routes.Index);
  };

  return (
    <div className={s['form-container']}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => login(values)}
      >
        <FormikForm
          heading="Sign Up"
          inputs={signUpIputsMock}
          linkText="Already have an account?"
          linkPath={Routes.Index}
          errorMessage={getErrorMessage(error)}
        />
      </Formik>
    </div>
  );
};
