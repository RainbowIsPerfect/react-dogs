import { useAppDispatch } from '../../hooks/reduxHooks';
import { ProductCartInfo } from '../../types';
import { CartInput } from '../CartInput';
import { Button } from '../UI/Button';
import s from './cart-card.module.scss';

interface CartCardProps {
  product: ProductCartInfo;
}

export const CartCard = ({ product }: CartCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={s.card}>
      <div className={s.card__product}>
        {/* <Button
          variant="primary"
          onClick={() => dispatch(deleteFromCart(product.id))}
        >
          Delete
        </Button> */}
        <div className={s['card__image-wrapper']}>
          <img
            className={s.card__image}
            src={product.image}
            alt={product.name}
          />
        </div>
        <h2 className={s.card__heading}>{product.name}</h2>
      </div>
      <CartInput product={product} />
    </div>
  );
};
