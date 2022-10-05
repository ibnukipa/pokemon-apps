import {createSlice} from '@reduxjs/toolkit';
import Menu from '../../constants/Menu';

const initialMenuState = {
  active: Menu.HOME,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    selectMenu: (state, action) => {
      const {value} = action.payload;
      state.active = value;
    },
  },
});

export const {selectMenu} = menuSlice.actions;

export const getActiveMenu = (state: any) => {
  return state.menu.active;
};

export default menuSlice.reducer;
