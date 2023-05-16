import { useEffect } from 'react';
import { SORTING_VALUES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useDebouncedSearchInput } from '../../hooks/useDebouncedSearchInput';
import { useSearchInput } from '../../hooks/useSearchInput';
import { changeParams } from '../../store/slices/filterSlice';
import { Input } from '../UI/FormElements/Input';
import { Option } from '../UI/FormElements/Option';
import { Select } from '../UI/FormElements/Select';
import { SearchIcon } from '../UI/Icons/SearchIcon';
import s from './search.module.scss';

export const Search = () => {
  const { search, sorting } = useAppSelector((state) => state.filter);
  const sortingValue = useSearchInput('sorting', sorting);
  const { debouncedValue, ...searchValue } = useDebouncedSearchInput(
    'search',
    search
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      changeParams({
        search: debouncedValue,
        sorting:
          SORTING_VALUES.find((el) => el === sortingValue.value) ||
          'popularity',
      })
    );
  }, [debouncedValue, dispatch, sortingValue.value]);

  return (
    <div className={s['search-container']}>
      <Input
        className={s.input}
        placeholder="Search"
        startIcon={<SearchIcon />}
        {...searchValue}
      />
      <Select className={s.input} {...sortingValue}>
        <Option value="popularity">Avg. Customer rating</Option>
        <Option value="price_low">Price: low to high</Option>
        <Option value="price_high">Price: high to low</Option>
        <Option value="sale">Discount %</Option>
        <Option value="name">Name</Option>
      </Select>
    </div>
  );
};
