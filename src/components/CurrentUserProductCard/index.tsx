import { useDeleteProductMutation } from '../../store/slices/productsApiSlice';
import { ProductWithCustomProps } from '../../types';
import { Card } from '../Card';
import { TypedLink } from '../TypedLinks/TypedLink';
import { Button } from '../UI/FormElements/Button';
import s from './user-product-card.module.scss';

interface CurrentUserProductCardProps {
  product: ProductWithCustomProps;
}

export const CurrentUserProductCard = ({
  product,
}: CurrentUserProductCardProps) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  return (
    <Card product={product}>
      <TypedLink
        className={s.button}
        to="/products/edit/:productId"
        params={{ productId: product._id }}
      >
        Edit
      </TypedLink>
      <Button
        className={s.button}
        disabled={isLoading}
        onClick={() => deleteProduct(product._id)}
      >
        Delete
      </Button>
    </Card>
  );
};
