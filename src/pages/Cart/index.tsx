import { CartCard } from '../../components/CartCard';
import { CartOrder } from '../../components/CartOrder';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useGetUserCartProductsQuery } from '../../store/slices/productsApiSlice';
import s from './cart.module.scss';

export const Cart = () => {
  const { products } = useAppSelector((state) => state.cart);
  const { data, isLoading, error } = useGetUserCartProductsQuery(
    products.map((product) => product._id)
  );

  return (
    <>
      <h1 className={s.heading}>Shopping Cart</h1>
      <ConditionalRenderer error={error} isLoading={isLoading}>
        {data && data.products.length ? (
          <>
            <CartOrder data={data.products} />
            {data.products.map((item) => {
              return <CartCard key={item._id} product={item} />;
            })}
          </>
        ) : (
          <div>
            <p className={s.message}>Cart is empty</p>
            <TypedLink to="/">Go to catalog</TypedLink>
          </div>
        )}
      </ConditionalRenderer>
    </>
  );
};
