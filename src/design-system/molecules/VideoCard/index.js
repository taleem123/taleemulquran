import React, { useCallback } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip } from '@mui/material';
import { PlayArrow, OpenInNew, Download, Share } from '@mui/icons-material';
import { spacing, typography, colors, shadows } from '../../tokens';
import './style.css';

const VideoCard = ({ 
  video,
  onClick,
  onDirectPlay,
  onDownload,
  onShare,
  variant = 'default',
  className = '',
  ...props 
}) => {
  const handleCardClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick(video);
  }, [onClick, video]);

  const handleDirectPlay = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDirectPlay) onDirectPlay(video, e);
  }, [onDirectPlay, video]);

  const handleDownload = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDownload) onDownload(video, e);
  }, [onDownload, video]);

  const handleShare = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) onShare(video, e);
  }, [onShare, video]);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return '📘';
      case 'youtube':
        return '📺';
      case 'tiktok':
        return '🎵';
      default:
        return '🎥';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          thumbnailHeight: 120, // Show thumbnail
          contentPadding: spacing.xs,
          titleSize: typography.fontSize.sm,
          descriptionSize: typography.fontSize.xs,
        };
      case 'large':
        return {
          thumbnailHeight: 160, // Show thumbnail
          contentPadding: spacing.sm,
          titleSize: typography.fontSize.lg,
          descriptionSize: typography.fontSize.md,
        };
      default:
        return {
          thumbnailHeight: 140, // Show thumbnail
          contentPadding: spacing.xs,
          titleSize: typography.fontSize.md,
          descriptionSize: typography.fontSize.sm,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card 
      className={`video-card video-card--${variant} ${className}`}
      onClick={handleCardClick}
      sx={{
        borderRadius: '12px',
        background: colors.semantic.background.primary,
        border: `1px solid ${colors.semantic.border.primary}`,
        boxShadow: shadows.component.card.default,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: shadows.component.card.hover,
          borderColor: colors.brand.primary,
        },
        ...props.sx,
      }}
      {...props}
    >
      {/* Video Thumbnail */}
      <Box className="video-thumbnail-container" sx={{ position: 'relative' }}>
        {video.thumb || video.thumbnail ? (
          <CardMedia
            component="img"
            height={styles.thumbnailHeight}
            image={video.thumb || video.thumbnail}
            alt={video.title}
            className="video-thumbnail"
            sx={{
              objectFit: 'cover',
              width: '100%',
            }}
          />
        ) : (
          <Box
            className="video-thumbnail-placeholder"
            sx={{
              height: styles.thumbnailHeight,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: video.platform === 'facebook' ? '#1877f2' :
                             video.platform === 'tiktok' ? '#000000' :
                             video.platform === 'youtube' ? '#ff0000' : '#666666',
              color: 'white',
              fontSize: '3rem'
            }}
          >
            {getPlatformIcon(video.platform)}
            <Typography variant="caption" sx={{ mt: 1, fontSize: '0.8rem' }}>
              {video.platform?.toUpperCase()}
            </Typography>
          </Box>
        )}

        {/* Play Button Overlay */}
        <Box className="play-button-overlay" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            transform: 'translate(-50%, -50%) scale(1.1)',
          }
        }}>
          <IconButton className="play-button" size="large" sx={{ color: 'white' }}>
            <PlayArrow sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        {/* Duration Badge */}
        {video.duration && (
          <Chip
            label={video.duration}
            size="small"
            className="duration-badge"
            sx={{
              position: 'absolute',
              bottom: spacing.xs,
              right: spacing.xs,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          />
        )}

        {/* Platform Icon */}
        <Box className="platform-icon" sx={{
          position: 'absolute',
          top: spacing.xs,
          left: spacing.xs,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '0.7rem',
          fontWeight: 'bold'
        }}>
          {getPlatformIcon(video.platform)}
        </Box>
      </Box>

      <CardContent 
        className="video-content"
        sx={{ 
          padding: `${styles.contentPadding}px`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        {video.title && (
          <Typography 
            variant="h6" 
            component="h3"
            className="video-title"
            sx={{
              fontWeight: 'bold',
              color: colors.semantic.text.primary,
              fontSize: styles.titleSize,
              marginBottom: spacing.xs,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </Typography>
        )}

        {/* Description */}
        {video.description && (
          <Typography 
            variant="body2" 
            className="video-description"
            sx={{
              color: colors.semantic.text.secondary,
              fontSize: styles.descriptionSize,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {video.description}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box className="video-actions" sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: spacing.xs,
          paddingTop: spacing.xs,
          borderTop: `1px solid ${colors.semantic.border.secondary}`,
        }}>
          <Box className="action-buttons" sx={{ display: 'flex', gap: spacing.xs }}>
            <IconButton
              size="small"
              onClick={handleDirectPlay}
              className="direct-play-button"
              title="Direct Play"
              sx={{ color: colors.brand.primary }}
            >
              <OpenInNew sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDownload}
              className="download-button"
              title="Download Video"
            >
              <Download sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleShare}
              className="share-button"
              title="Share Video"
            >
              <Share sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
