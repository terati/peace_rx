import * as React from 'react';
import ias from './Inventory_Action_Status.module.scss';

const Inventory_Action_Status = (props:any) => {
  const {
    options = [],
    color_options = [],
    current = 2,
  } = props;

  const [width, set_width] = React.useState<String>();
  const [offset_left, set_offset_left] = React.useState<String>();
  const [color, set_color] = React.useState(color_options[current]);

  const on_click_handler = (e, i) => {
    let tmp_offset_left = e.target.offsetLeft;
    let tmp_offset_width = e.target.offsetWidth;
    set_width(tmp_offset_width + 'px');
    set_offset_left( (tmp_offset_left) + 'px');
    set_color(color_options[i]);
  }

  const items_ref = React.useRef<Array<HTMLDivElement | null>>([])

  React.useEffect(() => {
    items_ref.current[current]?.click();
  }, [])

  return (
    <div className={ias.ias_div_wrapper}>
      <div className={ias.ias_div_floater}
        style={{width: width, left: offset_left, backgroundColor: color }}
      > 

      </div>
      { options.map((option:string, idx:number) => {
          return (
            <div className={ias.ias_div}
              onClick={e => on_click_handler(e, idx)}
              ref={el => items_ref.current[idx] = el}
            >
              { option }
            </div>
          )
        })

      }
    </div>
  )
}

export default Inventory_Action_Status