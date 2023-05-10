import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  decrementProductAmount,
  incrementProductAmount,
} from '../../store/slices/cartSlice';
import { CartItem, ProductWithCustomProps } from '../../types';
import { ProductPrice } from '../ProductPrice';
import { Input } from '../UI/FormElements/Input';
import s from './cart-input.module.scss';

interface CartInputProps {
  product: ProductWithCustomProps;
  currentProduct: CartItem;
}

export const CartInput = ({ product, currentProduct }: CartInputProps) => {
  const dispatch = useAppDispatch();

  return currentProduct ? (
    <div className={s.container}>
      <ProductPrice
        price={product.price * currentProduct.currentInCart}
        discountedPrice={product.discountedPrice * currentProduct.currentInCart}
        className={s.input__price}
      />
      <Input
        readOnly
        className={s.input}
        inputClassName={s.input__field}
        value={currentProduct.currentInCart}
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
            disabled={currentProduct.currentInCart === product.stock}
            onClick={() => dispatch(incrementProductAmount(product._id))}
          >
            +
          </button>
        }
      />
    </div>
  ) : null;
};
