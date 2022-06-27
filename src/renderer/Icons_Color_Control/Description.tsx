import * as React from 'react';

function Description(props: any) {
  const {
    height,
    width,
    ...other
  } = props;
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" {...props}><path d="M1,6H23a1,1,0,0,0,0-2H1A1,1,0,0,0,1,6Z"/><path d="M1,11H15a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2Z"/><path d="M15,19H1a1,1,0,0,0,0,2H15a1,1,0,0,0,0-2Z"/><path d="M23,14H1a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z"/></svg>
    </>
  )
}

export default Description