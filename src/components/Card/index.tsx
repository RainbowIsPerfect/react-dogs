import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import type { Product } from '../../store/slices/productsSlice';
import { countDiscountedPrice } from '../../utils/countDiscountedPrice';
import s from './card.module.scss';

interface CardProps {
  productData: Product;
}

export const Card = ({ productData }: CardProps) => {
  const navigate = useNavigate();
  return (
    <div className={s.card}>
      <img className={s.card__image} src={productData.pictures} alt="Card" />
      <div className={s.card__body}>
        {productData.discount === 0 ? (
          <p className={s.card__price}>{productData.price} &#8381;</p>
        ) : (
          <p className={`${s.card__price} ${s.card__price_special}`}>
            {countDiscountedPrice(productData.price, productData.discount)}
            &#8381;
            <span className={s.card__price_full}>
              {productData.price} &#8381;
            </span>
          </p>
        )}
        <p className={s.card__weight}>{productData.wight}</p>
        {productData.discount !== 0 && (
          <p className={s.card__discount}>-{productData.discount}%</p>
        )}
        <h2 className={s.card__description}>{productData.name}</h2>
        <Button
          variant="primary"
          onClick={() => navigate(`${productData._id}`)}
        >
          Read more
        </Button>
      </div>
    </div>
  );
};
