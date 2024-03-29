
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ip_adr_reducer from 'reducers/ip_adr';
import dark_light_reducer from 'reducers/dark_light';
import inventory_cache_reducer from 'reducers/inventory_cache';

export const store = configureStore({
  reducer: {
    ip_adr: ip_adr_reducer,
    dark_light: dark_light_reducer,
    inventory_cache: inventory_cache_reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
