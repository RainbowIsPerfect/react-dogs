import { CardTags } from './CardTags';
import { CardPrice } from './CardPrice';
import { Button } from '../UI/Button';
import { LikeIcon } from '../UI/Icons/LikeIcon';
import type { ProductWithCustomProps } from '../../types';
import { TypedLink } from '../TypedLink';
import { useToggleLikeMutation } from '../../store/slices/productsApiSlice';
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
      <CardTags className={s.card__tags} tags={[...productData.tags]} />
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
        <CardPrice
          discountedPrice={productData.discountedPrice}
          price={productData.price}
        />
        <h2 className={s.card__description} title={productData.name}>
          {productData.name}
        </h2>
        <TypedLink
          className={s.card__link}
          to="/products/:productId"
          params={{ productId: productData._id }}
        >
          Read more
        </TypedLink>
      </div>
    </div>
  );
};
