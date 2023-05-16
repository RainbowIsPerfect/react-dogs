import * as Yup from 'yup';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useEditUserMutation } from '../../../store/slices/userApiSlice';
import { UserInfo } from '../../../types';
import { FormikForm } from '../../FormikForm';
import { TypedNavigate } from '../../TypedLinks/TypedNavigate';

const EditUserSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  about: Yup.string().required('Required'),
  avatar: Yup.string().url('Invalid url').required('Required'),
});

export const EditProfileForm = () => {
  const { avatar, name, about } = useAppSelector(
    (state) => state.user.userData
  );
  const [editUser, { error, isSuccess }] = useEditUserMutation();
  const initialValues: UserInfo = {
    name,
    about,
    avatar,
  };

  if (isSuccess) {
    return <TypedNavigate to="/me" />;
  }

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={EditUserSchema}
      onSubmit={(values) => editUser(values)}
    >
      <FormikForm.FormContainer>
        <FormikForm.FormComponent errorMsg={error}>
          <FormikForm.Heading>Edit my profile</FormikForm.Heading>
          <FormikForm.FormField as="input" name="name" labelText="Name" />
          <FormikForm.FormField as="input" name="about" labelText="About" />
          <FormikForm.FormField as="input" name="avatar" labelText="Avatar" />
          <FormikForm.SubmitButton>Edit</FormikForm.SubmitButton>
        </FormikForm.FormComponent>
      </FormikForm.FormContainer>
    </FormikForm>
  );
};
