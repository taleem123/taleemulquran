import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import SectionHeader from '../../atoms/SectionHeader';
import VideoGrid from '../VideoGrid';
import Button from '../../atoms/Button';
import { spacing } from '../../tokens';
import './style.css';

const VideoSection = ({ 
  title,
  titleUrdu,
  description,
  videos = [],
  onVideoClick,
  onDirectPlay,
  onDownload,
  onShare,
  onViewAll,
  viewAllText = 'View All',
  viewAllPath,
  variant = 'default',
  columns = { xs: 1, sm: 2, md: 3 },
  showViewAll = true,
  className = '',
  ...props 
}) => {
  const handleViewAll = useCallback(() => {
    if (onViewAll) {
      onViewAll();
    } else if (viewAllPath) {
      // Navigate to viewAllPath if provided
      window.location.href = viewAllPath;
    }
  }, [onViewAll, viewAllPath]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'page':
        return {
          padding: `${spacing.sm}px 0`,
          background: 'transparent',
        };
      case 'section':
        return {
          padding: `${spacing.sm}px 0`,
          background: '#f8f9fa',
        };
      case 'compact':
        return {
          padding: `${spacing.xs}px 0`,
          background: 'transparent',
        };
      default:
        return {
          padding: `${spacing.sm}px 0`,
          background: '#f8f9fa',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box 
      className={`video-section video-section--${variant} ${className}`}
      sx={{
        ...styles,
        ...props.sx,
      }}
      {...props}
    >
      <Box className="container" sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Section Header */}
        <SectionHeader
          title={title}
          titleUrdu={titleUrdu}
          description={description}
          variant={variant === 'page' ? 'page' : 'section'}
        />

        {/* Video Grid */}
        <VideoGrid
          videos={videos}
          onVideoClick={onVideoClick}
          onDirectPlay={onDirectPlay}
          onDownload={onDownload}
          onShare={onShare}
          variant={variant}
          columns={columns}
        />

        {/* View All Button */}
        {showViewAll && videos.length > 0 && (
          <Box sx={{ textAlign: 'center', marginTop: spacing.xs }}>
            <Button
              variant="primary"
              size="large"
              onClick={handleViewAll}
              className="view-all-btn"
            >
              {viewAllText}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoSection;
