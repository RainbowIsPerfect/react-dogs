import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  clearCart,
  deleteByIds,
  toggleSelectAll,
} from '../../store/slices/cartSlice';
import { ProductWithCustomProps } from '../../types';
import { Button } from '../UI/FormElements/Button';
import s from './order.module.scss';

interface CartOrderProps {
  data: ProductWithCustomProps[];
}

export const CartOrder = ({ data }: CartOrderProps) => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const selectedProduct = products
    .filter((product) => product.isSelected)
    .map((item) => item._id);
  const countSum = (priceType: 'discountedPrice' | 'price') => {
    return data.reduce((acc, curr) => {
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
    <div className={s.order}>
      <div className={s.order__total}>
        <div className={s.order__summary}>
          <span className={s.order__text_secondary}>Total:</span>
          <span className={s.order__text_accent}>{selectedProduct.length}</span>
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
          onClick={() => dispatch(deleteByIds(selectedProduct))}
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
        <Button
          onClick={() => dispatch(deleteByIds(selectedProduct))}
          className={s.order__button}
        >
          Delete selected
        </Button>
      </div>
    </div>
  );
};
