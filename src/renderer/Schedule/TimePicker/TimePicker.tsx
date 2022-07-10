import * as React from 'react';
import './TimePicker.scss';

const times = [
  '12:00am',
  '12:30am',
  '1:00am',
  '1:30am',
  '2:00am',
  '2:30am',
  '3:00am',
  '3:30am',
  '4:00am',
  '4:30am',
  '5:00am',
  '5:30am',
  '6:00am',

  '6:30am',
  '7:00am',
  '7:30am',
  '8:30am',
  '9:00am',
  '9:30am',
  '10:30am',
  '11:00am',
  '11:30am',
  '12:00pm',
  '12:30pm',
  '1:00pm',
  '1:30pm',
  '2:00pm',

  '2:30pm',
  '3:00pm',
  '3:30pm',
  '4:00pm',
  '4:30pm',
  '5:00pm',
  '5:30pm',
  '6:00pm',
  '6:30pm',
  '7:00pm',
  '7:30pm',
  '8:30pm',
  '9:00pm',

  '9:30pm',
  '10:00pm',
  '10:30pm',
  '11:00pm',
  '11:30pm'
];

function TimePicker(props:any) {
  const {
    start = false,
    onClick = () => {},
    value = '',
    set_events,
    day_string = '',
    event_id = '',
    onBlur = () => {},
    ...other
  } = props;

  const [dropdown_open_status, set_dropdown_open_status] = React.useState(false);

  const time_selection_dropdown_item_click_handler = (new_time:string | null) => {
    // console.log(day_string, event_id);
    // console.log(new_time);

    set_events(current => {
      return {
        ...current,
        [day_string]: {
          ...current[day_string],
          [event_id]: {
            ...current[day_string][event_id],
            [start ? 'time_start' : 'time_end']: new_time
          }
        }
      }
    })

    set_dropdown_open_status(false);
  }

  return (
    <>
      <div className='time_selection'
        tabIndex={0}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) { 
            set_dropdown_open_status(false);
          }
        }}
      >
        <input 
          tabIndex={-1}
          value={value}
          onClick={() => set_dropdown_open_status(!dropdown_open_status)}
          // onBlur={() => set_dropdown_open_status(false)}
        /> 

          { dropdown_open_status &&
            <div className='time_selection_dropdown'
            // tabIndex={0}
            > 
              { times.map((value, idx) => {
                return (
                  <div className={`time_selection_dropdown_item`} 
                    key={`_${idx}`}
                    onClick={() => time_selection_dropdown_item_click_handler(new_time=value)}
                  >
                    { value }
                  </div>
                )
              }) }
            </div>
          }  
      </div> 
    </>
    
  )
}

export default TimePicker