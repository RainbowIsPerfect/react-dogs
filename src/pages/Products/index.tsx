import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { SearchIcon } from '../../components/UI/Icons/SearchIcon';
import { Input } from '../../components/UI/FormElements/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { SearchQuery, SortingType } from '../../types';
import s from './products.module.scss';
import { Select } from '../../components/UI/FormElements/Select';
import { Option } from '../../components/UI/FormElements/Option';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearсh = useDebounce<string>(searchParams.get('search') || '');
  const search: SearchQuery = {
    search: debouncedSearсh,
    sorting: (searchParams.get('sorting') as SortingType) || 'popularity',
  };
  const { data, isSuccess, isLoading, isFetching, error } =
    useGetAllProductsQuery(search);

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

  return (
    <>
      <h1 className={s.heading}>Catalog</h1>
      <div className={s['search-container']}>
        <Input
          value={searchParams.get('search') || ''}
          className={s.input}
          placeholder="Search"
          startIcon={<SearchIcon />}
          onChange={(e) => changeSearchParams(e, 'search')}
        />
        <Select
          onChange={(e) => changeSearchParams(e, 'sorting')}
          value={searchParams.get('sorting') || ''}
        >
          <Option value="popularity">Avg. Customer rating</Option>
          <Option value="price_low">Price: low to high</Option>
          <Option value="price_high">Price: high to low</Option>
          <Option value="sale">Discount %</Option>
          <Option value="name">Name</Option>
        </Select>
      </div>
      <p className={s.total}>Products found: {data ? data.total : 0}</p>
      <ConditionalRenderer
        className={s['card-container']}
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
      >
        {data &&
          data.products.map((product) => (
            <Card key={product._id} productData={product} />
          ))}
      </ConditionalRenderer>
    </>
  );
};

// <Select<SortingType>
//   onChange={(e) => changeSearchParams(e, 'sorting')}
//   value={searchParams.get('sorting') || ''}
//   options={[
//     { text: 'Avg. Customer rating', value: 'popularity' },
//     { text: 'Price: low to high', value: 'price_low' },
//     { text: 'Price: high to low', value: 'price_high' },
//     { text: 'Discount %', value: 'sale' },
//     { text: 'Name', value: 'name' },
//   ]}
// />
