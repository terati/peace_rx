import * as React from 'react';
import Question_Icon from '../../Icons_Color_Control/Question_Icon';
import style from './question_tooltip.module.scss';


function Question_Tooltip(props:any) {
const {
  text = '' 
} = props;
  return (
    <div className={style.div_question_tooltip}>
      <div className={style.question_icon_wrapper}>
        <Question_Icon height={15} width={15} fill={'white'} />
        <div className={style.div_question_tooltip_popup}>  
          <span> { text } </span>
        </div>
      </div>
        
      
    </div>
  )
}

export default Question_Tooltip