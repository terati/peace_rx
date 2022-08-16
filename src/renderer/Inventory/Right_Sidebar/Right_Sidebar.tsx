import * as React from 'react';
import rsb_style from './Right_Sidebar.module.scss';
import { DataTable } from './../DataTable';
import { Save_button } from './Save_button';
import { Clear_button } from './Clear_button';

import { store } from 'renderer/store';
import { useSelector } from "react-redux";
import { clear_inventory_cache } from 'reducers/inventory_cache';
import Arrow_Point_Left from 'renderer/Icons_Color_Control/Arrow_Point_Left';
import Arrow_Point_Right from 'renderer/Icons_Color_Control/Arrow_Point_Right';
 
function Right_Sidebar() {
  const inventory_cache = useSelector(state => state.inventory_cache?.value);
  const dark_light_mode = useSelector(state => state.dark_light?.value);
  
  const clear_handler = () => {
    store.dispatch(clear_inventory_cache());
  }

  interface Column {
    field: string | number,
    headerName: string | number,
    width?: string | number 
  }
  
  const columns: Column[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 100 
    },
    {
      field: 'ndc',
      headerName: 'NDC',
      width: 200
    },
    {
      field: 'count',
      headerName: 'Count',
      width: 100
    },
  ]

  return (
    <>
      <div className={rsb_style.div_right_sidebar}
      >
        
        <div className={rsb_style.div_left_drag_region}>
          <div className={rsb_style.div_nub}> 
            <Arrow_Point_Left fill={'white'} width={25} height={15} />
            <Arrow_Point_Right fill={'white'} width={25} height={15} />
          </div>
        </div>

        <div className={rsb_style.content_dispense}>
          <div className={rsb_style.content_dispense_top}>
            <h1> Dispense </h1>
            <h2> Current Number of Items: { 10 } </h2>
            <p> Distributor: Healthsource </p> 
            <div className={rsb_style.div_data_table_wrapper}>
              <DataTable columns={columns} rows={inventory_cache} />
            </div>
          </div>

          <div className={rsb_style.content_dispense_bottom}>
            <Clear_button onClick={clear_handler} />
            <Save_button />
          </div>

        </div>

      </div>
    </>
  )
}

export default Right_Sidebar