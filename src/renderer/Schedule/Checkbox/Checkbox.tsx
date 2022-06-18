import * as React from 'react';
import { checkServerIdentity } from 'tls';
import './Checkbox.css';

function Checkbox(props: any) {
  const {
    checked,
    onChange,
    color,
    description='',
    key,
    ...other
  } = props;

  const input_styles = {
    border: `solid 2px ${color}`,
    backgroundColor: checked ? color : ""
  }

  return (
    <>
      <label className='checkbox_container'>
        { description }
        <input type="checkbox" checked={checked ?? false} onChange={onChange}  />
        <span className="checkmark" style={input_styles} > </span>  
      </label>
    </>
  )
}

export default Checkbox