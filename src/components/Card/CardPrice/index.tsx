import s from './card-price.module.scss';

interface CardPriceProps {
  price: number;
  discountedPrice: number;
}

export const CardPrice = ({ price, discountedPrice }: CardPriceProps) => {
  return discountedPrice === price ? (
    <p className={s.price}>{price} &#8381;</p>
  ) : (
    <p className={`${s.price} ${s.price_special}`}>
      {discountedPrice} &#8381;
      <span className={s.price_prev}>{price} &#8381;</span>
    </p>
  );
};
