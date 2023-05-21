import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import s from './pagination.module.scss';

type PaginationProps = Required<
  Pick<ReactPaginateProps, 'onPageChange' | 'initialPage' | 'pageCount'>
>;

export const Pagination = ({
  pageCount,
  initialPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={initialPage}
      activeClassName={`${s.pagination__item} ${s.pagination__item_active}`}
      breakClassName={s.pagination__item_page}
      breakLinkClassName={s.pagination__item}
      containerClassName={s.pagination}
      nextClassName={`${s.pagination__item_page} ${s.pagination__item_next}`}
      previousClassName={`${s.pagination__item_page} ${s.pagination__item_previous}`}
      previousLinkClassName={s.pagination__item}
      nextLinkClassName={s.pagination__item}
      pageClassName={s.pagination__item_page}
      pageLinkClassName={`${s.pagination__item}`}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      disableInitialCallback
    />
  );
};
