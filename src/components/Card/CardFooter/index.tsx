import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { addToCart } from '../../../store/slices/cartSlice';
import { ProductWithCustomProps } from '../../../types';
import { ComponentWithChildren } from '../../../types/prop-types';
import { TypedLink } from '../../TypedLinks/TypedLink';
import { Button } from '../../UI/FormElements/Button';
import s from '../card.module.scss';

type CardFooterProps = Pick<ProductWithCustomProps, '_id' | 'stock'> &
  Partial<ComponentWithChildren>;

export const CardFooter = ({ _id, stock, children }: CardFooterProps) => {
  const currentItem = useAppSelector((state) =>
    state.cart.products.find((item) => item._id === _id)
  );
  const dispatch = useAppDispatch();

  return (
    <footer className={s.card__footer}>
      {currentItem ? (
        <TypedLink className={s.card__button} to="/cart" variant="primary">
          Already in cart
        </TypedLink>
      ) : (
        <Button
          className={`${s.card__button}`}
          onClick={() => dispatch(addToCart(_id))}
          disabled={stock <= 0}
        >
          {stock <= 0 ? 'Out of stock' : 'Add to cart'}
        </Button>
      )}
      {children}
    </footer>
  );
};
