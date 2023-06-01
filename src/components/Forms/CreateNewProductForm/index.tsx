import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { useCreateNewProductMutation } from '../../../store/slices/productsApiSlice';
import { NewProduct } from '../../../types';
import { FormikForm } from '../../FormikForm';

export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  pictures: Yup.string().url('Invalid url').required('Required'),
  wight: Yup.string().required('Required'),
  price: Yup.number().positive('Must be positive number').required('Required'),
  discount: Yup.number()
    .min(0, "Can't be negative")
    .max(99, `Can't be more than 99`)
    .required('Required'),
  stock: Yup.number().min(0, "Can't be negative").required('Required'),
  tags: Yup.array(
    Yup.string().oneOf<string>(['sale', 'new']).required('Required')
  ).required('Required'),
});

interface CreateNewProductFormProps {
  newInitialValues?: NewProduct;
  onSubmit?: (
    values: NewProduct,
    formikHelpers: FormikHelpers<NewProduct>
  ) => void | Promise<any>;
}

export const CreateNewProductForm = ({
  newInitialValues,
  onSubmit,
}: CreateNewProductFormProps) => {
  const [createNewProduct, { error, isSuccess }] =
    useCreateNewProductMutation();
  const initialValues: NewProduct = {
    name: '',
    description: '',
    pictures: '',
    price: 0,
    discount: 0,
    wight: '',
    stock: 0,
    tags: [],
  };

  if (isSuccess) {
    return <Navigate to="/me" />;
  }

  return (
    <FormikForm
      initialValues={newInitialValues ?? initialValues}
      validationSchema={NewProductSchema}
      onSubmit={onSubmit ?? ((values) => createNewProduct(values))}
    >
      <FormikForm.FormContainer>
        <FormikForm.FormComponent errorMsg={error}>
          <FormikForm.Heading>Create product</FormikForm.Heading>
          <FormikForm.FormField name="name" labelText="Product name" />
          <FormikForm.FormField name="pictures" labelText="Picture URL" />
          <FormikForm.FormField name="price" labelText="Price" type="number" />
          <FormikForm.FormField
            name="discount"
            labelText="Discount"
            type="number"
          />
          <FormikForm.FormField name="wight" labelText="Weight" />
          <FormikForm.FormField name="stock" labelText="Stock" type="number" />
          <FormikForm.FormField
            as="select"
            name="tags"
            labelText="Tags"
            multiple
            size={2}
          >
            <FormikForm.FormOption value="new">Sale</FormikForm.FormOption>
            <FormikForm.FormOption value="sale">New</FormikForm.FormOption>
          </FormikForm.FormField>
          <FormikForm.FormField
            as="textarea"
            name="description"
            labelText="Description"
          />
          <FormikForm.SubmitButton>Submit</FormikForm.SubmitButton>
        </FormikForm.FormComponent>
      </FormikForm.FormContainer>
    </FormikForm>
  );
};
