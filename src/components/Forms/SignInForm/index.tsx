import * as Yup from 'yup';
import { FormikForm } from '../../FormikForm';
import { UserSignInData } from '../../../types';
import { useSetSignInMutation } from '../../../store/slices/userApiSlice';
import { TypedNavigate } from '../../TypedLinks/TypedNavigate';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const SignInForm = () => {
  const [signIn, { error, isSuccess }] = useSetSignInMutation();
  const initialValues: UserSignInData = {
    email: '',
    password: '',
  };

  if (isSuccess) {
    return <TypedNavigate to="/" />;
  }

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => signIn(values)}
    >
      <FormikForm.FormContainer>
        <FormikForm.FormComponent errorMsg={error}>
          <FormikForm.Heading>Sign In</FormikForm.Heading>
          <FormikForm.FormField as="input" name="email" labelText="Email" />
          <FormikForm.FormField
            as="input"
            type="password"
            name="password"
            labelText="Password"
          />
          <FormikForm.SubmitButton />
          <FormikForm.RedirectLink to="/signup">
            Need an account?
          </FormikForm.RedirectLink>
        </FormikForm.FormComponent>
      </FormikForm.FormContainer>
    </FormikForm>
  );
};
