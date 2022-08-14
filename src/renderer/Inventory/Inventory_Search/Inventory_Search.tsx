import * as React from 'react';
import Search_Icon from 'renderer/Icons_Color_Control/Search_Icon';
import inventory_search_style from "./inventory_search.module.scss";

const Inventory_Search = React.forwardRef((props, ref:any) => {

  return (
    <>
      <div className={ inventory_search_style.div_inventory_search }>
        <Search_Icon className={ inventory_search_style.search_icon } fill={'white'} height={20} width={20}/>
        <input className={ `${inventory_search_style.inventory_search}` } 
          type="text"
          ref={ref} 
          {...props}
        />
      </div>
    </>
  )
})

export default Inventory_Search