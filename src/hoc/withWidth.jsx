import React, { useState, useEffect } from 'react';

const withWidth = (WrappedComponent) => {
  return (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
    return <WrappedComponent {...props} width={width} />;
  };
};

export default withWidth;
