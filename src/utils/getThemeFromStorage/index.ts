import { localStorageHandler } from '../localStorageHanlder';

export type Theme = 'dark' | 'light' | 'os-default';

export const getThemeFromStorage = (): Theme => {
  if (localStorageHandler('get', 'color-theme')) {
    return localStorage.getItem('color-theme') as Theme;
  }
  return 'os-default';
};
