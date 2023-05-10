import * as Yup from 'yup';
import { useAddReviewMutation } from '../../../store/slices/productsApiSlice';
import { UserReview } from '../../../types';
import { DefaultProps } from '../../../types/prop-types';
import { FormikForm } from '../../FormikForm';
import s from './add-review-form.module.scss';

const AddReviewSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
  rating: Yup.number().integer().min(1).max(5).required('Required'),
});

interface AddReviewFormProps extends DefaultProps {
  _id: string;
}

export const AddReviewForm = ({ _id, className = '' }: AddReviewFormProps) => {
  const [addReview, { error }] = useAddReviewMutation();
  const initialValues: Omit<UserReview, '_id'> = {
    rating: 5,
    text: '',
  };

  return (
    <FormikForm
      validationSchema={AddReviewSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        addReview({
          ...values,
          _id,
        });
      }}
    >
      <FormikForm.FormComponent className={s.form} errorMsg={error}>
        <FormikForm.FormField as="select" name="rating" labelText="Rating">
          {[...new Array(5)].map((_, i, arr) => (
            <FormikForm.FormOption key={i} value={arr.length - i}>
              {arr.length - i}
            </FormikForm.FormOption>
          ))}
        </FormikForm.FormField>
        <FormikForm.FormField as="textarea" name="text" labelText="Review" />
        <FormikForm.SubmitButton>Add review</FormikForm.SubmitButton>
      </FormikForm.FormComponent>
    </FormikForm>
  );
};
