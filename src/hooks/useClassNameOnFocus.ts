import { useState } from 'react';

export const useClassNameOnFocus = (className: string) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return { onFocus, onBlur, className: isFocused ? className : '' };
};
