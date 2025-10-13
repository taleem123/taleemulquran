import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ 
  size = 40, 
  message = 'لوڈ ہو رہا ہے...', 
  fullScreen = false,
  color = 'primary' 
}) => {
  const containerStyles = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 9999
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3
  };

  return (
    <Box sx={containerStyles}>
      <CircularProgress 
        size={size} 
        color={color}
        sx={{ marginBottom: message ? 2 : 0 }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
