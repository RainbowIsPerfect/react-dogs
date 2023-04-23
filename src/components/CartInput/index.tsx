import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addToCart } from '../../store/slices/userSlice';
import { ProductCartInfo } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import s from './cart-input.module.scss';

interface CartInputProps {
  product: ProductCartInfo;
}

export const CartInput = ({ product }: CartInputProps) => {
  const [amount, setAmount] = useState<number>(1);
  const cart = useAppSelector((state) => state.user.cart);
  const dispatch = useAppDispatch();
  const currentProduct = cart.find((item) => item.id === product.id);
  const currentInCart = currentProduct ? currentProduct.stock : 0;
  const currentAvailable = product.stock - currentInCart;
  console.log(currentAvailable, product.stock, amount);

  const incrementValue = () => {
    if (amount < currentAvailable) {
      setAmount((prev) => prev + 1);
    }
  };

  const decrementValue = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const onClickButton = () => {
    if (!currentAvailable) {
      return null;
    }
    if (amount > 0) {
      dispatch(
        addToCart({
          stock: amount,
          id: product.id,
          image: product.image,
          name: product.name,
        })
      );
    }
    return null;
  };

  return (
    <div className={s.container}>
      <Input
        readOnly
        containerClassName={s.input}
        value={amount}
        startIcon={<button onClick={() => decrementValue()}>-</button>}
        endIcon={<button onClick={() => incrementValue()}>+</button>}
        type="number"
        min={1}
        max={currentAvailable}
      />
      <Button className={s.button} variant="primary" onClick={onClickButton}>
        Add to cart
      </Button>
    </div>
  );
};
