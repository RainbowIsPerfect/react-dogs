import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleIsSelected } from '../../store/slices/cartSlice';
import { ProductWithCustomProps } from '../../types';
import { CartInput } from '../CartInput';
import { TypedLink } from '../TypedLinks/TypedLink';
import s from './cart-card.module.scss';

interface CartCardProps {
  product: ProductWithCustomProps;
}

export const CartCard = ({ product }: CartCardProps) => {
  const currentItem = useAppSelector((state) =>
    state.cart.products.find((item) => item._id === product._id)
  );
  const dispatch = useAppDispatch();

  return currentItem ? (
    <div className={s.card}>
      <div className={s.card__product}>
        <input
          className={s.card__checkbox}
          type="checkbox"
          onChange={() => {
            dispatch(toggleIsSelected(product._id));
          }}
          checked={currentItem.isSelected}
        />
        <div className={s['card__image-wrapper']}>
          <img
            className={s.card__image}
            src={product.pictures}
            alt={product.name}
          />
        </div>
        <h2 className={s.card__heading}>
          <TypedLink
            to="/products/:productId"
            params={{ productId: product._id }}
            variant="transparent"
          >
            {product.name}
          </TypedLink>
        </h2>
      </div>
      <CartInput product={product} currentProduct={currentItem} />
    </div>
  ) : null;
};
