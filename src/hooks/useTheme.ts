import { useLayoutEffect } from 'react';
import { toggleTheme } from '../store/slices/themeSlice';
import { useAppSelector, useAppDispatch } from './reduxHooks';

type Scheme = 'dark' | 'light';

export const useTheme = (): [Scheme, () => void] => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('color-theme', theme);
  }, [theme]);

  const toggleScheme = (): void => {
    dispatch(toggleTheme());
  };

  return [theme, toggleScheme];
};
