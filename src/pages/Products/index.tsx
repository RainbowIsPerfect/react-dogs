import { CardContainer } from '../../components/CardContainer';
import { SearchIcon } from '../../components/UI/Icons/SearchIcon';
import { Input } from '../../components/UI/Input';
import s from './products.module.scss';

export const Products = () => {
  return (
    <>
      <Input
        className={s.input}
        placeholder="Search"
        startIcon={<SearchIcon />}
      />
      <CardContainer />
    </>
  );
};
