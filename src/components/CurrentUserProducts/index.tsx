import { useGetCurrentUserProductsQuery } from '../../store/slices/productsApiSlice';
import { CardContainer } from '../CardContainer';
import { TypedLink } from '../TypedLink';
import s from './user-products.module.scss';

export const CurrentUserProducts = () => {
  const { data, isSuccess } = useGetCurrentUserProductsQuery();

  return isSuccess ? (
    <div>
      <h1 className={s.products__heading}>Your Products</h1>
      <TypedLink
        className={s.products__link}
        component="Link"
        to="/create_product"
      >
        Create new product
      </TypedLink>
      {data.products.length ? (
        <CardContainer products={data.products} />
      ) : (
        <p className={s.products__message}>You don&apos;t have any products</p>
      )}
    </div>
  ) : null;
};
