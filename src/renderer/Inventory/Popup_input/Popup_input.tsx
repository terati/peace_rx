import * as React from 'react';
import "./popup_input.css";

function Popup_input(props: any) {
  return (
    <input type="text" className="popup_input" {...props}/>
  )
}

export default Popup_input