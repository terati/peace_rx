import * as React from 'react';

const getWindowdimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowdimensions());

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowdimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    }
  }, [])

  return windowDimensions;
}

export default useWindowDimensions