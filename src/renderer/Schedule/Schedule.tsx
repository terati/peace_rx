import * as React from 'react';
import './schedule.css';
import Sidebar from 'renderer/Sidebar/Sidebar';
import { computeCalender } from './calender_calc';
import MenuBurger_Icon from '../Icons_Color_Control/Menu_burger';
import Left_Icon from '../Icons_Color_Control/Left_Arrow';
import Right_Icon from '../Icons_Color_Control/Right_Arrow';
import Plus_Icon from '../Icons_Color_Control/Plus';

import { Checkbox } from './Checkbox';

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
  let today = new Date();
  const [dd, set_dd] = React.useState(today.getDate());
  const [mm, set_mm] = React.useState(today.getMonth());
  const [yyyy, set_yyyy] = React.useState(today.getFullYear()); 
  const [full_year_calender, set_full_year_calender] = React.useState(computeCalender(yyyy));
  // console.log(full_year_calender);

  const [day, set_day] = React.useState(dd);
  const [month, set_month] = React.useState(mm);
  const [year, set_year] = React.useState(yyyy);

  const [mini_full_year_calender, set_mini_full_year_calender] = React.useState(full_year_calender);
  const [mini_calender_day, set_mini_calender_day] = React.useState(dd);
  const [mini_calender_month, set_mini_calender_month] = React.useState(mm);
  const [mini_calender_year, set_mini_calender_year] = React.useState(yyyy);

  const [animation_status, set_animation_status] = React.useState(true);

  const [collapse_sidebar, set_collapse_sidebar] = React.useState(false);

  const events_test = {
    '15_5_2022': {
      981293: {
        id: 981293,
        user_id: 101,
        first_name: "Timothy",
        last_name: "Wong",
        initials: "TW",
        role: "tech",
        day: 6,
        month: 0,
        year: 2022,
        time_specified: true,
        time_start: '8am',
        time_end: '12pm',
        note: 'It is your birthday !'
      },
      23748927: {
        id: 23748927,
        user_id: 102,
        first_name: "Ben",
        last_name: "Ng",
        initials: "BN",
        role: "pharmacist",
        day: 6,
        month: 1,
        year: 2022,
        time_specified: true,
        time_start: '12am',
        time_end: '12pm',
        note: 'Test123'
      },
    },
    '6_0_2022': {
      981293: {
        id: 981293,
        user_id: 101,
        first_name: "Timothy",
        initials: "TW",
        last_name: "Wong",
        role: "tech",
        day: 6,
        month: 1,
        year: 2022,
        time_specified: true,
        time_start: '8am',
        time_end: '12pm',
        note: 'It is your birthday !'
      },
      23748927: {
        id: 23748927,
        user_id: 102,
        first_name: "Ben",
        last_name: "Ng",
        initials: "BN",
        role: "pharmacist",
        day: 6,
        month: 1,
        year: 2022,
        time_specified: true,
        time_start: '12am',
        time_end: '12pm',
        note: 'Test123'
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

  const onMouseDown_bubble_handler = (e, date, calender_event_object, idx) => {
    set_click_hold(true);
    // console.log(date, e, calender_event_object, idx);
    set_click_start_object(calender_event_object);
    set_click_start_date(date);
    
    set_previous_hover_date(date);
  }

  const onMouseOver_bubble_handler = (e, date:string) => {
    if (!click_hold) return; 
    // console.log(click_hold);
    // console.log(click_hold, click_start_object);
    if (previous_hover_date && set_click_start_object) {
      let id = click_start_object?.id;
      // console.log(id);
        let new_events = { ...events };
      if (events[previous_hover_date][id]) {
        delete events[previous_hover_date][id];
        // console.log({...click_start_object});
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
    
    // if (click_hold) {

    // }
    // console.log(date);
  }

  const onMouseUp_bubble_handler = (e) => {
    set_click_hold(false);
  }

  
  //upmouse click event 
  React.useEffect(() => {
    const mouseup_callback = () => set_click_hold(false);

    window.addEventListener("onmouseup", mouseup_callback);
    return () => {
      window.removeEventListener("onmouseup", mouseup_callback);
    };
  }, [])

  React.useEffect(() => {
    set_full_year_calender(computeCalender(year));
  }, [year]);

  React.useEffect(() => {
    set_mini_full_year_calender(computeCalender(mini_calender_year))
  }, [mini_calender_year])

  // click handlers for large calender
  const left_month_click_handler = (event:any) => {
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

  const right_month_click_handler = (event:any) => {
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

  return (
    <>
      <Sidebar selected={'schedule'}/>
      <div className="div_schedule" >
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
              <h2 className="div_description" > { month_dt[month] } {year} </h2>
              
          </div>
          <div className="schedule_content">
            <div className={`create_div ${collapse_sidebar ? "add_icon_transition" : ""}`}>
              <Plus_Icon width={20} height={20} fill={"white"} />
              <div className={`create_description ${collapse_sidebar ? "create_description_transition" : ""}`} >
                {!collapse_sidebar ? "Create" : ""}
                <div className='create_dropdown'> 
                
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
                        {value.date}
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
                // console.log( `${value.date}_${value.month}_${year}` );
                return (
                  <div className={`schedule_day ${value?.background ? 'lighter_date_color' : ''}`}
                    onMouseOver={(e) => onMouseOver_bubble_handler(e, `${value.date}_${value.month}_${year}`)}
                    onMouseUp={(e) => onMouseUp_bubble_handler(e)}
                  > 
                    {/* date number */}
                    <div className={`large_calender_date ${((yyyy == year) && (value.date == dd) && (value.month == mm)) ? "large_calender_today" : ""}`}
                    > 
                    { ((yyyy == year) && (value.date == dd) && (value.month == mm)) &&
                      <div className="today_tooltip">
                        <span className="today_tooltip_text">Today</span>
                      </div>
                    } 
                      {value.date} 
                    </div>
                    <div className="large_calender_bubbles_wrapper">
                      { Object.values(events[`${value.date}_${value.month}_${year}`] ?? {}).map((calender_event, calender_event_idx) => {
                          return (
                            <div className="name_bubbles" 
                              onMouseDown={(e) => onMouseDown_bubble_handler(e, `${value.date}_${value.month}_${year}`, calender_event, calender_event_idx)}
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
          </div>
        </div>

      </div>

    </>
  )
}

export default Schedule