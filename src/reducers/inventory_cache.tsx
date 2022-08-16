import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      name: 'Losartan 25',
      ndc: '65862201904',
      count: 3,
      entries: [
        {
          GTIN: '00365862201904', 
          Batch_Lot: 'LJ2521019-A',
          Expiration_date: '241130', 
          Serial: '34H149H1Y583S04'
        },
        {
          GTIN: '00365862201904', 
          Batch_Lot: 'LJ2521019-A',
          Expiration_date: '241130', 
          Serial: '34H149H1Y583S04'
        },
        {
          GTIN: '00365862201904', 
          Batch_Lot: 'LJ2521019-A',
          Expiration_date: '241130', 
          Serial: '34H149H1Y583S04'
        }
      ]
    },
    {
      name: 'Losartan 25',
      ndc: '65862201904',
      count: 1,
      entries: [
        {
          GTIN: '00365862201904', 
          Batch_Lot: 'LJ2521019-A',
          Expiration_date: '241130', 
          Serial: '34H149H1Y583S04'
        }
      ]
    },
    {
      name: 'Losartan 25',
      ndc: '65862201904',
      count: 1,
      entries: [
        {
          GTIN: '00365862201904', 
          Batch_Lot: 'LJ2521019-A',
          Expiration_date: '241130', 
          Serial: '34H149H1Y583S04'
        }
      ]
    },
  ]
};

const inventory_cache = createSlice({
  name: 'inventory_cache',
  initialState: initialState, 
  reducers: {
    clear_inventory_cache: (state) => {
      state.value = [];
    }
  },
});

export const { clear_inventory_cache } = inventory_cache.actions;
 
export default inventory_cache.reducer;

