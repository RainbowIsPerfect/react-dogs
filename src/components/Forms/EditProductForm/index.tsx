import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { NotFound } from '../../../pages/NotFound';
import {
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from '../../../store/slices/productsApiSlice';
import { NewProduct } from '../../../types';
import { ConditionalRenderer } from '../../ConditionalRenderer';
import { TypedNavigate } from '../../TypedLinks/TypedNavigate';
import { CreateNewProductForm } from '../CreateNewProductForm';

export const EditProductForm = () => {
  const currentUserId = useAppSelector((state) => state.user.userData._id);
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductByIdQuery(
    productId ?? skipToken
  );
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  if (data && data.author._id !== currentUserId) {
    return <NotFound message="You can't edit other users products" />;
  }

  const initialValues: NewProduct = {
    name: data ? data.name : '',
    description: data ? data.description : '',
    pictures: data ? data.pictures : '',
    price: data ? data.price : 0,
    discount: data ? data.discount : 0,
    wight: data ? data.wight : '',
    stock: data ? data.stock : 0,
    tags: data
      ? data.tags.filter((tag) => tag === 'new' || tag === 'sale')
      : [],
  };

  if (isSuccess) {
    return <TypedNavigate to="/me" />;
  }

  return (
    <ConditionalRenderer isLoading={isLoading} error={error}>
      {data && (
        <CreateNewProductForm
          newInitialValues={initialValues}
          onSubmit={(values) => updateProduct({ ...values, _id: data._id })}
        />
      )}
    </ConditionalRenderer>
  );
};
