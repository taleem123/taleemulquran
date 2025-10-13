import React from 'react';
import { Box, Grid } from '@mui/material';
import VideoCard from '../../molecules/VideoCard';
import { spacing } from '../../tokens';
import './style.css';

const VideoGrid = ({ 
  videos = [],
  onVideoClick,
  onDirectPlay,
  onDownload,
  onShare,
  variant = 'default',
  columns = { xs: 1, sm: 2, md: 3, lg: 3 }, // Three in a row on desktop
  spacing: gridSpacing = 1, // Minimal spacing
  className = '',
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          gap: 0,
          padding: 0,
        };
      case 'large':
        return {
          gap: spacing.xs,
          padding: 0,
        };
      default:
        return {
          gap: 0,
          padding: 0,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box 
      className={`video-grid video-grid--${variant} ${className}`}
      sx={{
        width: '100%',
        margin: '0 auto',
        ...styles,
        ...props.sx,
      }}
      {...props}
    >
      <Grid container spacing={gridSpacing}>
        {videos.map((video, index) => (
          <Grid 
            item 
            xs={columns.xs} 
            sm={columns.sm} 
            md={columns.md} 
            key={video.id || index}
          >
            <VideoCard
              video={video}
              variant={variant}
              onClick={onVideoClick}
              onDirectPlay={onDirectPlay}
              onDownload={onDownload}
              onShare={onShare}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoGrid;
