import { Button } from '../UI/Button';
import type { Product } from '../../store/slices/productsSlice';
import s from './card.module.scss';

interface CardProps {
  productData: Product;
}

export const Card = ({ productData }: CardProps) => {
  return (
    <div className={s.card}>
      <img className={s.card__image} src={productData.pictures} alt="Card" />
      <div className={s.card__body}>
        <p className={s.card__price}>{productData.price} Rub</p>
        <h2 className={s.card__description}>{productData.name}</h2>
        <Button variant="primary">Add to cart</Button>
      </div>
    </div>
  );
};
