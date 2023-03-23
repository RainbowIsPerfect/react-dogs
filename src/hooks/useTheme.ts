import { useLayoutEffect } from 'react';
import { switchTheme } from '../store/slices/themeSlice';
import { useAppSelector, useAppDispatch } from './reduxHooks';
import { Theme } from '../utils/getThemeFromStorage';
import { localStorageHandler } from '../utils/localStorageHanlder';

export const useTheme = (): [Theme, (themeType: Theme) => void] => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorageHandler('set', 'color-theme', theme);
  }, [theme]);

  const setTheme = (themeType: Theme): void => {
    dispatch(switchTheme(themeType));
  };

  return [theme, setTheme];
};
