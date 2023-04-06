import { countDiscountedPrice } from '../../../utils/countDiscountedPrice';
import s from './card-price.module.scss';

interface CardPriceProps {
  price: number;
  discount: number;
}

export const CardPrice = ({ price, discount }: CardPriceProps) => {
  if (discount === 0) {
    return <p className={s.price}>{price} &#8381;</p>;
  }

  return (
    <p className={`${s.price} ${s.price_special}`}>
      {countDiscountedPrice(price, discount)} &#8381;
      <span className={s.price_full}>{price} &#8381;</span>
    </p>
  );
};
