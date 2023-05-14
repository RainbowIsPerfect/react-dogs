import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { Pagination } from '../../components/Pagination';
import { Search } from '../../components/Search';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ITEMS_PER_PAGE } from '../../constants';
import s from './products.module.scss';

export const Products = () => {
  const { search, sorting } = useAppSelector((state) => state.filter);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const page = searchParams.get('page');
    if (page) {
      return Number.isNaN(+page) ? 1 : +page;
    }
    return 1;
  });
  const { data, isLoading, isFetching, error } = useGetAllProductsQuery({
    search,
    sorting,
    itemsPerPage: ITEMS_PER_PAGE,
    page: currentPage,
  });
  const pageCount = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const onPageChange = (selected: number) => {
    setCurrentPage(selected + 1);
    setSearchParams((prev) => {
      prev.set('page', String(selected + 1));
      return prev;
    });
  };

  return (
    <>
      <h1 className={s.heading}>Catalog</h1>
      <Search />
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
            {currentPage > pageCount
              ? 'No such page'
              : `Sorry, there are no products matching your request "${search}"`}
          </p>
        )}
        <Pagination
          initialPage={currentPage - 1}
          pageCount={pageCount}
          onPageChange={({ selected }) => onPageChange(selected)}
        />
      </ConditionalRenderer>
    </>
  );
};
