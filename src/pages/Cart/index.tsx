import { CartCard } from '../../components/CartCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useGetUserCartProductsQuery } from '../../store/slices/productsApiSlice';
import { getCartProductsIds } from '../../store/slices/userSlice';
import s from './cart.module.scss';

export const Cart = () => {
  const cartItems = useAppSelector((state) => getCartProductsIds(state));
  const { data, isLoading } = useGetUserCartProductsQuery(cartItems);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <h1 className={s.heading}>Shopping Cart</h1>
      <div>
        {data?.length ? (
          data.map((item) => {
            return <CartCard key={item._id} product={item} />;
          })
        ) : (
          <p className={s.message}>Cart is empty</p>
        )}
      </div>
    </>
  );
};
