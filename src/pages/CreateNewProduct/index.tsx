import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikForm } from '../../components/FormikForm';
import { FormInput } from '../../components/FormikForm/types';
import { useCreateNewProductMutation } from '../../store/slices/productsApiSlice';
import { NewProduct } from '../../types';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  pictures: Yup.string().url('Invalid url').required('Required'),
  wight: Yup.string().required('Required'),
  price: Yup.number().positive('Must be positive number').required('Required'),
  discount: Yup.number()
    .positive('Must be positive number')
    .max(99, `Can't be more than 99`)
    .required('Required'),
  stock: Yup.number().positive('Must be positive number').required('Required'),
  tags: Yup.array(
    Yup.string().oneOf<string>(['sale', 'new']).required('Required')
  ).required('Required'),
});

const createNewProductMock: FormInput[] = [
  {
    name: 'name',
    as: 'input',
    labelText: 'Name',
    placeholder: 'Name',
  },
  {
    name: 'price',
    as: 'input',
    type: 'number',
    labelText: 'Price',
    placeholder: 'Price',
  },
  {
    name: 'pictures',
    as: 'input',
    labelText: 'Picture',
    placeholder: 'Picture',
  },
  {
    name: 'wight',
    as: 'input',
    labelText: 'Weight',
    placeholder: 'Weight',
  },
  {
    name: 'discount',
    as: 'input',
    type: 'number',
    labelText: 'Discount',
    placeholder: 'Discount',
  },
  {
    name: 'stock',
    as: 'input',
    type: 'number',
    labelText: 'Stock',
    placeholder: 'Stock',
  },
  {
    name: 'tags',
    as: 'select',
    options: [
      { text: 'new', value: 'new' },
      { text: 'sale', value: 'sale' },
    ],
    multiple: true,
    labelText: 'Tags',
    size: 2,
  },
  {
    name: 'description',
    labelText: 'Description',
    as: 'textarea',
    placeholder: 'Description',
  },
];

export const CreateNewProduct = () => {
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
      form={{ formHeading: 'Create Product', submitButton: 'Create' }}
      initialValues={initialValues}
      inputs={createNewProductMock}
      onSubmit={(values) => {
        createNewProduct(values);
      }}
      validationSchema={SignupSchema}
      errorMessage={error}
    />
  );
};
