import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikForm } from '../../components/FormikForm';
import { FormInput } from '../../components/FormikForm/types';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEditUserMutation } from '../../store/slices/userApiSlice';
import { UserInfo } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import s from './edit-profile.module.scss';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  about: Yup.string().required('Required'),
  avatar: Yup.string().url('Invalid url').required('Required'),
});

const editInputsMock: FormInput[] = [
  {
    name: 'name',
    as: 'input',
    labelText: 'Name',
    placeholder: 'Name',
  },
  {
    name: 'about',
    as: 'input',
    labelText: 'About',
    placeholder: 'About',
  },
  {
    name: 'avatar',
    as: 'input',
    labelText: 'Avatar',
    placeholder: 'Avatar',
  },
];

export const EditProfile = () => {
  const { avatar, name, about } = useAppSelector(
    (state) => state.user.userData
  );
  const [editUser, { isSuccess, error }] = useEditUserMutation();
  const initialValues: UserInfo = {
    name,
    about,
    avatar,
  };

  return (
    <FormikForm
      form={{ formHeading: 'Edit my profile', submitButton: 'Edit' }}
      initialValues={initialValues}
      inputs={editInputsMock}
      onSubmit={(values) => editUser(values)}
      validationSchema={SignupSchema}
      errorMessage={error}
    />
  );
};
