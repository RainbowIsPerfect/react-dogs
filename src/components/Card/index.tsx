import { Button } from '../UI/Button';
import { LikeIcon } from '../UI/Icons/LikeIcon';
import type { ProductWithCustomProps } from '../../types';
import { TypedLink } from '../TypedLink';
import { useToggleLikeMutation } from '../../store/slices/productsApiSlice';
import { MapContainer } from '../MapContainer';
import s from './card.module.scss';

interface CardProps {
  productData: ProductWithCustomProps;
}

export const Card = ({ productData }: CardProps) => {
  const [toggleLike, { isLoading }] = useToggleLikeMutation();

  return (
    <div className={s.card}>
      <img
        className={s.card__image}
        src={productData.pictures}
        alt={productData.name}
      />
      <ul className={s.card__tags}>
        {productData.tags.map((tag, i) => (
          <li key={i} className={s.card__tag}>
            {tag}
          </li>
        ))}
      </ul>
      <Button
        disabled={isLoading}
        className={s.card__like}
        variant="icon"
        onClick={() =>
          toggleLike({ _id: productData._id, likes: productData.likes })
        }
      >
        <LikeIcon className={productData.isLiked ? s.active : ''} />
      </Button>
      <div className={s.card__body}>
        {productData.discountedPrice === productData.price ? (
          <p className={s.card__price}>{productData.price} &#8381;</p>
        ) : (
          <p className={`${s.card__price} ${s.card__price_special}`}>
            {productData.discountedPrice} &#8381;
            <span className={s.card__price_prev}>
              {productData.price} &#8381;
            </span>
          </p>
        )}
        <h2 className={s.card__description} title={productData.name}>
          {productData.name}
        </h2>
        <TypedLink
          component="Link"
          variant="primary"
          to="/products/:productId"
          params={{ productId: productData._id }}
        >
          Read more
        </TypedLink>
      </div>
    </div>
  );
};
