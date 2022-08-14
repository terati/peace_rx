import * as React from 'react';
import cb_style from './Clear_button.module.scss';

function Clear_button(props:any) {
  return (
    <button
      className={cb_style.button}
      {...props}
    >
      Clear
    </button> 
  )
}

export default Clear_button