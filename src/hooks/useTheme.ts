import { useLayoutEffect } from 'react';
import { switchTheme } from '../store/slices/themeSlice';
import { useAppSelector, useAppDispatch } from './reduxHooks';
import type { Theme } from '../utils/theme';

export const useTheme = (): [Theme, (themeType: Theme) => void] => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('color-theme', theme);
  }, [theme]);

  const setTheme = (themeType: Theme): void => {
    dispatch(switchTheme(themeType));
  };

  return [theme, setTheme];
};
