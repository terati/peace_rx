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
  '8:00am',
  '8:30am',
  '9:00am',
  '9:30am',
  '10:00am',
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
  '8:00pm',
  '8:30pm',
  '9:00pm',

  '9:30pm',
  '10:00pm',
  '10:30pm',
  '11:00pm',
  '11:30pm'
];

const times_dt = {
  '12:00am': true,
  '12:30am': true,
  '1:00am': true,
  '1:30am': true,
  '2:00am': true,
  '2:30am': true,
  '3:00am': true,
  '3:30am': true,
  '4:00am': true,
  '4:30am': true,
  '5:00am': true,
  '5:30am': true,
  '6:00am': true,

  '6:30am': true,
  '7:00am': true,
  '7:30am': true,
  '8:00am': true,
  '8:30am': true,
  '9:00am': true,
  '9:30am': true,
  '10:00am': true,
  '10:30am': true,
  '11:00am': true,
  '11:30am': true,
  '12:00pm': true,
  '12:30pm': true,
  '1:00pm': true,
  '1:30pm': true,
  '2:00pm': true,

  '2:30pm': true,
  '3:00pm': true,
  '3:30pm': true,
  '4:00pm': true,
  '4:30pm': true,
  '5:00pm': true,
  '5:30pm': true,
  '6:00pm': true,
  '6:30pm': true,
  '7:00pm': true,
  '7:30pm': true,
  '8:00pm': true,
  '8:30pm': true,
  '9:00pm': true,

  '9:30pm': true,
  '10:00pm': true,
  '10:30pm': true,
  '11:00pm': true,
  '11:30pm': true
};

function TimePicker(props:any) {
  const {
    start = false,
    onClick = () => {},
    value = '',
    set_events,
    set_time,
    day_string = '',
    event_id = '',
    onBlur = () => {},
    reg = false,
    ...other
  } = props;

  const [dropdown_open_status, set_dropdown_open_status] = React.useState(false);

  const time_selection_dropdown_item_click_handler = (e, new_time:string | null) => {
    if (!reg) {
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
    } else {
      set_time(new_time);
    }

    set_dropdown_open_status(false);
    e.stopPropagation();
    e.preventDefault();
  }

  const time_selection_onChange_handler = (e) => {
    if (!reg) {
      set_events(current => {
        return {
          ...current,
          [day_string]: {
            ...current[day_string],
            [event_id]: {
              ...current[day_string][event_id],
              [start ? 'time_start' : 'time_end']: e.target.value
            }
          }
        }
      })
    } else {
      set_time(e.target.value);
    }
    e.stopPropagation();
    e.preventDefault();
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
          tabIndex={1}
          value={value}
          onClick={() => set_dropdown_open_status(true)}
          onFocus={(e) => e.target.select()}
          onChange={time_selection_onChange_handler}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.currentTarget.nextSibling?.firstChild && e.currentTarget.nextSibling?.firstChild.focus()
              e.stopPropagation();
              e.preventDefault();
            } 
          }}
          onBlur={onBlur}
          // onBlur={() => set_dropdown_open_status(false)}
        /> 

          { dropdown_open_status &&
            <div className='time_selection_dropdown'
            // tabIndex={0}
            > 
              { times_dt[value] && times.map((value, idx) => {
                return (
                  <div className={`time_selection_dropdown_item`} 
                    key={`_${idx}`}
                    onClick={(e) => time_selection_dropdown_item_click_handler(e, new_time=value)}
                    tabIndex={idx+1}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
                        e.stopPropagation();
                        e.preventDefault();
                      } 
                      if (e.key === 'ArrowUp') {
                        e.currentTarget.previousSibling && e.currentTarget.previousSibling.focus();
                        e.stopPropagation();
                        e.preventDefault();
                      }
                      if (e.key == 'Enter') {
                        time_selection_dropdown_item_click_handler(e, new_time=value)
                        e.stopPropagation();
                        e.preventDefault();
                      }
                    }}
                  >
                    { value }
                  </div>
                )
              }) }

              { !times_dt[value] && times.map((entry, idx) => {
                if (entry.startsWith(value))
                return (
                  <div className={`time_selection_dropdown_item`} 
                    key={`_${idx}`}
                    onClick={(e) => time_selection_dropdown_item_click_handler(e, new_time=entry)}
                    tabIndex={idx+1}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.currentTarget.nextSibling && e.currentTarget.nextSibling.focus();
                      } 
                      if (e.key === 'ArrowUp') {
                        e.currentTarget.previousSibling && e.currentTarget.previousSibling.focus();
                      }
                      if (e.key == 'Enter') {
                        time_selection_dropdown_item_click_handler(e, new_time=entry);
                      }
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    { entry }
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