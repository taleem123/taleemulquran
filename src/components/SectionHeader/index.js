import React from 'react';
import { Typography } from '@mui/material';
import './style.css';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <Typography 
        variant="h3" 
        component="h2"
        className="section-title"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1a365d',
          mb: 2
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{
            textAlign: 'center',
            mb: 4,
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};

export default SectionHeader;

