import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchProducts } from '../../store/slices/productsSlice';
import { Card } from '../Card';
import s from './card-container.module.scss';

export const CardContainer = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(fetchProducts());
  }, [dispath]);

  return (
    <div className={s['card-container']}>
      {products.map((product) => {
        return <Card key={product._id} productData={product} />;
      })}
    </div>
  );
};
