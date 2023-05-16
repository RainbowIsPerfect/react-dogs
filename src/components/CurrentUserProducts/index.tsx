import { useGetCurrentUserProductsQuery } from '../../store/slices/productsApiSlice';
import { ConditionalRenderer } from '../ConditionalRenderer';
import { CurrentUserProductCard } from '../CurrentUserProductCard';
import { TypedLink } from '../TypedLinks/TypedLink';
import s from './user-products.module.scss';

export const CurrentUserProducts = () => {
  const { data, error, isLoading } = useGetCurrentUserProductsQuery();

  return (
    <section>
      <h1 className={s.products__heading}>Your Products</h1>
      <TypedLink className={s.products__link} to="/create_product">
        Create new product
      </TypedLink>
      <ConditionalRenderer error={error} isLoading={isLoading}>
        {data && data.products.length ? (
          <div className={s['card-container']}>
            {data.products.map((product) => (
              <CurrentUserProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <p className={s.products__message}>
            You don&apos;t have any products
          </p>
        )}
      </ConditionalRenderer>
    </section>
  );
};
