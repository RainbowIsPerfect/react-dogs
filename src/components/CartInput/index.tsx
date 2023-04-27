import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  changeProductAmount,
  deleteFromCart,
  findProductById,
} from '../../store/slices/userSlice';
import { Product } from '../../types';
import { Input } from '../UI/Input';
import s from './cart-input.module.scss';

interface CartInputProps {
  product: Product;
}

export const CartInput = ({ product }: CartInputProps) => {
  const dispatch = useAppDispatch();
  const currentInCart = useAppSelector((state) =>
    findProductById(state, product._id)
  );

  useEffect(() => {
    if (currentInCart === 0) {
      dispatch(deleteFromCart(product._id));
    }
  }, [dispatch, product._id, currentInCart]);

  const changeValue = (action: 'increment' | 'decrement') => {
    dispatch(
      changeProductAmount({
        _id: product._id,
        amount: action === 'increment' ? currentInCart + 1 : currentInCart - 1,
        stock: product.stock,
      })
    );
  };

  return (
    <div className={s.container}>
      <Input
        readOnly
        containerClassName={s.input}
        value={currentInCart}
        startIcon={<button onClick={() => changeValue('decrement')}>-</button>}
        endIcon={
          <button
            disabled={currentInCart === product.stock}
            onClick={() => changeValue('increment')}
          >
            +
          </button>
        }
        type="number"
      />
    </div>
  );
};
