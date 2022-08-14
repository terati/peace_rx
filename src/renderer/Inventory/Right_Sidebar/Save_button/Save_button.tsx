import * as React from 'react';
import sb_style from './Save_button.module.scss';

function Save_button(props: any) {
  return (
    <>
      <button
        className={sb_style.button}
        {...props}
      > 
        Save
      </button>
    </>
  )
}

export default Save_button