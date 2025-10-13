import React, { useState, useCallback, useEffect } from 'react';
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
  getThumbnailUrl, 
  getEmbedUrl, 
  getWatchUrl,
  supportsCustomControls,
  getPlatformDisplayName,
  getPlatformIcon
} from '../../utils/videoPlatforms';
import './style.css';

const UniversalVideoPlayer = ({ video, isModal = false, onClose, showDownload = false, showShare = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [player, setPlayer] = useState(null);
  const [hasError, setHasError] = useState(false);

  // Get video information
  const videoUrl = video?.sources?.[0] || video?.url || video?.src;
  const { platform, videoId } = getVideoInfo(videoUrl);
  const thumbnailUrl = getThumbnailUrl(platform, videoId);
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
    console.log('YouTube player state changed:', state);
    
    switch (state) {
      case 1: // PLAYING
        setIsPlaying(true);
        break;
      case 2: // PAUSED
        setIsPlaying(false);
        break;
      case 0: // ENDED
        setIsPlaying(false);
        break;
      case 3: // BUFFERING
        break;
      case 5: // CUED
        break;
      default:
        break;
    }
  }, []);

  const onYouTubeError = useCallback((event) => {
    console.error('YouTube player error:', event.data);
    setHasError(true);
  }, []);

  // Universal controls
  const togglePlayPause = useCallback(() => {
    if (platform === 'youtube' && player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    } else {
      // For other platforms, open in new tab
      if (watchUrl) {
        window.open(watchUrl, '_blank');
      }
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
    } else {
      // For other platforms, open in new tab
      if (watchUrl) {
        window.open(watchUrl, '_blank');
      }
    }
  }, [platform, player, isFullscreen, watchUrl]);

  const handleDownload = useCallback(() => {
    if (watchUrl) {
      window.open(watchUrl, '_blank');
    }
  }, [watchUrl]);

  const handleShare = useCallback(() => {
    if (watchUrl) {
      if (navigator.share) {
        navigator.share({
          title: video?.title,
          text: video?.description,
          url: watchUrl
        }).catch((error) => console.error('Error sharing:', error));
      } else {
        navigator.clipboard.writeText(watchUrl);
        alert(`${getPlatformDisplayName(platform)} URL copied to clipboard!`);
      }
    }
  }, [watchUrl, video?.title, video?.description, platform]);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  // Error handling
  useEffect(() => {
    if (!videoUrl || !videoId) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [videoUrl, videoId]);

  // Render different players based on platform
  const renderPlayer = () => {
    if (hasError || !videoId) {
      return (
        <Box className="video-error">
          <Typography variant="h6" color="error">
            {!videoUrl ? 'No video URL provided' : 'Unsupported video platform'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {!videoUrl ? 'Please provide a valid video URL' : `Platform: ${platform}`}
          </Typography>
          {watchUrl && (
            <Button
              variant="contained"
              onClick={() => window.open(watchUrl, '_blank')}
              sx={{ mt: 2 }}
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
            src={getEmbedUrl(platform, videoId)}
            width="100%"
            height="100%"
            style={{ border: 'none', borderRadius: '8px' }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={video?.title || 'Facebook Video'}
          />
        );
      
      case 'tiktok':
        return (
          <iframe
            src={getEmbedUrl(platform, videoId)}
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
          <Box className="video-error">
            <Typography variant="h6" color="error">
              Unsupported platform: {platform}
            </Typography>
            {watchUrl && (
              <Button
                variant="contained"
                onClick={() => window.open(watchUrl, '_blank')}
                sx={{ mt: 2 }}
              >
                Open in {getPlatformDisplayName(platform)}
              </Button>
            )}
          </Box>
        );
    }
  };

  const videoPlayer = (
    <Box
      className="universal-video-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box className="video-wrapper">
        {renderPlayer()}
      </Box>

      {/* Platform indicator */}
      <Box className="platform-indicator">
        <Chip
          icon={<span>{getPlatformIcon(platform)}</span>}
          label={getPlatformDisplayName(platform)}
          size="small"
          color="primary"
          variant="filled"
        />
      </Box>

      {/* Center Play Button (for YouTube and when not playing) */}
      {platform === 'youtube' && !isPlaying && !hasError && (
        <Box className="center-play-overlay">
          <IconButton
            className="center-play-button"
            onClick={togglePlayPause}
            size="large"
          >
            <PlayArrow sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Center Pause Button (for YouTube when playing) */}
      {platform === 'youtube' && isPlaying && !hasError && (
        <Box className="center-pause-overlay">
          <IconButton
            className="center-pause-button"
            onClick={togglePlayPause}
            size="large"
          >
            <Pause sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Center Play Button (for non-YouTube platforms) */}
      {platform !== 'youtube' && !hasError && (
        <Box className="center-play-overlay">
          <IconButton
            className="center-play-button"
            onClick={togglePlayPause}
            size="large"
            title={`Open in ${getPlatformDisplayName(platform)}`}
          >
            <OpenInNew sx={{ fontSize: 60, color: 'white' }} />
          </IconButton>
        </Box>
      )}

      {/* Custom Controls Overlay (only for YouTube) */}
      {showControls && platform === 'youtube' && supportsCustomControls(platform) && (
        <Box className="video-controls">
          <Box className="top-controls">
            <Typography variant="h6" className="video-title">
              {video?.title}
            </Typography>
            {isModal && (
              <IconButton onClick={onClose} className="close-button">
                <Close sx={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>

          <Box className="bottom-controls">
            <IconButton onClick={togglePlayPause} className="play-pause-btn">
              {isPlaying ? <Pause sx={{ color: 'white' }} /> : <PlayArrow sx={{ color: 'white' }} />}
            </IconButton>

            <IconButton onClick={toggleMute} className="mute-btn">
              {isMuted ? <VolumeOff sx={{ color: 'white' }} /> : <VolumeUp sx={{ color: 'white' }} />}
            </IconButton>

            {showDownload && (
              <IconButton onClick={handleDownload} className="action-btn" title="Open in Platform">
                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                  {getPlatformDisplayName(platform)}
                </Typography>
              </IconButton>
            )}

            {showShare && (
              <IconButton onClick={handleShare} className="action-btn" title="Share">
                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>Share</Typography>
              </IconButton>
            )}

            <IconButton onClick={toggleFullscreen} className="fullscreen-btn">
              {isFullscreen ? <FullscreenExit sx={{ color: 'white' }} /> : <Fullscreen sx={{ color: 'white' }} />}
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Simple controls for non-YouTube platforms */}
      {showControls && platform !== 'youtube' && !hasError && (
        <Box className="simple-controls">
          <Box className="top-controls">
            <Typography variant="h6" className="video-title">
              {video?.title}
            </Typography>
            {isModal && (
              <IconButton onClick={onClose} className="close-button">
                <Close sx={{ color: 'white' }} />
              </IconButton>
            )}
          </Box>

          <Box className="bottom-controls">
            <IconButton onClick={togglePlayPause} className="action-btn" title={`Open in ${getPlatformDisplayName(platform)}`}>
              <OpenInNew sx={{ color: 'white', mr: 1 }} />
              <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                Open in {getPlatformDisplayName(platform)}
              </Typography>
            </IconButton>

            {showShare && (
              <IconButton onClick={handleShare} className="action-btn" title="Share">
                <Share sx={{ color: 'white', mr: 1 }} />
                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>Share</Typography>
              </IconButton>
            )}
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
        maxWidth="md"
        fullWidth
        className="video-modal"
        PaperProps={{
          sx: {
            maxHeight: '90vh',
            width: '90vw',
            maxWidth: '800px',
            backgroundColor: 'black'
          }
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          {videoPlayer}
        </DialogContent>
      </Dialog>
    );
  }

  return videoPlayer;
};

export default UniversalVideoPlayer;
