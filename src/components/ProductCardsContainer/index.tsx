import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../constants';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useGetAllProductsQuery } from '../../store/slices/productsApiSlice';
import { Card } from '../Card';
import { ConditionalRenderer } from '../ConditionalRenderer';
import { Pagination } from '../Pagination';
import { Button } from '../UI/FormElements/Button';
import s from './card-container.module.scss';

export const ProductCardsContainer = () => {
  const { search, sorting } = useAppSelector((state) => state.filter);
  const searchRef = useRef(search);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(() => {
    const page = searchParams.get('page');

    if (page) {
      const pageValue = +page;
      if (Number.isNaN(pageValue) || pageValue <= 0) {
        return 1;
      }
      return pageValue;
    }

    return 1;
  });

  const { data, isLoading, error } = useGetAllProductsQuery({
    search: searchRef.current,
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
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (searchRef.current !== search) {
      searchRef.current = search;
      setCurrentPage(1);
      setSearchParams((prev) => {
        prev.set('page', String(1));
        return prev;
      });
    }
  }, [search, setSearchParams]);

  return (
    <ConditionalRenderer isLoading={isLoading} error={error}>
      {data && data.products.length > 0 ? (
        <>
          <p className={s.total}>Products found: {data ? data.total : 0}</p>
          <div className={s['card-container']}>
            {data.products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            initialPage={currentPage - 1}
            pageCount={pageCount}
            onPageChange={({ selected }) => onPageChange(selected)}
          />
        </>
      ) : (
        <div>
          {search ? (
            <p className={s.message}>
              Sorry, there are no products matching your request &quot;{search}
              &quot;
            </p>
          ) : (
            <>
              <p className={s.message}>No such page</p>
              <Button onClick={() => setCurrentPage(1)}>
                Return to first page
              </Button>
            </>
          )}
        </div>
      )}
    </ConditionalRenderer>
  );
};
