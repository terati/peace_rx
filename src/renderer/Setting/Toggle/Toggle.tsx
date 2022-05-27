import * as React from "react";
import "./toggle.css";


function Toggle(props: any) {
  const {
    checked,
    onClick = () => {},
    stat,
    ...rest
  } = props;

  // const [stat, set_stat] = React.useState<boolean>(true);

  return (
    <>
      <label className="switch">
          <input type="checkbox" checked={stat} onClick = {onClick} />
          <span className="slider round"></span>
      </label>
    </>
    
  )
}

export default Toggle