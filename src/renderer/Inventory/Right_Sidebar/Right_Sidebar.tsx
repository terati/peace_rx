import * as React from 'react';
import rsb_style from './Right_Sidebar.module.scss';
import { DataTable } from './../DataTable';
import { Save_button } from './Save_button';
import { Clear_button } from './Clear_button';

function Right_Sidebar() {
  return (
    <>
      <div className={rsb_style.div_right_sidebar}>
        
        <div className={rsb_style.div_left_drag_region}>
          <div className={rsb_style.div_nub}> 

          </div>
        </div>

        <div className={rsb_style.content_dispense}>
          <div className={rsb_style.content_dispense_top}>
            <h1> Dispense </h1>
            <h2> Current Number of Items: { 10 } </h2>
            <p> Distributor: Healthsource </p> 
            <div className={rsb_style.div_data_table_wrapper}>
              <DataTable />
            </div>
          </div>

          <div className={rsb_style.content_dispense_bottom}>
            <Clear_button />
            <Save_button />
          </div>

        </div>

      </div>
    </>
  )
}

export default Right_Sidebar