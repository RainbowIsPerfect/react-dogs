import { Button } from '../UI/FormElements/Button';
import { LikeIcon } from '../UI/Icons/LikeIcon';
import type { ProductWithCustomProps } from '../../types';
import { useToggleLikeMutation } from '../../store/slices/productsApiSlice';
import { Rating } from '../UI/Rating';
import { ProductPrice } from '../ProductPrice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addToCart } from '../../store/slices/cartSlice';
import { TypedLink } from '../TypedLinks/TypedLink';
import s from './card.module.scss';

interface CardProps {
  productData: ProductWithCustomProps;
}

export const Card = ({ productData }: CardProps) => {
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const currentItem = useAppSelector((state) =>
    state.cart.products.find((item) => item._id === productData._id)
  );
  const dispatch = useAppDispatch();

  return (
    <div className={s.card}>
      <header className={s.card__header}>
        <TypedLink
          to="/products/:productId"
          params={{ productId: productData._id }}
          variant="unstyled"
          className={s.card__link}
        >
          <img
            className={s.card__image}
            src={productData.pictures}
            alt={productData.name}
          />
        </TypedLink>
        {productData.tags.length !== 0 && (
          <ul className={s.card__tags}>
            {productData.tags.map((tag, i) => (
              <li key={i} className={s.card__tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
        <Button
          disabled={isLoading}
          className={s.card__like}
          variant="icon"
          onClick={() =>
            toggleLike({ _id: productData._id, likes: productData.likes })
          }
        >
          <LikeIcon
            className={`${s.card__icon} ${
              productData.isLiked ? s.card__icon_active : ''
            }`}
          />
        </Button>
      </header>
      <div className={s.card__body}>
        <Rating
          counter={productData.reviews.length}
          className={s.card__rating}
          rating={productData.rating}
        />
        <ProductPrice
          className={s.card__price}
          discountedPrice={productData.discountedPrice}
          price={productData.price}
        />
        <h2 title={productData.name}>
          <TypedLink
            to="/products/:productId"
            params={{ productId: productData._id }}
            variant="unstyled"
            className={s.card__description}
          >
            {productData.name}
          </TypedLink>
        </h2>
      </div>
      <footer className={s.card__footer}>
        {currentItem ? (
          <TypedLink to="/cart" className={s.card__button} variant="primary">
            Already in cart
          </TypedLink>
        ) : (
          <Button
            className={s.card__button}
            onClick={() => dispatch(addToCart(productData._id))}
            disabled={productData.stock <= 0}
          >
            {productData.stock <= 0 ? 'Out of stock' : 'Add to cart'}
          </Button>
        )}
      </footer>
    </div>
  );
};
