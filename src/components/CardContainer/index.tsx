import { useGetAllProductsQuery } from '../../store/slices/productsSlice';
import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';
import s from './card-container.module.scss';

export const CardContainer = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  if (isError) {
    return <div style={{ color: 'white' }}>ERROR</div>;
  }

  return (
    <div className={s['card-container']}>
      {isLoading ? (
        <>
          {[...new Array(4)].map((skeleton, i) => {
            return <CardSkeleton key={i} />;
          })}
        </>
      ) : (
        data?.products.map((product) => {
          return <Card key={product._id} productData={product} />;
        })
      )}
    </div>
  );
};
