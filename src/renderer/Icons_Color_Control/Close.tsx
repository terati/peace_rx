import * as React from 'react';

function Calender_Icon(props: any) {
  const {
    height,
    width,
    ...other
  } = props;
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" {...props}><polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414"/></svg>
    </>
  )
}

export default Calender_Icon