import * as React from "react";
import closeIcon from "./../../../../assets/generalIcons/close.svg"
//  ssets/generalIcons/close.svg";
import "./toast.css"

function Toast() {
  const size = 15;

  return (
    <div className="toast_success" >
      <div> Saved Successfully </div>
      <div>
        <img height={size} width={size} src={closeIcon} draggable="false" />
      </div>
    </div>
  )
}

export default Toast