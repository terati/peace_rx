import * as React from 'react';
import inventory_search_style from "./inventory_search.module.scss";

const Inventory_Search = React.forwardRef((props, ref:any) => {

  return (
    <>
      <input className={ inventory_search_style.inventory_search } 
        type="text"
        ref={ref} 
        {...props}
      />
    </>
  )
})

export default Inventory_Search