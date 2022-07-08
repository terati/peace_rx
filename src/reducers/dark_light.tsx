import { createSlice } from "@reduxjs/toolkit";

export interface dark_light_state {
  value: 'dark' | 'light'
}

const initialState: dark_light_state = {
  value: 'dark'
}

const dark_light = createSlice({
  name: 'dark_light_theme',
  initialState: initialState, 
  reducers: {
    toggle_dark_light: (state) => {
      state.value = (state.value == 'dark') ? 'light' : 'dark';
    }
  },
});

export const { toggle_dark_light } = dark_light.actions;
 
export default dark_light.reducer;

