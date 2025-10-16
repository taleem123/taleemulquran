import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import './style.css'; // Make sure your font import is there!

const HeaderTopbar = () => {
  return (
    <Box
      className="modern-topbar"
      sx={{
        background: 'linear-gradient(135deg, #0088cc 0%, #00c6ae 100%)',
        py: 1.5,
        display: { xs: 'none', sm: 'none', md: 'block' },
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Optional subtle overlay for glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontWeight: 500,
              fontSize: '1.3rem',
              fontFamily: '"Amiri", "Scheherazade New", serif',
              textShadow: '0 2px 5px rgba(0,0,0,0.25)',
              textAlign: 'center',
              letterSpacing: '0.8px',
              lineHeight: 1.8,
            }}
          >
            اللَّهُ نَزَّلَ أَحْسَنَ الْحَدِيثِ كِتَابًا
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderTopbar;