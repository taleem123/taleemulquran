import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 500, 
  once = true,
  threshold = 0.1,
  initialScale = 0.8,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once, threshold]);

  return (
    <Box
      ref={elementRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : `scale(${initialScale})`,
        transition: `opacity ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms, transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}ms`,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ScaleIn;

