import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Elements = HTMLInputElement | HTMLSelectElement;

export const useSearchInput = (
  searchQuery: string,
  initialValue?: string | number
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInitialValue = initialValue || '';
  const [value, setValue] = useState<string>(
    searchParams.get(searchQuery) || String(searchInitialValue)
  );

  const onChange = <T extends Elements>(e: ChangeEvent<T>) => {
    setValue(e.target.value);

    if (!e.target.value) {
      return setSearchParams((prev) => {
        prev.delete(searchQuery);
        return prev;
      });
    }

    return setSearchParams((prev) => {
      prev.set(searchQuery, e.target.value);
      return prev;
    });
  };

  return { value, onChange };
};
