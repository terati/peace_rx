import { max } from 'lodash';
import * as React from 'react';
import './pagination.css';
import left_white_arrow from "./../../../../assets/generalIcons/left_arrow_white.png";
import right_white_arrow from "./../../../../assets/generalIcons/right_arrow_white.png";

import double_left_white_arrow from "./../../../../assets/generalIcons/angle-double-left-white.png";
import double_right_white_arrow from "./../../../../assets/generalIcons/angle-double-right-white.png";

const Pagination = React.forwardRef((props:any, ref) => {
  const {
    max,
    current,
    pagination_index, 
    set_pagination_index
  } = props;

  const size = 15;
  const double_size = 10;

  const ref_idx = React.useRef(1);
  const [state_idx, set_state_idx] = React.useState(1);


  const paginate_double_left_click_handler = () => {
    set_pagination_index(1);
  }

  const paginate_left_click_handler = () => {
    if (pagination_index > 1) {
      set_pagination_index(pagination_index - 1);
    } else {
      set_pagination_index(1);
    }
    
  }

  const paginate_right_click_handler = () => {
    if (pagination_index < max) {
      set_pagination_index(pagination_index + 1);
    } else {
      set_pagination_index(max);
    }
    
  }

  const paginate_double_right_click_handler = () => {
    set_pagination_index(max);
  }

  const paginate_range = (index:number, max:number, step:number) => {
    let start1 = (index-2 > 0) ? index-2 : 1;
    let stop1 = (start1+4 <= max) ? start1+4 : max;
    
    let stop2 = (index+2 <= max) ? index+2 : max;
    let start2 = (stop2-4 > 0) ? stop2-4 : 1;
    
    let start:number;
    let stop;
    if (stop2-start2 > stop1-start1) {
      start = start2;
      stop = stop2;
    } else {
      start = start1;
      stop = stop1;
    }
    
    return Array.from({ length: ( stop - start) / step + 1}, (_, i) => start + (i * step));
  }

  return (
    <>
      <div className="pagination_wrapper">
        <div className="pagination_double_left_arrow selectDisable" onClick={paginate_double_left_click_handler}> 
          <img height={double_size} width={double_size} src={double_left_white_arrow} draggable="false" />
        </div>
        <div className="pagination_left_arrow selectDisable" onClick={paginate_left_click_handler}> 
          <img height={size} width={size} src={left_white_arrow} draggable="false" />
        </div>
        <div className="squares_wrapper">
          { paginate_range(pagination_index, max, 1).map((val, index) => {
              return (
                <div key={index} className={`square_index ${pagination_index == val ? "selected_page" : ""}`} onClick={() => set_pagination_index(val)}>
                  {val}
                </div>
              )
            })
          }
        </div>
        <div className="pagination_right_arrow selectDisable" onClick={paginate_right_click_handler}> 
          <img height={size} width={size} src={right_white_arrow} draggable="false" />
        </div>
        <div className="pagination_double_right_arrow selectDisable" onClick={paginate_double_right_click_handler}> 
          <img height={double_size} width={double_size} src={double_right_white_arrow} draggable="false" />
        </div>
      </div>
      
    </>
  )
})

export default Pagination