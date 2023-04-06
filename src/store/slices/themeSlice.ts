import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageHandler } from '../../utils/localStorageHanlder';

export type Theme = 'dark' | 'light' | 'os-default';
interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: localStorageHandler.get<Theme>('color-theme') || 'os-default',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
