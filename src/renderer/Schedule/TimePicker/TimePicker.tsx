import * as React from 'react';
import './TimePicker.scss';

function TimePicker(props:any) {
  const {
    onClick = () => {},
    value = ''
  } = props;
  return (
    <div className='time_selection'> 9am 
      <div className='time_selection_dropdown'> 
        <div className='time_selection_dropdown_item'> 12:00am </div>
        <div className='time_selection_dropdown_item'> 12:30am </div>
        <div className='time_selection_dropdown_item'> 1:00am </div>
        <div className='time_selection_dropdown_item'> 1:30am </div>
        <div className='time_selection_dropdown_item'> 2:00am </div>
        <div className='time_selection_dropdown_item'> 2:30am </div>
        <div className='time_selection_dropdown_item'> 3:00am </div>
        <div className='time_selection_dropdown_item'> 3:30am </div>
        <div className='time_selection_dropdown_item'> 4:00am </div>
        <div className='time_selection_dropdown_item'> 4:30am </div>
        <div className='time_selection_dropdown_item'> 5:00am </div>
        <div className='time_selection_dropdown_item'> 5:30am </div>
        <div className='time_selection_dropdown_item'> 6:00am </div>

        <div className='time_selection_dropdown_item'> 6:30am </div>
        <div className='time_selection_dropdown_item'> 7:00am </div>
        <div className='time_selection_dropdown_item'> 7:30am </div>
        <div className='time_selection_dropdown_item'> 8:30am </div>
        <div className='time_selection_dropdown_item'> 9:00am </div>
        <div className='time_selection_dropdown_item'> 9:30am </div>
        <div className='time_selection_dropdown_item'> 10:30am </div>
        <div className='time_selection_dropdown_item'> 11:00am </div>
        <div className='time_selection_dropdown_item'> 11:30am </div>
        <div className='time_selection_dropdown_item'> 12:00pm </div>
        <div className='time_selection_dropdown_item'> 12:30pm </div>
        <div className='time_selection_dropdown_item'> 1:00pm </div>
        <div className='time_selection_dropdown_item'> 1:30pm </div>
        <div className='time_selection_dropdown_item'> 2:00pm </div>

        <div className='time_selection_dropdown_item'> 2:30pm </div>
        <div className='time_selection_dropdown_item'> 3:00pm </div>
        <div className='time_selection_dropdown_item'> 3:30pm </div>
        <div className='time_selection_dropdown_item'> 4:00pm </div>
        <div className='time_selection_dropdown_item'> 4:30pm </div>
        <div className='time_selection_dropdown_item'> 5:00pm </div>
        <div className='time_selection_dropdown_item'> 5:30pm </div>
        <div className='time_selection_dropdown_item'> 6:00pm </div>
        <div className='time_selection_dropdown_item'> 6:30pm </div>
        <div className='time_selection_dropdown_item'> 7:00pm </div>
        <div className='time_selection_dropdown_item'> 7:30pm </div>
        <div className='time_selection_dropdown_item'> 8:30pm </div>
        <div className='time_selection_dropdown_item'> 9:00pm </div>

        <div className='time_selection_dropdown_item'> 9:30pm </div>
        <div className='time_selection_dropdown_item'> 10:00pm </div>
        <div className='time_selection_dropdown_item'> 10:30pm </div>
        <div className='time_selection_dropdown_item'> 11:00pm </div>
        <div className='time_selection_dropdown_item'> 11:30pm </div>

      </div>
    </div>
  )
}

export default TimePicker