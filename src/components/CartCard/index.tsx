import { Product } from '../../types';
import { CartInput } from '../CartInput';
import s from './cart-card.module.scss';

interface CartCardProps {
  product: Product;
}

export const CartCard = ({ product }: CartCardProps) => {
  return (
    <div className={s.card}>
      <div className={s.card__product}>
        <div className={s['card__image-wrapper']}>
          <img
            className={s.card__image}
            src={product.pictures}
            alt={product.name}
          />
        </div>
        <h2 className={s.card__heading}>{product.name}</h2>
      </div>
      <CartInput product={product} />
    </div>
  );
};
