import { DefaultProps } from '../../types/prop-types';
import s from './product-price.module.scss';

interface ProductPriceProps extends DefaultProps {
  discountedPrice: number;
  price: number;
}

export const ProductPrice = ({
  discountedPrice,
  price,
  className = '',
}: ProductPriceProps) => {
  return discountedPrice === price ? (
    <p className={`${s.price} ${className}`}>{price} &#8381;</p>
  ) : (
    <p className={`${s.price} ${s.price_special} ${className}`}>
      <span className={s.price_prev}>{price} &#8381;</span>
      {discountedPrice} &#8381;
    </p>
  );
};
