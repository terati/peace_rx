import { max } from 'lodash';
import * as React from 'react';
import './pagination.css';
import left_white_arrow from "./../../../../assets/generalIcons/left_arrow_white.png";
import right_white_arrow from "./../../../../assets/generalIcons/right_arrow_white.png";


const Pagination = (props:any) => {
  const {
    max,
    current
  } = props;

  const size = 25;

  return (
    <>
      <div className="pagination_wrapper">
        <div className="pagination_left_arrow"> 
          <img height={size} width={size} src={left_white_arrow} draggable="false" />
        </div>
        <div className="squares_wrapper">
          { [...Array(max)].map((val, index) => {
              return (
                <div className={`square_index ${current == index + 1 ? "selected_page" : ""}`}>
                  {index + 1}
                </div>
              )
            })
          }
        </div>
        <div className="pagination_right_arrow"> 
          <img height={size} width={size} src={right_white_arrow} draggable="false" />
        </div>
      </div>
      
    </>
  )
}

export default Pagination