import { NotFound } from '../../pages/NotFound';
import { useGetAllProductsQuery } from '../../store/slices/productsSlice';
import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';
import s from './card-container.module.scss';

export const CardContainer = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className={s['card-container']}>
        {[...new Array(4)].map((skeleton, i) => {
          return <CardSkeleton key={i} />;
        })}
      </div>
    );
  }

  return (
    <div className={s['card-container']}>
      {data?.products.map((product) => {
        return <Card key={product._id} productData={product} />;
      })}
    </div>
  );
};
