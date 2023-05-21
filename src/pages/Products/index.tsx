import { Search } from '../../components/Search';
import { ProductCardsContainer } from '../../components/ProductCardsContainer';
import s from './products.module.scss';

export const Products = () => {
  return (
    <>
      <h1 className={s.heading}>Catalog</h1>
      <Search />
      <ProductCardsContainer />
    </>
  );
};
