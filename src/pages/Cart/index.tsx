import { CartCard } from '../../components/CartCard';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { Button } from '../../components/UI/FormElements/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  clearCart,
  deleteByIds,
  toggleSelectAll,
} from '../../store/slices/cartSlice';
import { useGetUserCartProductsQuery } from '../../store/slices/productsApiSlice';
import s from './cart.module.scss';

export const Cart = () => {
  const products = useAppSelector((state) => state.cart.products);
  const { data, isLoading, error } = useGetUserCartProductsQuery(
    products.map((item) => item._id)
  );
  const dispatch = useAppDispatch();
  const selectedProduct = products.filter((product) => product.isSelected);
  const countSum = (priceType: 'discountedPrice' | 'price') => {
    if (!data) return 0;
    return data.products.reduce((acc, curr) => {
      const currentProduct = products.find((item) => item._id === curr._id);
      if (currentProduct && currentProduct.isSelected) {
        return currentProduct.currentInCart * curr[priceType] + acc;
      }
      return acc;
    }, 0);
  };
  const totalDiscountedPrice = countSum('discountedPrice');
  const totalPrice = countSum('price');

  return (
    <>
      <h1 className={s.heading}>Shopping Cart</h1>
      <ConditionalRenderer error={error} isLoading={isLoading}>
        {data && data.products.length ? (
          <>
            <div className={s.order}>
              <div className={s.order__total}>
                <div className={s.order__summary}>
                  <span className={s.order__text_secondary}>Total:</span>
                  <span className={s.order__text_accent}>
                    {selectedProduct.length}
                  </span>
                </div>
                <div className={s.order__summary}>
                  {totalDiscountedPrice !== totalPrice && (
                    <span
                      className={`${s.order__text_secondary} ${s.order__text_price}`}
                    >
                      {totalPrice} &#8381;
                    </span>
                  )}
                  <span className={s.order__text_accent}>
                    {totalDiscountedPrice} &#8381;
                  </span>
                </div>
              </div>
              <div className={s.order__buttons}>
                <Button
                  onClick={() =>
                    dispatch(
                      deleteByIds(selectedProduct.map((item) => item._id))
                    )
                  }
                  disabled={selectedProduct.length === 0}
                  className={s.order__button}
                >
                  Proceed to checkout
                </Button>
                <Button
                  onClick={() => dispatch(toggleSelectAll())}
                  className={s.order__button}
                >
                  Select / Unselect all
                </Button>
                <Button
                  onClick={() => dispatch(clearCart())}
                  className={s.order__button}
                >
                  Delete all
                </Button>
              </div>
            </div>
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
