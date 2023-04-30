import { CartCard } from '../../components/CartCard';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { useAppSelector } from '../../hooks/reduxHooks';
import { getAllCartIds } from '../../store/slices/cartSlice';
import { useGetUserCartProductsQuery } from '../../store/slices/productsApiSlice';
import s from './cart.module.scss';

export const Cart = () => {
  const cartItems = useAppSelector((state) => getAllCartIds(state));
  const { data, isLoading, error, isSuccess } =
    useGetUserCartProductsQuery(cartItems);

  return (
    <>
      <h1 className={s.heading}>Shopping Cart</h1>
      <ConditionalRenderer
        error={error}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        {data && data.products.length ? (
          data.products.map((item) => {
            return <CartCard key={item._id} product={item} />;
          })
        ) : (
          <p className={s.message}>Cart is empty</p>
        )}
      </ConditionalRenderer>
    </>
  );
};
