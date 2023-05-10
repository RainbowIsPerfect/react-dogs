import { useGetCurrentUserProductsQuery } from '../../store/slices/productsApiSlice';
import { Card } from '../Card';
import { ConditionalRenderer } from '../ConditionalRenderer';
import { TypedLink } from '../TypedLinks/TypedLink';
import s from './user-products.module.scss';

export const CurrentUserProducts = () => {
  const { data, error, isLoading } = useGetCurrentUserProductsQuery();

  return (
    <div className={s.products}>
      <h1 className={s.products__heading}>Your Products</h1>
      <TypedLink className={s.products__link} to="/create_product">
        Create new product
      </TypedLink>
      <ConditionalRenderer
        className={s['card-container']}
        error={error}
        isLoading={isLoading}
      >
        {data && data.products.length ? (
          data.products.map((product) => {
            return <Card key={product._id} productData={product} />;
          })
        ) : (
          <p className={s.products__message}>
            You don&apos;t have any products
          </p>
        )}
      </ConditionalRenderer>
    </div>
  );
};
