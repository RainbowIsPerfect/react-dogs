import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { SearchIcon } from '../../components/UI/Icons/SearchIcon';
import { Input } from '../../components/UI/FormElements/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { SearchQuery, SortingType } from '../../types';
import { Select } from '../../components/UI/FormElements/Select';
import { Option } from '../../components/UI/FormElements/Option';
import { Pagination } from '../../components/Pagination';
import s from './products.module.scss';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState<number>(8);
  const debouncedSearсh = useDebounce<string>(searchParams.get('search') || '');
  const search: SearchQuery = {
    search: debouncedSearсh,
    sorting: (searchParams.get('sorting') as SortingType) || 'popularity',
    page: currentPage,
    itemsPerPage: itemPerPage,
  };
  const { data, isLoading, isFetching, error } = useGetAllProductsQuery(search);
  const pageCount = data ? Math.ceil(data.total / itemPerPage) : 0;

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

  const handlePageClick = ({ selected }: { selected: number }) => {
    return setCurrentPage(selected + 1);
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
          className={s.input}
          onChange={(e) => changeSearchParams(e, 'sorting')}
          value={searchParams.get('sorting') || ''}
        >
          <Option value="popularity">Avg. Customer rating</Option>
          <Option value="price_low">Price: low to high</Option>
          <Option value="price_high">Price: high to low</Option>
          <Option value="sale">Discount %</Option>
          <Option value="name">Name</Option>
        </Select>
        <Select
          className={s.input}
          value={itemPerPage}
          onChange={(e) => setItemPerPage(+e.target.value)}
        >
          <Option value={4}>4</Option>
          <Option value={8}>8</Option>
          <Option value={12}>12</Option>
          <Option value={16}>16</Option>
          <Option value={20}>20</Option>
        </Select>
      </div>
      <p className={s.total}>Products found: {data ? data.total : 0}</p>
      <ConditionalRenderer
        isLoading={isLoading}
        isFetching={isFetching}
        error={error}
      >
        {data && data.products.length > 0 ? (
          <div className={s['card-container']}>
            {data.products.map((product) => (
              <Card key={product._id} productData={product} />
            ))}
          </div>
        ) : (
          <p className={s.message}>
            Sorry, there are no products matching your request &quot;
            {debouncedSearсh}&quot;
          </p>
        )}
      </ConditionalRenderer>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};
