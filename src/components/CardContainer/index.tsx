import { useGetAllProductsQuery } from '../../store/slices/productsSlice';
import { Card } from '../Card';
import s from './card-container.module.scss';

export const CardContainer = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <div style={{ color: 'white' }}>loading...</div>;
  }

  if (isError) {
    return <div style={{ color: 'white' }}>ERROR</div>;
  }

  return (
    <div className={s['card-container']}>
      {data?.products.map((product) => {
        return <Card key={product._id} productData={product} />;
      })}
    </div>
  );
};
