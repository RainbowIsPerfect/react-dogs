import { ProductWithCustomProps } from '../../types';
import { Rating } from '../UI/Rating';
import { ProductPrice } from '../ProductPrice';
import { TypedLink } from '../TypedLinks/TypedLink';
import { ComponentWithChildren } from '../../types/prop-types';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import s from './card.module.scss';

interface CardProps extends Partial<ComponentWithChildren> {
  product: ProductWithCustomProps;
}

export const Card = ({ product, children }: CardProps) => {
  return (
    <div className={s.card}>
      <CardHeader
        _id={product._id}
        isLiked={product.isLiked}
        likes={product.likes}
        name={product.name}
        pictures={product.pictures}
        tags={product.tags}
      />
      <div className={s.card__body}>
        <Rating
          counter={product.reviews.length}
          className={s.card__rating}
          rating={product.rating}
        />
        <ProductPrice
          className={s.card__price}
          discountedPrice={product.discountedPrice}
          price={product.price}
        />
        <h2 title={product.name}>
          <TypedLink
            to="/products/:productId"
            params={{ productId: product._id }}
            variant="transparent"
            className={s.card__description}
          >
            {product.name}
          </TypedLink>
        </h2>
      </div>
      <CardFooter _id={product._id} stock={product.stock}>
        {children}
      </CardFooter>
    </div>
  );
};
