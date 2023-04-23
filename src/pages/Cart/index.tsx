import { CartCard } from '../../components/CartCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import s from './cart.module.scss';

export const Cart = () => {
  const cartItems = useAppSelector((state) => state.user.cart);

  return (
    <>
      <h1 className={s.heading}>Shopping Cart</h1>
      <div>
        {cartItems.length
          ? cartItems.map((item) => {
              return <CartCard key={item.id} product={item} />;
            })
          : 'Cart is empty'}
      </div>
    </>
  );
};
