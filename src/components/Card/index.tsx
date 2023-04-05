import { Button } from '../UI/Button';
import type { Product } from '../../store/slices/productsSlice';
import s from './card.module.scss';
import { countDiscountedPrice } from '../../utils/countDiscountedPrice';

interface CardProps {
  productData: Product;
}

export const Card = ({
  productData: { price, discount, pictures, wight, name },
}: CardProps) => {
  return (
    <div className={s.card}>
      <img className={s.card__image} src={pictures} alt="Card" />
      <div className={s.card__body}>
        {discount === 0 ? (
          <p className={s.card__price}>{price} &#8381;</p>
        ) : (
          <p className={`${s.card__price} ${s.card__price_special}`}>
            {countDiscountedPrice(price, discount)}&#8381;
            <span className={s.card__price_full}>{price} &#8381;</span>
          </p>
        )}
        <p className={s.card__weight}>{wight}</p>
        {discount !== 0 && <p className={s.card__discount}>-{discount}%</p>}
        <h2 className={s.card__description}>{name}</h2>
        <Button variant="primary">Add to cart</Button>
      </div>
    </div>
  );
};
