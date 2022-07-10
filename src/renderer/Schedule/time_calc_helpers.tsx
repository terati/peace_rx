
let time_dt = {
  '12:00am' : '00:00',
  '12:30am' : '00:30',
  '1:00am' : '01:00',
  '1:30am' : '01:30',
  '2:00am' : '02:00',
  '2:30am' : '02:30',
  '3:00am' : '03:00',
  '3:30am' : '03:30',
  '4:00am' : '04:00',
  '4:30am' : '04:30',
  '5:00am' : '05:00',
  '5:30am' : '05:30',
  '6:00am' : '06:00',

  '6:30am' : '06:30',
  '7:00am' : '07:00',
  '7:30am' : '07:30',
  '8:00am' : '08:00',
  '8:30am' : '08:30',
  '9:00am' : '09:00',
  '9:30am' : '09:30',
  '10:30am' : '10:00',
  '11:00am' : '10:30',
  '11:30am' : '11:30',
  '12:00pm' : '12:00',
  '12:30pm' : '12:30',
  '1:00pm' : '13:00',
  '1:30pm' : '13:30',
  '2:00pm' : '14:00',

  '2:30pm' : '14:30',
  '3:00pm' : '15:00',
  '3:30pm' : '15:30',
  '4:00pm' : '16:00',
  '4:30pm' : '16:30',
  '5:00pm' : '17:00',
  '5:30pm' : '17:30',
  '6:00pm' : '18:00',
  '6:30pm' : '18:30',
  '7:00pm' : '19:00',
  '7:30pm' : '19:30',
  '8:30pm' : '20:00',
  '9:00pm' : '20:30',

  '9:30pm' : '21:00',
  '10:00pm' : '21:30',
  '10:30pm' : '22:00',
  '11:00pm' : '22:30',
  '11:30pm' : '23:00'
}

const _12_to_24_hour = (time:string) => {
  return time_dt[time];
} 

export { _12_to_24_hour }
