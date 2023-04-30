import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  decrementProductAmount,
  getCartProductById,
  incrementProductAmount,
} from '../../store/slices/cartSlice';
import { Product } from '../../types';
import { Input } from '../UI/Input';
import s from './cart-input.module.scss';

interface CartInputProps {
  product: Product;
}

export const CartInput = ({ product }: CartInputProps) => {
  const dispatch = useAppDispatch();
  const currentItem = useAppSelector((state) =>
    getCartProductById(state, product._id)
  );

  return currentItem ? (
    <div className={s.container}>
      <p>{currentItem.currentPrice}</p>
      <Input
        readOnly
        containerClassName={s.input}
        value={currentItem.currentInCart}
        type="number"
        startIcon={
          <button
            className={s.input__button}
            onClick={() => dispatch(decrementProductAmount(product._id))}
          >
            -
          </button>
        }
        endIcon={
          <button
            className={s.input__button}
            disabled={currentItem.currentInCart === product.stock}
            onClick={() => dispatch(incrementProductAmount(product._id))}
          >
            +
          </button>
        }
      />
    </div>
  ) : null;
};
