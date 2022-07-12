

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