import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useClassNameOnFocus } from '../../hooks/useClassNameOnFocus';
import {
  decrementProductAmount,
  incrementProductAmount,
  setProductAmount,
} from '../../store/slices/cartSlice';
import { CartItem, ProductWithCustomProps } from '../../types';
import { ProductPrice } from '../ProductPrice';
import { Button } from '../UI/FormElements/Button';
import { Input } from '../UI/FormElements/Input';
import s from './cart-input.module.scss';

interface CartInputProps {
  product: ProductWithCustomProps;
  currentProduct: CartItem;
}

export const CartInput = ({ product, currentProduct }: CartInputProps) => {
  const dispatch = useAppDispatch();

  const { className, ...handlers } = useClassNameOnFocus(s.input_active);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.valueAsNumber;
    if (inputValue === 0 || Number.isNaN(inputValue)) {
      inputValue = 1;
    }
    if (inputValue > product.stock) {
      inputValue = product.stock;
    }
    return dispatch(setProductAmount({ _id: product._id, amount: inputValue }));
  };

  return (
    <div className={s.container}>
      <ProductPrice
        price={product.price * currentProduct.currentInCart}
        discountedPrice={product.discountedPrice * currentProduct.currentInCart}
        className={s.input__price}
      />
      <Input
        className={`${s.input} ${className}`}
        inputClassName={s.input__field}
        value={currentProduct.currentInCart}
        onChange={onChangeInput}
        {...handlers}
        type="number"
        startIcon={
          <Button
            className={s.input__button}
            onClick={() => dispatch(decrementProductAmount(product._id))}
          >
            -
          </Button>
        }
        endIcon={
          <Button
            className={s.input__button}
            disabled={currentProduct.currentInCart === product.stock}
            onClick={() => dispatch(incrementProductAmount(product._id))}
          >
            +
          </Button>
        }
      />
    </div>
  );
};
