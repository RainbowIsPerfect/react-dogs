import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardContainer } from '../../components/CardContainer';
import { Button } from '../../components/UI/Button';
import { SearchIcon } from '../../components/UI/Icons/SearchIcon';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { SortingType } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { NotFound } from '../NotFound';
import s from './products.module.scss';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearсh = useDebounce<string>(searchParams.get('search') || '');
  const { data, isError, isSuccess, error } = useGetAllProductsQuery({
    search: debouncedSearсh,
    sorting: (searchParams.get('sorting') as SortingType) || 'popularity',
  });

  const changeSearchParams = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>,
    searchParam: 'sorting' | 'search'
  ) => {
    if (!e.target.value) {
      searchParams.delete(searchParam);
      return setSearchParams(searchParams);
    }

    return setSearchParams((prev) => {
      prev.set(searchParam, e.target.value);
      return prev;
    });
  };

  if (isError) {
    return <NotFound message={getErrorMessage(error)} />;
  }

  return (
    <>
      <h1 className={s.heading}>Catalog</h1>
      <div className={s['search-container']}>
        <Input
          value={searchParams.get('search') || ''}
          containerClassName={s.input}
          placeholder="Search"
          startIcon={<SearchIcon />}
          onChange={(e) => changeSearchParams(e, 'search')}
        />
        <Select<SortingType>
          onChange={(e) => changeSearchParams(e, 'sorting')}
          value={searchParams.get('sorting') || ''}
          options={[
            { text: 'Avg. Customer rating', value: 'popularity' },
            { text: 'Price: low to high', value: 'price_low' },
            { text: 'Price: high to low', value: 'price_high' },
            { text: 'Discount %', value: 'sale' },
            { text: 'Name', value: 'name' },
          ]}
        />
      </div>
      <p className={s.total}>Products found: {data ? data.total : 0}</p>
      <CardContainer products={isSuccess ? data.products : null} />
    </>
  );
};
