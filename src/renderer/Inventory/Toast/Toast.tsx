import * as React from "react";
import closeIcon from "./../../../../assets/generalIcons/close.svg"
//  ssets/generalIcons/close.svg";
import "./toast.css"

const Toast = React.forwardRef((props:any, ref:any) => {
  const size = 15;
  const [toast_state, set_toast_state] = React.useState<boolean>(ref.current);

  React.useEffect(() => {
    set_toast_state(ref.current);
  }, [ref.current])

  return (
    <>
      {toast_state && 
        <div className="toast_success" {...props}>
          <div> Saved Successfully </div>
          <div onClick={() =>  ref.current = "bye worldfalse" } >
            <img height={size} width={size} src={closeIcon} draggable="false" />
          </div>
        </div>
      }
    </>
  )
})

export default Toast