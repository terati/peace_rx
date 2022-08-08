import * as React from 'react';
import popup_input_styles from "./popup_input.module.scss";

function Popup_input(props: any) {
  return (
    <input type="text" className={popup_input_styles.popup_input} {...props}/>
  )
}

export default Popup_input