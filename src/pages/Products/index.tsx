import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardContainer } from '../../components/CardContainer';
import { SearchIcon } from '../../components/UI/Icons/SearchIcon';
import { Input } from '../../components/UI/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { SortingType } from '../../types';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { NotFound } from '../NotFound';
import s from './products.module.scss';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearсh = useDebounce<string>(searchParams.get('search') || '');
  const { data, isError, error } = useGetAllProductsQuery({
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
        <select
          className={s.select}
          onChange={(e) => changeSearchParams(e, 'sorting')}
          value={searchParams.get('sorting') || ''}
        >
          <option value="popularity">Avg. Customer rating</option>
          <option value="price_low">Price: low to high</option>
          <option value="price_high">Price: high to low</option>
          <option value="sale">Discount %</option>
          <option value="name">Name</option>
        </select>
      </div>
      <p className={s.total}>Products found: {data ? data.total : 0}</p>
      <CardContainer products={data ? data.products : null} />
    </>
  );
};
