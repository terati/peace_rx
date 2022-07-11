
/*
*   Returns the index of the day of a certain date.
*   Index   Day
*   0       Sunday
*   1       Monday
*   ...     ...
*
*   The input date is standard. Ex: Jan 6, 2022 => dayNumber(6, 1, 2022)
*/
const dayNumber = (d:number, m:number, y:number):number => {
  let t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  y -= m < 3;
  return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + t[m-1] + d) % 7;
}

/*
*   Returns the number of days in a month. Months have a 0 index start.
*   Ex. January = 0
*/
const numberOfDays = (monthNumber:number, year:number) => {
  // January
  if (monthNumber == 0)
      return (31);
  // February
  if (monthNumber == 1)
  {
      // If the year is leap then February has
      // 29 days
      if (year % 400 == 0 ||
              (year % 4 == 0 && year % 100 != 0))
          return (29);
      else
          return (28);
  }
  if (monthNumber == 2 ||  // March
      monthNumber == 4 ||  // May
      monthNumber == 6 ||  // July
      monthNumber == 7 ||  // August
      monthNumber == 9 ||  // October
      monthNumber == 11) { // December
      return (31);
  } else if (monthNumber == 3  ||  // April
             monthNumber == 5  ||  // June
             monthNumber == 8  ||  // September
             monthNumber == 10 ) { // November
      return (30);
  }
}

const computeCalender = (year:number) => {
  let arr = [{
    month: "January",
  }, {
    month: "February",
  }, {
    month: "March",
  }, {
    month: "April",
  }, {
    month: "May",
  }, {
    month: "June",
  }, {
    month: "July",
  }, {
    month: "August",
  }, {
    month: "September",
  }, {
    month: "October",
  }, {
    month: "November",
  }, {
    month: "December",
  }]

  const arrayRange = (start:number, end:number, month:number) => {
    return Array(end - start + 1).fill(0).map((_, idx) => {
      return (
        {
          month: month,
          background: true,
          date: start + idx
        }
      )
    })
  }

  let ret_dt = {}
  let prevDays = numberOfDays(11, year - 1);
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    const monthly_day_number = dayNumber(1, i+1, year);
    let cnt = monthly_day_number;
    let ii = i - 1; 
    if (ii < 0) {
      ii = 11;
    }
    let range = arrayRange(prevDays - monthly_day_number+1, prevDays, ii);
    let month_number_of_days = numberOfDays(i, year);
    cnt += month_number_of_days;
    for (let j = 0; j < month_number_of_days; j++) {
      range.push({
        month: i,
        background: false,
        date: j + 1
      });
    }
    let remaining = 42 - cnt;
    for (let j = 0; j < remaining; j++) {
      range.push({
        month: (i+1)%12,
        background: true,
        date: j + 1
      });
    }
    ret_dt[arr[i]["month"]] = range;
  }
  return ret_dt;
}


const pad_integer_with_zeros = (num, targetLength) => {
  return String(num).padStart(targetLength, '0');
}

/*  
*   Returns an array of the current week based on inputted date.
*   In the format:
*   [
*     {
*       date: "2022_01_06"
*      
*     }
*   
*   ]
* 
* 
*
*/
const week_compose = (y:number|string, m:number|string, d:number|string) => {
  let arr = [...Array(7)];
  let dn = dayNumber(d, m, y);
  console.log(dn)
  let yy = y;
  let mm = m;
  let prevMonth_days = (m-2 < 0) ? numberOfDays(11) : numberOfDays(m-2);
  let currMonth_days = numberOfDays(m-1);
  let cnt = d; 
  let cnt_ahead = 1;
  // forward
  for (let i = dn; i < 7; i++) {
    if (cnt <= currMonth_days) {
      arr[i] = {
        date: `${y}_${pad_integer_with_zeros(m,2)}_${pad_integer_with_zeros(cnt,2)}}`
      }
      cnt++;
    } else {
      yy = (m == 12) ? y+1 : y; 
      mm = (m == 12) ? 1 : m+1;
      arr[i] = {
        date: `${yy}_${pad_integer_with_zeros(mm,2)}_${pad_integer_with_zeros(cnt_ahead,2)}}`
      }
      cnt_ahead++;
    }
  }
  // reverse
  let cnt_prev = prevMonth_days;
  cnt = d - 1;
  for (let i = dn-1; i >= 0; i--) {
    if (cnt > 0) {
      arr[i] = {
        date: `${y}_${pad_integer_with_zeros(m,2)}_${pad_integer_with_zeros(cnt,2)}}`
      }
      cnt--;
    } else {
      yy = (m == 1) ? y-1 : y;
      mm = (m == 1) ? 12 : m-1;
      arr[i] = {
        date: `${yy}_${pad_integer_with_zeros(mm,2)}_${pad_integer_with_zeros(cnt_prev,2)}}`
      }
      cnt_prev--;
    }
  }
  return arr;
}

export {
  dayNumber,
  numberOfDays,
  computeCalender,
  week_compose
}

