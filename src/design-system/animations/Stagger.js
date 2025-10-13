import React from 'react';
import FadeIn from './FadeIn';

const Stagger = ({ 
  children, 
  staggerDelay = 100, 
  direction = 'up',
  duration = 600,
  once = true,
  ...props 
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <FadeIn
          key={index}
          delay={index * staggerDelay}
          direction={direction}
          duration={duration}
          once={once}
          {...props}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
};

export default Stagger;

