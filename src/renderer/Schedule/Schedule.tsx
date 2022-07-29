import * as React from 'react';
import './schedule.scss';
import './draggable_div.scss';
import './schedule_week.scss';
import './schedule_timesheet.scss';
import Sidebar from 'renderer/Sidebar/Sidebar';
import { computeCalender, numberOfDays, week_compose } from './calender_calc';
import MenuBurger_Icon from '../Icons_Color_Control/Menu_burger';
import Left_Icon from '../Icons_Color_Control/Left_Arrow';
import Right_Icon from '../Icons_Color_Control/Right_Arrow';
import Plus_Icon from '../Icons_Color_Control/Plus';
import Close_Icon from '../Icons_Color_Control/Close';
import Description_Icon from '../Icons_Color_Control/Description';
import Users_Icon from 'renderer/Icons_Color_Control/Users';
import Clock_Icon from '../Icons_Color_Control/Clock';

import { Checkbox } from './Checkbox';
import { Dropdown } from './Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./mini_date_picker_tmp.css";

import useWindowDimensions from './useWindowDimensions';
import { stringify } from 'querystring';
import { TimePicker } from './TimePicker';
import { _12_to_24_hour, time_to_timesheet_conversion_dt } from './time_calc_helpers';

let month_dt = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

function Schedule() {
  const { height, width } = useWindowDimensions();

  let today = new Date();
  const [dd, set_dd] = React.useState(today.getDate());
  const [mm, set_mm] = React.useState(today.getMonth());
  const [yyyy, set_yyyy] = React.useState(today.getFullYear()); 
  const [full_year_calender, set_full_year_calender] = React.useState(computeCalender(yyyy));
  // console.log(today)
  // console.log(full_year_calender);

  const [month, set_month] = React.useState(mm);
  const [year, set_year] = React.useState(yyyy);
  const [numberOfDays_val, set_numberOfDays_val] = React.useState(numberOfDays(month, year));

  const [mini_full_year_calender, set_mini_full_year_calender] = React.useState(full_year_calender);
  const [mini_calender_day, set_mini_calender_day] = React.useState(dd);
  const [mini_calender_month, set_mini_calender_month] = React.useState(mm);
  const [mini_calender_year, set_mini_calender_year] = React.useState(yyyy);

  const [week_dt, set_week_dt] = React.useState(week_compose(yyyy, mm+1, dd));

  const [animation_status, set_animation_status] = React.useState(true);

  const [collapse_sidebar, set_collapse_sidebar] = React.useState(false);

  const [week_header_date_description_label, set_week_header_date_description_label] = React.useState('');

  React.useEffect(() => {
    let week_data_tmp = week_compose(yyyy, mm+1, dd);
    let start_date_arr = week_data_tmp[0]?.date.split('_');
    let end_date_arr = week_data_tmp[6]?.date.split('_');
    if (start_date_arr[0] != end_date_arr[0]) {
      let _st = `${month_dt[parseInt(start_date_arr[1]-1)].substr(0, 3)} ${start_date_arr[0]} - ${month_dt[parseInt(end_date_arr[1]-1)].substr(0, 3)} ${end_date_arr[0]}`
      set_week_header_date_description_label(_st);
    } else if (start_date_arr[1] !== end_date_arr[1]) {
      let _st = `${month_dt[parseInt(start_date_arr[1]-1)].substr(0, 3)} - ${month_dt[parseInt(end_date_arr[1]-1)].substr(0, 3)} ${end_date_arr[0]}`
      set_week_header_date_description_label(_st);
    } else if (start_date_arr[1] == end_date_arr[1]) {
      let _st = `${month_dt[parseInt(start_date_arr[1]-1)]} ${end_date_arr[0]}`
      set_week_header_date_description_label(_st);
    }
    set_week_dt(week_data_tmp);
  }, [yyyy, mm, dd])

  const events_test = {
    '2022_06_15': {
      981293: {
        id: 981293,
        user_id: 101,
        first_name: "Timothy",
        last_name: "Wong",
        initials: "TW",
        role: "tech",
        day: '15',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '8:00am',
        time_end: '2:00pm',
        time_elapsed: 6,
        note: 'It is your birthday !',
        start_date: '2022-06-15'
      },
      981292343: {
        id: 981292343,
        user_id: 101,
        first_name: "Timothy",
        last_name: "Wong",
        initials: "TW",
        role: "tech",
        day: '15',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '8:00am',
        time_end: '2:00pm',
        time_elapsed: 6,
        note: 'It is your birthday !',
        start_date: '2022-06-15'
      },
      9812938734: {
        id: 9812938734,
        user_id: 101,
        first_name: "Timothy",
        last_name: "Wong",
        initials: "TW",
        role: "tech",
        day: '15',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '8:00am',
        time_end: '2:00pm',
        time_elapsed: 6,
        note: 'It is your birthday !',
        start_date: '2022-06-15'
      },
      23748927: {
        id: 23748927,
        user_id: 102,
        first_name: "Benjamin",
        last_name: "Ng",
        initials: "BN",
        role: "pharmacist",
        day: '15',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '12:00am',
        time_end: '2:00pm',
        time_elapsed: 2,
        note: 'Test123',
        start_date: '2022-06-15'
      },
    },
    '2022_06_17': {
      981293: {
        id: 981293,
        user_id: 101,
        first_name: "Timothy",
        initials: "TW",
        last_name: "Wong",
        role: "tech",
        day: '17',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '8:00am',
        time_end: '2:00pm',
        time_elapsed: 6,
        note: 'It is your birthday !',
        start_date: '2022-06-17'
      },
      23748927: {
        id: 23748927,
        user_id: 102,
        first_name: "Ben",
        last_name: "Ng",
        initials: "BN",
        role: "pharmacist",
        day: '17',
        month: '06',
        year: '2022',
        time_specified: true,
        time_start: '12:00am',
        time_end: '2:00pm',
        time_elapsed: 2,
        note: 'Test123',
        start_date: '2022-06-17'
      }
    },
    '2022_07_08': {
      234235234234: {
        id: 234235234234,
        user_id: 101,
        first_name: "Timothy",
        last_name: "Wong",
        initials: "TW",
        role: "tech",
        day: '08',
        month: '07',
        year: '2022',
        time_specified: true,
        time_start: '12:00am',
        time_end: '2:00pm',
        time_elapsed: 4,
        note: 'Test123',
        start_date: '2022-07-08'
      }
    }
  }
  const [events, set_events] = React.useState(events_test);

  const individuals = [
    {
      first_name: "Timothy",
      last_name: "Wong",
      role: "tech",
      color: "purple",
      checked: true
    },
    {
      first_name: "Benjamin",
      last_name: "Ng",
      role: "pharmacist",
      color: "pink",
      checked: true
    },
    {
      first_name: "Anita",
      last_name: "Leung",
      role: "tech",
      color: "orange",
      checked: true
    },
    {
      first_name: "Glenn",
      last_name: "Balas",
      role: "pharmacist",
      color: "green",
      checked: true
    },
    {
      first_name: "Shasha",
      last_name: "He",
      role: "tech",
      color: "yellow",
      checked: true
    }
  ]

  const individuals_dt = {
    101: {
      user_id: 101,
      first_name: "Timothy",
      last_name: "Wong",
      role: "tech",
      color: "blue",
      checked: true
    },
    102: {
      user_id: 102,
      first_name: "Benjamin",
      last_name: "Ng",
      role: "pharmacist",
      color: "purple",
      checked: true
    },
    103: {
      user_id: 103,
      first_name: "Anita",
      last_name: "Leung",
      role: "tech",
      color: "orange",
      checked: true
    },
    104: {
      user_id: 104,
      first_name: "Glenn",
      last_name: "Balas",
      role: "pharmacist",
      color: "green",
      checked: true
    },
    105: {
      user_id: 105,
      first_name: "Shasha",
      last_name: "He",
      role: "tech",
      color: "yellow",
      checked: true
    }
  }

  //accordion
  const [calender_accordion_visibility, set_calender_accordion_visibility] = React.useState(true);
  const [checkmark1, set_checkmark1] = React.useState(true);
  const [checkmark2, set_checkmark2] = React.useState(true);

  const [calender_accordion_visibility2, set_calender_accordion_visibility2] = React.useState(true);
  const [individual_checkmarks, set_individual_checkmarks] = React.useState([...individuals]);
  const [individual_dt, set_individual_dt] = React.useState(individuals_dt);

  //holds for click and drag properties for large calender 
  const [click_hold, set_click_hold] = React.useState(false);
  const [click_start_object, set_click_start_object] = React.useState({});
  const [click_start_date, set_click_start_date] = React.useState(null);

  const [previous_hover_date, set_previous_hover_date] = React.useState(null);

  // a more enumerated version of calender state
  const [schedule_large_calender_open_status, set_schedule_large_calender_open_status] = React.useState(false);
  const [schedule_week_calender_open_status, set_schedule_week_calender_open_status] = React.useState(false);
  const [schedule_timesheet_calender_open_status, set_schedule_timesheet_calender_open_status] = React.useState(true);

  // the state of the calender: month, weekly, or timesheet by dropdown
  const [chosen_calender_state, set_chosen_calender_state] = React.useState('Timesheet');

  const [timesheet_individual_dropdown_open, set_timesheet_individual_dropdown_open] = React.useState(false);
  const [timesheet_individual_dropdown_state, set_timesheet_individual_dropdown_state] = React.useState();
  /**
   * State for timsheet
   * True: first half of the month [1,15] (inclusive)
   * False: rest of the month [16, end] (inclusive)
   */
  const [timesheet_first_half_month, set_timesheet_first_half_month] = React.useState((dd >= 16) ? false : true);

  // array of dates
  const [date_array, set_date_array] = React.useState({});

  const [new_event_start_time, set_new_event_start_time] = React.useState('9:00am');
  const [new_event_end_time, set_new_event_end_time] = React.useState('9:00am'); 
  const [new_event_elapsed_time, set_new_event_elapsed_time] = React.useState(0);
  const calculate_elapsed_time = () => {
    const date1 = new Date("08-05-2022 "+ _12_to_24_hour(new_event_start_time) );
    const date2 = new Date("08-05-2022 "+ _12_to_24_hour(new_event_end_time) );
    const diff = date2.getTime() - date1.getTime();
    let msec = diff;
    set_new_event_elapsed_time(msec / 1000 / 60 / 60);
  } 
  React.useEffect(() => {
    calculate_elapsed_time();
    // const date1 = new Date("08-05-2022 "+ _12_to_24_hour(new_event_start_time) );
    // const date2 = new Date("08-05-2022 "+ _12_to_24_hour(new_event_end_time) );
    // const diff = date2.getTime() - date1.getTime();
    // let msec = diff;
    // set_new_event_elapsed_time(msec / 1000 / 60 / 60);
  }, [new_event_start_time, new_event_end_time])


  const onMouseDown_bubble_handler = (e, date, calender_event_object, idx) => {
    set_click_hold(true);
    // console.log(date, e, calender_event_object, idx);
    set_click_start_object(calender_event_object);
    set_click_start_date(date);
    
    set_previous_hover_date(date);
  }

  const onMouseOver_bubble_handler = (e, date:string) => {
    if (!click_hold) return; 
    if (previous_hover_date && set_click_start_object) {
      let id = click_start_object?.id;
      let new_events = { ...events };
      if (events[previous_hover_date][id]) {
        delete events[previous_hover_date][id];
        if (new_events[date]) {
          new_events[date][id] = {...click_start_object};
        } else {
          new_events[date] = {};
          new_events[date][id] = {...click_start_object};
        }
      }
      set_events(new_events);
      
    }
    set_previous_hover_date(date);
  }

  const onMouseUp_bubble_handler = (e) => {
    set_click_hold(false);
  }

  // new timesheet row
  const [new_timesheet_date, set_new_timesheet_date] = React.useState(new Date()); 
  const [new_timesheet_status, set_new_timesheet_status] = React.useState(false);
  
  //upmouse click event 
  React.useEffect(() => {
    const mouseup_callback = () => set_click_hold(false);

    window.addEventListener("onmouseup", mouseup_callback);
    return () => {
      window.removeEventListener("onmouseup", mouseup_callback);
    };
  }, [])

  const [create_dropdown_status, set_create_dropdown_status] = React.useState(false);
  

  React.useEffect(() => {
    set_full_year_calender(computeCalender(year));
  }, [year]);

  React.useEffect(() => {
    set_mini_full_year_calender(computeCalender(mini_calender_year))
  }, [mini_calender_year])

  // click handlers for large calender
  const left_month_click_handler = (event:any) => {
    if (chosen_calender_state == 'Week') {
      let tmp_date = new Date(yyyy, mm, dd-7);
      set_yyyy(tmp_date.getFullYear());
      set_mm(tmp_date.getMonth());
      set_dd(tmp_date.getDate());
      set_mini_calender_month(tmp_date.getMonth());
      set_mini_calender_year(tmp_date.getDate());
    } else if (chosen_calender_state == 'Timesheet') {
      if (timesheet_first_half_month == false) {
        set_timesheet_first_half_month(true);
      } else if (month == 0 && timesheet_first_half_month == true) {
        set_month(11);
        set_year(year - 1);
        set_mini_calender_month(11);
        set_mini_calender_year(year - 1);
        set_timesheet_first_half_month(false);
      } else if (month > 0 && timesheet_first_half_month == true) {
        set_month(month - 1);
        set_year(year);
        set_mini_calender_month(month - 1);
        set_mini_calender_year(year);
        set_timesheet_first_half_month(false);
      }
      set_mini_full_year_calender(full_year_calender);
      set_animation_status(true);
    } else {
      if (month == 0) {
        set_month(11);
        set_year(year - 1);
        set_mini_calender_month(11);
        set_mini_calender_year(year - 1);
      } else {
        set_month(month - 1);
        set_mini_calender_month(month - 1);
        set_mini_calender_year(year);
      }
      set_mini_full_year_calender(full_year_calender);
      set_animation_status(true);
    }
    
  }

  const right_month_click_handler = (event:any) => {
    if (chosen_calender_state == 'Week') {
      let tmp_date = new Date(yyyy, mm, dd+7);
      set_yyyy(tmp_date.getFullYear());
      set_mm(tmp_date.getMonth());
      set_dd(tmp_date.getDate());
      set_mini_calender_month(tmp_date.getMonth());
      set_mini_calender_year(tmp_date.getDate());
    } else if (chosen_calender_state == 'Timesheet') {
      if (timesheet_first_half_month == true) {
        set_timesheet_first_half_month(false);
      } else if (month == 11 && timesheet_first_half_month == false) {
        set_month(0);
        set_year(year + 1);
        set_mini_calender_month(0);
        set_mini_calender_year(year + 1);
        set_timesheet_first_half_month(true);
      } else if (month < 11 && timesheet_first_half_month == false) {
        set_month(month + 1);
        set_mini_calender_month(month + 1);
        set_mini_calender_year(year);
        set_timesheet_first_half_month(true);
      }
      set_mini_full_year_calender(full_year_calender);
      set_animation_status(true);
    } else {
      if (month == 11) {
        set_month(0);
        set_year(year + 1);
        set_mini_calender_month(0);
        set_mini_calender_year(year + 1);
      } else {
        set_month(month + 1);
        set_mini_calender_month(month + 1);
        set_mini_calender_year(year);
      }
      set_mini_full_year_calender(full_year_calender);
      set_animation_status(true);
    }
    
  }

  //click handlers for mini calenders
  const left_mini_month_click_handler = (event:any) => {
    if (mini_calender_month == 0) {
      set_mini_calender_month(11);
      set_mini_calender_year(mini_calender_year - 1)
    } else {
      set_mini_calender_month(mini_calender_month - 1);
    }
  }

  const right_mini_month_click_handler = (event:any) => {
    if (mini_calender_month == 11) {
      set_mini_calender_month(0);
      set_mini_calender_year(mini_calender_year + 1);
    } else {
      set_mini_calender_month(mini_calender_month + 1);
    }
  }

  const animation_end = () => {
    set_animation_status(false);
  }

  const animation_start = () => {
    set_animation_status(true);
  }

  const today_button_click_handler = () => {
    set_year(yyyy);
    set_mini_calender_year(yyyy);
    set_month(mm);
    set_mini_calender_month(mm);
  }

  const [draggable_div_open, set_draggable_div_open] = React.useState(true);
  const is_dragging = React.useRef(false);
  const drag_parent_ref = React.useRef<any | null>();
  const drag_head_ref = React.useRef();
  const [x_delta, set_x_delta] = React.useState();
  const [y_delta, set_y_delta] = React.useState();
  const [x_parent, set_x_parent] = React.useState();
  const [y_parent, set_y_parent] = React.useState();
  const [drag_x_pos, set_drag_x_pos] = React.useState('');
  const [drag_y_pos, set_drag_y_pos] = React.useState('');

  const onMouseDown_drag = React.useCallback(e => {
    if (drag_head_ref.current && drag_head_ref.current.contains(e.target)) {
      is_dragging.current = true;
      if (drag_parent_ref) {
        set_x_parent(drag_parent_ref.current.offsetLeft);
        set_y_parent(drag_parent_ref.current.offsetTop);
        set_x_delta(e.clientX - drag_parent_ref.current.offsetLeft);
        set_y_delta(e.clientY - drag_parent_ref.current.offsetTop);
      }
      
    }
  }, []);

  const onMouseUp_drag = React.useCallback(() => {
    if (is_dragging.current) {
      is_dragging.current = false;
    }
  }, []);

  const onMouseMove_drag = React.useCallback(e => {
    if (is_dragging.current) {
      set_drag_y_pos(e.clientY - y_delta);
      set_drag_x_pos(e.clientX - x_delta);
      // console.log(height, width);
    }
  }, [x_delta, y_delta]);

  React.useEffect(() => {
    set_draggable_div_open(false);
  }, [height, width]);

  //draggable mousedown event
  React.useEffect(() => {
      
    document.addEventListener("mouseup", onMouseUp_drag);
    document.addEventListener("mousedown", onMouseDown_drag);
    document.addEventListener("mousemove", onMouseMove_drag);
    return () => {
      document.removeEventListener("mouseup", onMouseUp_drag);
      document.removeEventListener("mousedown", onMouseDown_drag);
      document.removeEventListener("mousemove", onMouseMove_drag);
    }
  }, [onMouseUp_drag, onMouseDown_drag, onMouseMove_drag]);


  React.useEffect(() => {
    if (chosen_calender_state == 'Month') {
      set_schedule_large_calender_open_status(true);
      set_schedule_week_calender_open_status(false);
      set_schedule_timesheet_calender_open_status(false);
    } else if (chosen_calender_state == 'Week') {
      set_schedule_large_calender_open_status(false);
      set_schedule_week_calender_open_status(true);
      set_schedule_timesheet_calender_open_status(false);
    } else if (chosen_calender_state == 'Timesheet') {
      set_schedule_large_calender_open_status(false);
      set_schedule_week_calender_open_status(false);
      set_schedule_timesheet_calender_open_status(true);
    } else {
      set_schedule_large_calender_open_status(true);
      set_schedule_week_calender_open_status(false);
      set_schedule_timesheet_calender_open_status(false);
    }
  }, [chosen_calender_state])

  React.useEffect(() => {
    if (draggable_div_open) {
      drag_parent_ref?.current?.focus();
    }
  }, [draggable_div_open])

  const pad_integer_with_zeros = (num:number | string, targetLength:number) => {
    return String(num).padStart(targetLength, '0');
  }

  React.useEffect(() => {
    set_numberOfDays_val(numberOfDays(month, year))
  }, [month, year]);


  const range = (start:number, stop:number, step:number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

  const onChange_datepicker_handler = (event_day_string, event_day_id, new_date) => {
    // console.log(event_day_string, event_day_id, new_date);
    set_events(current => {
      return {
        ...current,
        [event_day_string]: {
          ...current[event_day_string],
          [event_day_id]: {
            ...current[event_day_string][event_day_id],
            start_date: new_date
          }
        }
      }
    })
    // console.log(events);
  }

  const delete_event_entry = (event_day_string, event_day_id) => {
    set_events(current => {
      const items = Object.fromEntries(Object.entries(current[event_day_string]).filter(([k,v]) => k != event_day_id));
      console.log(items)
      return {
        ...current,
        [event_day_string]: items,
      }
    })
  }

  return (
    <>
      <Sidebar selected={'schedule'}/>

      { draggable_div_open && 
        <div className="calender_draggable_div" ref={drag_parent_ref} 
          style={{
            top: `${drag_y_pos}px`,
            left: `${drag_x_pos}px`
          }}
          tabIndex={0}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) { 
              // set_draggable_div_open(false);
            }
          }}
        > 
          <div className="calender_draggable_frame" ref={drag_head_ref}>
            <div className="draggable_close_div" onClick={() => set_draggable_div_open(false)}>
              <Close_Icon height="10px" width="10px" fill="white"/>
            </div>
          </div>
          
          <div className="calender_draggable_content">
            <div className="calender_draggable_content_row">
              <div className="calender_draggable_content_left">
                {/* <Users_Icon height="15px" width="15px" fill="white"/> */}
              </div>
              <div className="calender_draggable_content_right drag_header_div">
                <h2> Create Event </h2>
              </div>
            </div>
            <div className="calender_draggable_content_row">
                <div className="calender_draggable_content_left">
                  <Users_Icon height="15px" width="15px" fill="white"/>
                </div>
                <div className="calender_draggable_content_right">
                  <select className="draggable_user_select">
                    { individuals.map((dt_entry, idx) => {
                      return (
                        <option value={`${dt_entry.first_name} ${dt_entry.last_name}`}> {dt_entry.first_name} {dt_entry.last_name} </option>
                      )
                    }) }
                  </select>
                </div>
            </div>
            <div className="calender_draggable_content_row">
                <div className="calender_draggable_content_left">
                  <Clock_Icon height="15px" width="15px" fill="white"/>
                </div>
                <div className="calender_draggable_content_right">
                  <div className="div_calender_draggable_content_right">
                    <p className="start_style">Start </p> 
                    <TimePicker value={new_event_start_time} set_time={set_new_event_start_time} reg={true} />
                  </div>
                  <div className="div_calender_draggable_content_right">
                    <p className="end_style"> End </p> 
                    <TimePicker value={new_event_end_time} set_time={set_new_event_end_time} reg={true} />
                  </div>
                  <div className="div_calender_draggable_content_right">
                    <p className="p_elapsed_time"> Time Elapsed </p> 
                    <div className="div_calender_draggable_elapsed_time"> 
                      { new_event_elapsed_time }
                      {" hours"} 
                    </div>
                  </div>
                </div>
            </div>
            <div className="calender_draggable_content_row">
                <div className="calender_draggable_content_left">
                  <Description_Icon height="15px" width="15px" fill="white"/>
                </div>
                <div className="calender_draggable_content_right">
                  <span className="textarea" role="textbox" placeholder={"Optional Notes"} contentEditable></span>
                </div>
            </div>
            <div className="calender_draggable_submit_row"> 
              <button className="draggable_save_button"> Save </button>
            </div>

          </div>
        </div>
      }

      <div className="div_schedule">
        <div className="div_main">
          <div className="schedule_topheader">
              <div className="menu_burger_icon" onClick={() => set_collapse_sidebar(!collapse_sidebar)}>
                <MenuBurger_Icon fill="white" width={15} height={15}/>
              </div>
              <h1>Calender</h1>
              <button className="today_button" 
                onClick={today_button_click_handler} 
              > 
                Today 
              </button>
              <div className='left_arrow' onClick={left_month_click_handler}>
                <Left_Icon fill="white" width={13} height={13}/>
              </div>
              <div className='right_arrow' onClick={right_month_click_handler}>
                <Right_Icon fill="white" width={13} height={13}/> 
              </div>
              { (chosen_calender_state != "Week") &&
                <h2 className="div_description" > 
                  { month_dt[month] } {year} 
                  {(chosen_calender_state == "Timesheet" && timesheet_first_half_month) ? " [1 - 15]" : ""} 
                  {(chosen_calender_state == "Timesheet" && !timesheet_first_half_month) ? ` [16 - ${numberOfDays_val}]` : ""} 
                </h2>
              }

              { (chosen_calender_state == "Week") &&
                <h2 className="div_description">
                  { week_header_date_description_label }
                  {/* {month_dt[parseInt(week_dt[0]?.date?.split('_')[1])]}   */}
                </h2>
              }
              <div className="schedule_dropdown">
                <Dropdown chosen={chosen_calender_state} set_chosen={set_chosen_calender_state} />
              </div>
          </div>
          <div className="schedule_content">
            <div className={`create_div ${collapse_sidebar ? "add_icon_transition" : ""}`}
              tabIndex={1}
              onClick={() => {
                set_create_dropdown_status(!create_dropdown_status)
              } }
              onBlur={() => set_create_dropdown_status(false)}
            >
              <Plus_Icon width={20} height={20} fill={"white"} />
              <div className={`create_description ${collapse_sidebar ? "create_description_transition" : ""}`} >
                {!collapse_sidebar ? "Create" : ""}
                <div className={`create_dropdown ${create_dropdown_status ? '' : 'create_dropdown_collapse'} `}
                > 
                  <div className='create_dropdown_options' onClick={() => set_draggable_div_open(true)} > Event </div>
                  <div className='create_dropdown_options'> New User </div>
                </div>
              </div> 
            </div>
            <div className={`schedule_left_sidebar ${collapse_sidebar ? 'collapse_sidebar' : ''}`}>
              <div className="left_sidebar_inner_div">
                
                <div className="mini_calender_title">
                  <div>
                    { month_dt[mini_calender_month] } {mini_calender_year}
                  </div>
                  <div className="mini_arrows">
                    <div className='mini_left_arrow' onClick={left_mini_month_click_handler}>
                      <Left_Icon fill="white" width={13} height={13}/> 
                    </div>
                    <div className='mini_right_arrow' onClick={right_mini_month_click_handler}>
                      <Right_Icon fill="white" width={13} height={13}/> 
                    </div>
                  </div>
                </div>
                <div className="mini_calender">

                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((value, idx) => {
                    return (
                      <div className={`mini_calender_day_titles`}>
                        {value}
                      </div>
                    )
                  })
                  }

                  {mini_full_year_calender[month_dt[mini_calender_month]].map((value, idx) => {
                    return (
                      <div className={`mini_schedule_day 
                                ${value?.background ? 'lighter_date_color' : ''} 
                                ${((yyyy == year) && (value.date == dd) && (value.month == mm)) ? "mini_calender_today" : ""}
                            `}>
                        <div className={`${((yyyy == year) && (value.date == dd) && (value.month == mm)) ? "mini_schedule_focus_date" : ""}`}>{value.date}</div>
                      </div>
                    )
                  })}

                </div>

                <div className="calender_accordion" onClick={() => set_calender_accordion_visibility(!calender_accordion_visibility)}>
                  Role Selection 
                </div>
                { calender_accordion_visibility && 
                  <div className="calender_accordion_dropdown">
                    <div className="checkbox_div_container">
                      <Checkbox checked={checkmark1} onChange={() => set_checkmark1(!checkmark1)} color={"red"} description="Pharmacist" />
                    </div>
                    <div className="checkbox_div_container">
                      <Checkbox checked={checkmark2} onChange={() => set_checkmark2(!checkmark2)} color={"blue"} description="Tech" />
                    </div>
                  </div>
                }

                <div className="calender_accordion" onClick={() => set_calender_accordion_visibility2(!calender_accordion_visibility2)}>
                  Individual Selection
                </div>
                { calender_accordion_visibility2 && 
                  <div className="calender_accordion_dropdown">
                    { individual_checkmarks.map((obj, idx) => {
                        return (
                          <>
                            <div className="checkbox_div_container">
                              <Checkbox checked={obj?.checked} onChange={(event:Event) => {
                                let tmp = [...individual_checkmarks];
                                tmp[idx].checked = !tmp[idx].checked;
                                set_individual_checkmarks(tmp);
                              }} color={obj?.color} description={obj?.first_name} />
                            </div>
                          </>
                        )
                    }) }
                  </div>
                }

              </div>

            </div>
            { schedule_week_calender_open_status &&
              <div className="schedule_week_calender swc">
                <table>
                  <thead>
                    <tr className="red">
                      <th><div className="week_title_div week_left_top_corner"></div></th>
                      <th>
                        <div className="week_title_div">
                          <p>SUN</p>
                          <h2>{parseInt(week_dt[0]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>MON</p>
                          <h2>{parseInt(week_dt[1]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>TUE</p>
                          <h2>{parseInt(week_dt[2]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>WED</p>
                          <h2>{parseInt(week_dt[3]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>THU</p>
                          <h2>{parseInt(week_dt[4]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>FRI</p>
                          <h2>{parseInt(week_dt[5]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                      <th>
                        <div className="week_title_div">
                          <p>SAT</p>
                          <h2>{parseInt(week_dt[6]?.date?.split('_')[2])}</h2>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="week_tickers">
                          <div className="week_small_trim_ticker"> <div className="week_tickers_div_offset"> GMT-05 </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 1 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 2 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 3 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 4 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 5 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 6 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 7 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 8 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 9 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 10 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 11 AM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 12 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 1 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 2 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 3 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 4 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 5 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 6 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 7 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 8 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 9 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 10 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 11 PM </div> </div>
                          <div className="week_tickers_div"> <div className="week_tickers_div_offset"> 12 AM </div> </div>
                        </div>
                      </td>
                      {
                        week_dt.map((entry, idx) => {
                          // console.log(Object.values(events[entry?.date] ?? {}) );
                          // time_to_timesheet_conversion_dt
                          console.log(events[entry.date]);
                          // let top_px = time_to_timesheet_conversion_dt(events[entry.date]);
                          return (
                            <td>
                              <div className="week_large_div">
                                <div className="week_large_div_surface"> 
                                {/* week bars */}
                                  {Object.values(events[entry?.date] ?? {}).map((day_event, idx) => {
                                    let top_px = time_to_timesheet_conversion_dt[day_event.time_start]*25;
                                    let length_px = time_to_timesheet_conversion_dt[day_event.time_elapsed]*50;
                                    console.log(top_px);
                                    return (
                                      <div className="week_example_timeline" style={{ top: `${top_px}px`, height: `${length_px}px`, backgroundColor: 'rgba(255, 51, 51, 1)'}}></div>
                                    )
                                  })}
                                 
                                  <div className="week_example_timeline" style={{ top: '0px', height: '50px', backgroundColor: 'rgba(19, 166, 107, 0.3)'}}></div>
                                  <div className="week_example_timeline" style={{ top: '400px', height: '500px', backgroundColor: 'rgba(228, 54, 255, 0.3)'}}></div>
                                  
                                  <div className="week_example_timeline" style={{ top: '30px', height: '670px', backgroundColor: 'rgba(252, 153, 54, 0.3)'}}></div>
                                  <div className="week_example_timeline" style={{ top: '600px', height: '430px', backgroundColor: 'rgba(64, 54, 252, 0.3)'}}></div>
                                  <div className="week_example_timeline" style={{ top: '20px', height: '590px', backgroundColor: 'rgba(207, 255, 16, 0.3)'}}></div>
                                  
                                </div> 
                                <div className="week_small_trim"> </div>
                                { [...Array(24)].map(() => {
                                    return (
                                      <div className="week_small_div"> </div>
                                    )
                                  }) }
                              </div>
                            </td>
                          )
                        })
                      }
                      {/* <td>
                        <div className="week_large_div">
                          <div className="week_large_div_surface"> 
            
                            <div className="week_example_timeline" style={{ top: '0px', height: '1175px', backgroundColor: 'rgba(255, 51, 51, 1)'}}></div>
                            <div className="week_example_timeline" style={{ top: '100px', height: '400px', backgroundColor: 'rgba(19, 166, 107, 0.3)'}}></div>
                            <div className="week_example_timeline" style={{ top: '400px', height: '500px', backgroundColor: 'rgba(228, 54, 255, 0.3)'}}></div>
                            
                            <div className="week_example_timeline" style={{ top: '30px', height: '670px', backgroundColor: 'rgba(252, 153, 54, 0.3)'}}></div>
                            <div className="week_example_timeline" style={{ top: '600px', height: '430px', backgroundColor: 'rgba(64, 54, 252, 0.3)'}}></div>
                            <div className="week_example_timeline" style={{ top: '20px', height: '590px', backgroundColor: 'rgba(207, 255, 16, 0.3)'}}></div>
                            
                          </div> 
                          <div className="week_small_trim"> </div>
                          { [...Array(24)].map(() => {
                              return (
                                <div className="week_small_div"> </div>
                              )
                             }) }
                        </div>
                      </td>
                      <td>
                          <div className="week_large_div">
                            <div className="week_large_div_surface"> 
                              <div className="week_example_timeline" style={{ top: '0px', height: '300px', backgroundColor: 'rgba(255, 51, 51, 0.3)'}}></div>
                              <div className="week_example_timeline" style={{ top: '100px', height: '400px', backgroundColor: 'rgba(19, 166, 107, 0.3)'}}></div>
                              <div className="week_example_timeline" style={{ top: '400px', height: '500px', backgroundColor: 'rgba(228, 54, 255, 0.3)'}}></div>
                              
                              <div className="week_example_timeline" style={{ top: '30px', height: '670px', backgroundColor: 'rgba(252, 153, 54, 0.3)'}}></div>
                              <div className="week_example_timeline" style={{ top: '600px', height: '430px', backgroundColor: 'rgba(64, 54, 252, 0.3)'}}></div>
                              <div className="week_example_timeline" style={{ top: '20px', height: '590px', backgroundColor: 'rgba(207, 255, 16, 0.3)'}}></div>
                              
                            </div> 
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td>
                      <td>
                        <div className="week_large_div">
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td>
                      <td>
                        <div className="week_large_div">
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td>
                      <td>
                        <div className="week_large_div">
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td>
                      <td>
                        <div className="week_large_div">
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td>
                      <td>
                        <div className="week_large_div">
                          <div className="week_small_div week_small_trim"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                          <div className="week_small_div"> </div>
                        </div>
                      </td> */}
                    </tr>
                    

                  </tbody>
                </table>
              </div>
            }

            { schedule_timesheet_calender_open_status && 
              <div className="schedule_timesheet_calender stc">
  
                
                <div className="timesheet_vertical_divider">
                  <div className="timesheet_left_division">
                    <div className="timesheet_head_selections">
                      <div className="timesheet_individual_dropdown" 
                        tabIndex={0}
                        onClick={() => set_timesheet_individual_dropdown_open(!timesheet_individual_dropdown_open)}
                        onBlur={() => set_timesheet_individual_dropdown_open(false)}  
                      > 
                        {timesheet_individual_dropdown_state}
                        <div className={`timesheet_individual_dropdown_choices ${timesheet_individual_dropdown_open ? 'timesheet_individual_dropdown_choices_open' : ''}`}> 
                          { Object.entries(individuals_dt).map((entry, idx) => {
                            // console.log(entry)
                            return (
                              <div className="timesheet_individual_dropdown_options" onClick={() => set_timesheet_individual_dropdown_state(`${entry[1].first_name} ${entry[1].last_name}`)}>
                                {entry[1].first_name} {entry[1].last_name}
                              </div>
                            )
                          }) }
                          
                      </div>
                    </div>
                    <div className="save_individual_timesheet_button_wrapper">
                        
                      </div>
                    </div>

                    { (timesheet_first_half_month ? range(1, 15, 1) : range(16, Number(numberOfDays_val), 1)).map((day_value, idx) => { 
                      let day_string = pad_integer_with_zeros(year, 2) + '_' +
                                        pad_integer_with_zeros(month+1, 2) + '_' + 
                                        pad_integer_with_zeros(day_value, 2);
                      // console.log(day_string);
                      // console.log(events[day_string]); 
                      let day = events[day_string];
                      if (day) {
                        // console.log(Object.values(day));
                        return Object.values(day).map((event, idx) => {
                          // console.log(timesheet_individual_dropdown_state);
                          // console.log(`${event.first_name} ${event.last_name}`);
                          if (timesheet_individual_dropdown_state == `${event.first_name} ${event.last_name}`) {
                            // console.log(event);
                            // set_date_array({
                            //   ...date_array,
                            //   [event.id]: {
                            //     "id" : event.id,
                            //     "time_start" : event.time_start,
                            //     "time_end" : event.time_end
                            //   }
                            // })
                            // console.log(day[event.id]);
                        
                            const date1 = new Date("08-05-2022 "+ _12_to_24_hour(day[event.id].time_start) );
                            const date2 = new Date("08-05-2022 "+ _12_to_24_hour(day[event.id].time_end) );
                            const diff = date2.getTime() - date1.getTime();
                            let msec = diff;
                            const hh = msec / 1000 / 60 / 60;
                            // console.log(hh);

                            return (
                            // timesheet_individual_dropdown_state
                              <div key={event.id} className="timesheet_row">
                                <div className="timesheet_row_date">
                                    <DatePicker 
                                      selected={new Date(day[event.id].start_date)} 
                                      onChange={(new_date) => onChange_datepicker_handler(day_string, event.id, new_date)}
                                      autocomplete={true}
                                    />
                                </div>
                                <div className="timesheet_row_start_end"> 
                                  <div className="timesheet_row_start_end_denotation">
                                    <div className="timesheet_start">
                                      <div className="timesheet_start_inner_div"> Start </div>
                                    </div>
                                    <div className="timesheet_end">
                                      <div className="timesheet_end_inner_div"> End </div>
                                    </div>
                                  </div>
                                  <div className="timesheet_row_start_end_times">
                                    <div className="timesheet_start_data">
                                      <TimePicker value={day[event.id].time_start} set_events={set_events} day_string={day_string} event_id={event.id} start={true}/>
                                    </div>
                                    <div className="timesheet_end_data">
                                      <TimePicker value={day[event.id].time_end} set_events={set_events} day_string={day_string} event_id={event.id} start={false}/>
                                    </div> 
                                  </div>
                                </div>
                                <div className="timesheet_row_total_time">
                                  <div className="div_inner_timesheet_row_total_time">
                                    {hh} hrs
                                  </div>
                                </div>
                                <div className="timesheet_row_options"> 
                                  <div className="timesheet_row_options_delete"
                                    onClick={() => delete_event_entry(day_string, event.id)}
                                  >
                                    <Close_Icon fill={'white'} height={'10px'} width={'10px'} />
                                  </div>
                                </div>
                              </div>
                            )
                          }
                        }
                        )
                      }
                
                    })}
                  </div>
                  <div className="timesheet_right_division">
                    <div className="div_timesheet_right_division_content">
                      <p> • <strong>Notice</strong>: All changes including event creation alterations, deletions, are logged. </p>
                      <p> • All changes are automatically saved. 
                        Changes are SUCCESSFUL as long as there there 
                        is a green status bar and shows RED if unsuccessful. </p> 
                      <p> • Reasons for an UNSUCCESSFUL save includes: </p>
                        <ul className='bullet_points'>
                          <li> Negative hours </li>
                          <li> An invalid date </li>  
                          <li> Loss of internet </li>  
                        </ul>
                    </div>
                  </div>
                </div>
              </div>

            }

            { schedule_large_calender_open_status &&
              <div className={`schedule_large_calender ${animation_status ? 'calender_animation' : ''}`}
                onAnimationEnd={animation_end}
                onAnimationStart={animation_start}
              >
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((value, idx) => {
                  return (
                    <div className={`calender_day_titles `}>
                      {value}
                    </div>
                  )
                })
                }

                {full_year_calender[month_dt[month]].map((value, idx) => {
                  // console.log( `${year}_${value.month}_${value.date}` );
                  return (
                    <div className={`schedule_day ${value?.background ? 'lighter_date_color' : ''}`}
                      onMouseOver={(e) => onMouseOver_bubble_handler(e, `${year}_${pad_integer_with_zeros(value.month+1, 2)}_${pad_integer_with_zeros(value.date, 2)}`)}
                      onMouseUp={(e) => onMouseUp_bubble_handler(e)}
                      onClick={() => set_draggable_div_open(true)}
                    > 
                      {/* date number */}
                      <div className={`large_calender_date ${((yyyy == year) && (value.date == dd) && (value.month == mm)) ? "large_calender_today" : ""}`}
                      > 
                      {/* tooltip for "today's" date */}
                      { ((yyyy == year) && (value.date == dd) && (value.month == mm)) &&
                        <div className="today_tooltip">
                          <span className="today_tooltip_text">Today</span>
                        </div>
                      } 
                        {value.date} 
                      </div>
                      <div className="large_calender_bubbles_wrapper">
                        { Object.values(events[`${year}_${pad_integer_with_zeros(value.month+1, 2)}_${pad_integer_with_zeros(value.date, 2)}`] ?? {}).map((calender_event, calender_event_idx) => {
                            return (
                              <div className="name_bubbles" 
                                onMouseDown={(e) => onMouseDown_bubble_handler(e, `${year}_${pad_integer_with_zeros(value.month+1, 2)}_${pad_integer_with_zeros(value.date, 2)}`, calender_event, calender_event_idx)}
                                style={{ backgroundColor: individual_dt[calender_event?.user_id]?.color }}
                              >
                                {calender_event?.initials}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            }
          </div>

        </div>

      </div>

    </>
  )
}

export default Schedule