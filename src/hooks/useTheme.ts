import { useLayoutEffect } from 'react';
import { switchTheme, type Theme } from '../store/slices/themeSlice';
import { useAppSelector, useAppDispatch } from './reduxHooks';

export const useTheme = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (themeType: Theme): void => {
    if (themeType !== theme) {
      dispatch(switchTheme(themeType));
    }
  };

  return [theme, setTheme] as const;
};
