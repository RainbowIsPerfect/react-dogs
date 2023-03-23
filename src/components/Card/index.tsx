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
        <h2 className={s.card__description}>{productData.name}</h2>
        <p className={s.card__price}>{productData.price} &#8381;</p>
        <p className={s.card__weight}>{productData.wight}</p>
        <Button variant="primary">Add to cart</Button>
      </div>
    </div>
  );
};
