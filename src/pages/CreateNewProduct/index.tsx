import * as Yup from 'yup';
import { FormikForm } from '../../components/FormikForm';
import { useCreateNewProductMutation } from '../../store/slices/productsApiSlice';
import { NewProduct } from '../../types';
import s from './create-product.module.scss';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  pictures: Yup.string().url('Invalid url').required('Required'),
  wight: Yup.string().required('Required'),
  price: Yup.number().positive('Must be positive number').required('Required'),
  discount: Yup.number()
    .positive('Must be positive number')
    .required('Required'),
  stock: Yup.number().positive('Must be positive number').required('Required'),
  tags: Yup.array<any, string>().required(),
});

const createNewProductMock = [
  {
    name: 'name',
    type: 'text',
    labelText: 'Name',
    placeholder: 'Name',
  },
  {
    name: 'price',
    type: 'number',
    labelText: 'price',
    placeholder: 'price',
  },
  {
    name: 'pictures',
    type: 'text',
    labelText: 'picture',
    placeholder: 'picture',
  },
  {
    name: 'description',
    type: 'text',
    labelText: 'description',
    placeholder: 'description',
  },
  {
    name: 'wight',
    type: 'text',
    labelText: 'weight',
    placeholder: 'weight',
  },
  {
    name: 'discount',
    type: 'number',
    labelText: 'discount',
    placeholder: 'discount',
  },
  {
    name: 'stock',
    type: 'number',
    labelText: 'stock',
    placeholder: 'stock',
  },
  {
    name: 'tags',
    type: 'text',
    labelText: 'tags',
    placeholder: 'tags',
  },
];

export const CreateNewProduct = () => {
  const [createNewProduct, { error }] = useCreateNewProductMutation();
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

  return (
    <FormikForm
      form={{ formHeading: 'Create Product', submitButton: 'Submit' }}
      initialValues={initialValues}
      inputs={createNewProductMock}
      onSubmit={(values) => createNewProduct(values)}
      validationSchema={SignupSchema}
      errorMessage={error}
    />
  );
};
