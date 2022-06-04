import * as React from 'react';
import "./inventory_search.css";

const Inventory_Search = React.forwardRef((props, ref:any) => {
  return (
    <>
      <input className="inventory_search" ref={ref} {...props}/>
    </>
  )
})

export default Inventory_Search