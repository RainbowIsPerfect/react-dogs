import { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addToCart } from '../../store/slices/userSlice';
import { ProductCartInfo } from '../../types';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import s from './cart-input.module.scss';

interface InputNumberProps {
  product: ProductCartInfo;
}

export const CartInput = ({ product }: InputNumberProps) => {
  const [amount, setAmount] = useState<number>(1);
  const dispatch = useAppDispatch();

  const incrementValue = () => {
    if (amount < product.stock) {
      setAmount((prev) => prev + 1);
    }
  };

  const decrementValue = () => {
    if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  const onClickButton = () => {
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
        min={0}
        max={product.stock}
      />
      <Button className={s.button} variant="primary" onClick={onClickButton}>
        Add to cart
      </Button>
    </div>
  );
};
