import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import { type Product } from '../../store/slices/productsSlice';
import s from './card.module.scss';
import { CardTags } from './CardTags';
import { CardPrice } from './CardPrice';

interface CardProps {
  productData: Product;
}

export const Card = ({ productData }: CardProps) => {
  const navigate = useNavigate();

  return (
    <div className={s.card}>
      <div className={s['card__image-wrapper']}>
        <img
          className={s.card__image}
          src={productData.pictures}
          alt={productData.name}
        />
        <CardTags
          className={s.card__tags}
          tags={[
            ...productData.tags,
            productData.discount !== 0 ? `${productData.discount}%` : '',
          ]}
        />
      </div>
      <div className={s.card__body}>
        <h2 className={s.card__description}>{productData.name}</h2>
        <p className={s.card__weight}>{productData.wight}</p>
        <CardPrice discount={productData.discount} price={productData.price} />
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
