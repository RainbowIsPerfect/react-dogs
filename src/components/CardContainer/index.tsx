import { ProductWithCustomProps } from '../../types';
import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';
import s from './card-container.module.scss';

interface CardContainerProps {
  products: ProductWithCustomProps[] | null;
}

export const CardContainer = ({ products }: CardContainerProps) => {
  return (
    <div className={s['card-container']}>
      {products
        ? products.map((product) => {
            return <Card key={product._id} productData={product} />;
          })
        : [...new Array(4)].map((skeleton, i) => {
            return <CardSkeleton key={i} />;
          })}
    </div>
  );
};
