import { createSlice } from '@reduxjs/toolkit';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
}

const getCurrentTheme = (): Theme => {
  if (sessionStorage.getItem('color-theme') !== null) {
    return <Theme>sessionStorage.getItem('color-theme');
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const initialState: ThemeState = {
  theme: getCurrentTheme(),
};

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { toggleTheme } = counterSlice.actions;

export default counterSlice.reducer;
