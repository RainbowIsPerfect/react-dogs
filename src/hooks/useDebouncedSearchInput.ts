import { useSearchInput } from './useSearchInput';
import { useDebounce } from './useDebounce';

export const useDebouncedSearchInput = (
  searchQuery: string,
  initialValue?: string | number
) => {
  const searchInitialValue = initialValue || '';
  const { onChange, value } = useSearchInput(
    searchQuery || String(searchInitialValue)
  );
  const debouncedValue = useDebounce(value);

  return { value, onChange, debouncedValue };
};
