export type Theme = 'dark' | 'light' | 'os-default';
// export type NotDefaultTheme = Exclude<Theme, 'os-default'>;

export const getThemeFromStorage = (): Theme => {
  if (localStorage.getItem('color-theme')) {
    return localStorage.getItem('color-theme') as Theme;
  }
  return 'os-default';
};
