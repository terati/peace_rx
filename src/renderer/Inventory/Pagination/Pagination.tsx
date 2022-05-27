import { max } from 'lodash';
import * as React from 'react';
import './pagination.css';

const Pagination = (props:any) => {
  const {
    max,
    current
  } = props;



  return (
    <>
      <div className="squares_wrapper">
        { (max <= 5) && [...Array(max)].map((val, index) => {
            return (
              <div className="square_index">
                {index + 1}
              </div>
            )
          })
        }
      </div>
      
    </>
  )
}

export default Pagination