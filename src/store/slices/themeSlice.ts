import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light' | 'os-default';
interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: 'os-default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export const themeSliceReducer = themeSlice.reducer;
