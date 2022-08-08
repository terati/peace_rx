import * as React from 'react';
import Angle_Down from 'renderer/Icons_Color_Control/Angle_Down';
import ipp_style from './Items_Per_Page.module.scss';

const options = [10, 20, 50, 100];

const Items_Per_Page = (props:any) => {
  const {
    number_of_items = 50,
    set_number_of_items,
    ...other
  } = props;
  const [open, set_open] = React.useState(false);

  const option_click_handler = (option:number) => {
    set_number_of_items(option);
  }

  return (
    <div className={ipp_style.div_ipp}> 
      <p> Items per page </p>
      <div className={ipp_style.div_choices} 
        onClick={() => set_open(!open)} 
        onBlur={() => set_open(false)}
        tabIndex={1}
      > 
        { number_of_items }
        <Angle_Down fill={'white'} 
          height={10} 
          width={10} 
          style={{ padding: '5px', 
                   transform: !open ? 'rotate(0deg)' : 'rotate(180deg)'
                 }}
        />
        { open &&
          <div className={ipp_style.div_options_wrapper}>
            { options.map((option, idx) => {
                return (
                  <div className={ipp_style.div_option} onClick={() => option_click_handler(option)}>
                    { option }
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Items_Per_Page