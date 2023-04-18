import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { NotFound } from '../../pages/NotFound';
import { useGetAllProductsQuery } from '../../store/slices/productsSlice';
import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import { Input } from '../UI/Input';
import s from './card-container.module.scss';

export const CardContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearсh = useDebounce<string>(searchParams.get('search') || '');
  const { data, isError, isLoading } = useGetAllProductsQuery(debouncedSearсh);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value });
  };

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
    <>
      <Input
        className={s.input}
        placeholder="Search"
        startIcon={<SearchIcon />}
        onChange={onChangeInput}
      />
      <p className={s.total}>Продуктов найдено: {data?.total}</p>
      <div className={s['card-container']}>
        {data?.products.map((product) => {
          return <Card key={product._id} productData={product} />;
        })}
      </div>
    </>
  );
};
