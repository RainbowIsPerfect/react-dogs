import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  type Theme,
  getThemeFromStorage,
} from '../../utils/getThemeFromStorage';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: getThemeFromStorage(),
};

export const counterSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { switchTheme } = counterSlice.actions;

export default counterSlice.reducer;
