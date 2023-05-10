import { EditProductForm } from '../../components/Forms/EditProductForm';
import { useGetProductByIdQuery } from '../../store/slices/productsApiSlice';

export const EditProduct = () => {
  return <EditProductForm />;
};
