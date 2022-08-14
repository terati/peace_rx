import * as React from 'react';
import lc_style from './Logout_Card.module.scss';
import Close_Icon from 'renderer/Icons_Color_Control/Close';

function Logout_Card(props: any) {
  const {
    logout_card_status,
    set_logout_card_status = () => {}
  } = props;
  const [counter, set_counter] = React.useState(59);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        set_counter(counter - 1);
      } else {
        window.electron.ipcRenderer.close();
        return () => clearTimeout(timer);
      }
    }, 1000);
  }, [counter])

  return (
    <div
      className={lc_style.logout_card}
    >
      <div className={lc_style.header}> 
        <div className={lc_style.div_close_icon_wrapper}>
          <Close_Icon fill={"white"} height={15} width={15} 
            onClick={() => set_logout_card_status(false)}
          />
        </div>
      </div>
      <div className={lc_style.content}>
        <h2> Logout? </h2>
        <p> You sessions will expire in</p>
        <h1> {counter} secs</h1>
        <p> Please click "Cancel" to keep working; or click "Log Off" to end your session now.</p>
        <div className={lc_style.div_buttons_wrapper}> 
          <button
            onClick={() => set_logout_card_status(false)}
          > Cancel </button>
          <button
            onClick={() => window.electron.ipcRenderer.close()}
          > Log Off </button>
        </div>
      </div>
    </div>
  )
}

export default Logout_Card