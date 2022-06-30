import * as React from 'react';
import './Dropdown.css';

function Dropdown(props:any) {
  const {
    chosen = "Week",
    set_chosen,
    ...other
  } = props;
  const [dropdown_open_status, set_dropdown_open_status] = React.useState(false);
  // const [chosen, set_chosen] = React.useState("Selection");

  return (
    <>
      <div className={`dropdown_div`} 
        tabIndex={0}
        onClick={() => set_dropdown_open_status(!dropdown_open_status)}
        onBlur={() => set_dropdown_open_status(false)}
      >
        {chosen}
        <div className={`dropdown_options_super 
          ${dropdown_open_status ? '' : 'dropdown_nonvisible'}`}
          
        >
          <div className="dropdown_option" onClick={() => set_chosen('Month')}>
            Month
          </div> 
          <div className="dropdown_option" onClick={() => set_chosen('Week')}>
            Week
          </div> 
          <div className="dropdown_option" onClick={() => set_chosen('Timesheet')}>
            Timesheet
          </div> 
        </div>
      </div>
      
    </>
  )
}

export default Dropdown