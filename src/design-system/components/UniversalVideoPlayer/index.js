import React, { useState, useCallback } from 'react';
import YouTube from 'react-youtube';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Button,
  Chip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Close,
  Download,
  Share,
  OpenInNew
} from '@mui/icons-material';
import { 
  getVideoInfo, 
  getWatchUrl,
  supportsCustomControls,
  getPlatformDisplayName,
  getPlatformIcon
} from '../../../utils/videoPlatforms';
import { colors, spacing } from '../../tokens';
import './style.css';

const UniversalVideoPlayer = ({ 
  video, 
  isModal = false, 
  onClose, 
  showDownload = false, 
  showShare = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Get video information
  const videoUrl = video?.sources?.[0] || video?.url || video?.src;
  const { platform, videoId } = getVideoInfo(videoUrl);
  const watchUrl = getWatchUrl(platform, videoId);

  // YouTube player options
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      disablekb: 0,
      enablejsapi: 1,
      origin: window.location.origin
    },
  };

  // YouTube event handlers
  const onYouTubeReady = useCallback((event) => {
    setPlayer(event.target);
    console.log('YouTube player ready');
  }, []);

  const onYouTubeStateChange = useCallback((event) => {
    const state = event.data;
    if (state === 1) {
      setIsPlaying(true);
    } else if (state === 2) {
      setIsPlaying(false);
    }
  }, []);

  const onYouTubeError = useCallback((event) => {
    console.error('YouTube player error:', event.data);
    setHasError(true);
  }, []);

  // Control handlers
  const togglePlayPause = useCallback(() => {
    if (platform === 'youtube' && player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } else if (platform !== 'youtube') {
      // For non-YouTube platforms, open in new tab
      window.open(watchUrl, '_blank');
    }
  }, [platform, player, isPlaying, watchUrl]);

  const toggleMute = useCallback(() => {
    if (platform === 'youtube' && player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  }, [platform, player, isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (platform === 'youtube' && player) {
      if (isFullscreen) {
        player.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  }, [platform, player, isFullscreen]);

  const handleDownload = useCallback(() => {
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${video?.title || 'video'}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [videoUrl, video?.title]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: video?.title || 'Video',
        text: video?.description || 'Check out this video',
        url: videoUrl
      });
    } else {
      navigator.clipboard.writeText(videoUrl);
    }
  }, [video?.title, video?.description, videoUrl]);

  const handleFacebookError = useCallback(() => {
    console.error('Facebook video failed to load, showing fallback');
    setHasError(true);
  }, []);

  // Render player based on platform
  const renderPlayer = () => {
    if (hasError || !videoId) {
      return (
        <Box className="video-error" sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: spacing.lg,
          color: colors.neutral[0],
        }}>
          <Typography variant="h6" color="error">
            {!videoUrl ? 'No video URL provided' :
             platform === 'facebook' ? 'Facebook video cannot be embedded' :
             'Unsupported video platform'}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: spacing.sm, opacity: 0.8 }}>
            {!videoUrl ? 'Please provide a valid video URL' :
             platform === 'facebook' ? 'Facebook videos often have embedding restrictions' :
             `Platform: ${platform}`}
          </Typography>
          {videoUrl && (
            <Button
              variant="contained"
              onClick={() => window.open(videoUrl, '_blank')}
              sx={{ marginTop: spacing.md }}
            >
              Open in {getPlatformDisplayName(platform)}
            </Button>
          )}
        </Box>
      );
    }

    switch (platform) {
      case 'youtube':
        return (
          <YouTube
            videoId={videoId}
            opts={youtubeOpts}
            onReady={onYouTubeReady}
            onStateChange={onYouTubeStateChange}
            onError={onYouTubeError}
            className="youtube-player"
          />
        );
      case 'facebook':
        return (
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=false&width=560&height=315&t=0`}
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '8px' }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={video?.title || 'Facebook Video'}
            onError={handleFacebookError}
          />
        );
      case 'tiktok':
        return (
          <iframe
            src={`https://www.tiktok.com/embed/v2/${videoId}`}
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '8px' }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={video?.title || 'TikTok Video'}
          />
        );
      default:
        return (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            background: colors.neutral[100],
            color: colors.semantic.text.secondary,
          }}>
            <Typography variant="h6">
              Unsupported video platform: {platform}
            </Typography>
          </Box>
        );
    }
  };

  const videoPlayer = (
    <Box
      className="universal-video-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        backgroundColor: colors.neutral[1000],
        overflow: 'hidden',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box className="video-wrapper" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
        {renderPlayer()}
      </Box>

      {/* Platform indicator */}
      <Box className="platform-indicator" sx={{
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        zIndex: 10,
      }}>
        <Chip
          icon={<span>{getPlatformIcon(platform)}</span>}
          label={getPlatformDisplayName(platform)}
          size="small"
          color="primary"
          variant="filled"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: colors.neutral[0],
            fontSize: '0.75rem',
            height: '24px',
            backdropFilter: 'blur(10px)',
          }}
        />
      </Box>

      {/* Center Play Button (for YouTube and when not playing) */}
      {platform === 'youtube' && !isPlaying && !hasError && (
        <Box className="center-play-overlay" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <IconButton
            className="center-play-button"
            onClick={togglePlayPause}
            size="large"
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: colors.neutral[0],
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              borderRadius: '50%',
              pointerEvents: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'scale(1.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <PlayArrow sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Center Pause Button (for YouTube when playing) */}
      {platform === 'youtube' && isPlaying && !hasError && (
        <Box className="center-pause-overlay" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}>
          <IconButton
            className="center-pause-button"
            onClick={togglePlayPause}
            size="large"
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: colors.neutral[0],
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              borderRadius: '50%',
              pointerEvents: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'scale(1.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <Pause sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Center Play Button (for non-YouTube platforms) */}
      {platform !== 'youtube' && !hasError && (
        <Box className="center-play-overlay" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <IconButton
            className="center-play-button"
            onClick={togglePlayPause}
            size="large"
            title={`Open in ${getPlatformDisplayName(platform)}`}
            sx={{
              width: '100px',
              height: '100px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: colors.neutral[0],
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              borderRadius: '50%',
              pointerEvents: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                transform: 'scale(1.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          >
            <OpenInNew sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Custom Controls Overlay (only for YouTube) */}
      {platform === 'youtube' && supportsCustomControls(platform) && showControls && !hasError && (
        <Box className="video-controls" sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.6) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
          opacity: 1,
          transition: 'opacity 0.3s ease',
        }}>
          {/* Top Controls */}
          <Box className="top-controls" sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.sm,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              {showDownload && (
                <IconButton
                  onClick={handleDownload}
                  size="small"
                  sx={{ color: colors.neutral[0] }}
                >
                  <Download sx={{ fontSize: 20 }} />
                </IconButton>
              )}
              {showShare && (
                <IconButton
                  onClick={handleShare}
                  size="small"
                  sx={{ color: colors.neutral[0] }}
                >
                  <Share sx={{ fontSize: 20 }} />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Bottom Controls */}
          <Box className="bottom-controls" sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: spacing.sm,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <IconButton
                onClick={togglePlayPause}
                size="small"
                sx={{ color: colors.neutral[0] }}
              >
                {isPlaying ? <Pause sx={{ fontSize: 24 }} /> : <PlayArrow sx={{ fontSize: 24 }} />}
              </IconButton>
              <IconButton
                onClick={toggleMute}
                size="small"
                sx={{ color: colors.neutral[0] }}
              >
                {isMuted ? <VolumeOff sx={{ fontSize: 20 }} /> : <VolumeUp sx={{ fontSize: 20 }} />}
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
              <IconButton
                onClick={toggleFullscreen}
                size="small"
                sx={{ color: colors.neutral[0] }}
              >
                {isFullscreen ? <FullscreenExit sx={{ fontSize: 20 }} /> : <Fullscreen sx={{ fontSize: 20 }} />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  if (isModal) {
    return (
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: colors.neutral[1000],
            borderRadius: '12px',
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ padding: 0, position: 'relative' }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: spacing.sm,
              right: spacing.sm,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: colors.neutral[0],
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <Close sx={{ fontSize: 24 }} />
          </IconButton>
          {videoPlayer}
        </DialogContent>
      </Dialog>
    );
  }

  return videoPlayer;
};

export default UniversalVideoPlayer;
