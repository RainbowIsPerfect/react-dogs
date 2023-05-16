import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchOptions, SortingType } from '../../types';

const initialState: SearchOptions = {
  search: '',
  sorting: 'popularity',
};

type Option = { search: string } | { sorting: SortingType };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeParams: (state, action: PayloadAction<Option>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    changeSorting: (state, action: PayloadAction<SortingType>) => {
      state.sorting = action.payload;
    },
  },
});

export const { changeParams, changeSearch, changeSorting } =
  filterSlice.actions;
export const filterSliceReducer = filterSlice.reducer;
