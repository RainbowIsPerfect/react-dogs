import { Card } from '../../components/Card';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { TypedLink } from '../../components/TypedLinks/TypedLink';
import { useGetFavoriteUserProductsQuery } from '../../store/slices/productsApiSlice';
import s from './favorites.module.scss';

export const Favorites = () => {
  const { data, error, isLoading } = useGetFavoriteUserProductsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const condition = data && data.products.length > 0;

  return (
    <>
      <h1 className={s.heading}>Your favorite products</h1>
      <ConditionalRenderer
        className={condition ? `${s['card-container']}` : ''}
        error={error}
        isLoading={isLoading}
      >
        {condition ? (
          data.products.map((product) => (
            <Card product={product} key={product._id} />
          ))
        ) : (
          <>
            <p className={s.message}>
              You don&apos;t have any favorite products
            </p>
            <TypedLink to="/">Go to catalog</TypedLink>
          </>
        )}
      </ConditionalRenderer>
    </>
  );
};
