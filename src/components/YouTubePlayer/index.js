import React, { useState, useCallback } from 'react';
import YouTube from 'react-youtube';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Button
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
  Share
} from '@mui/icons-material';
import './style.css';

const YouTubePlayer = ({ video, isModal = false, onClose, showDownload = false, showShare = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [player, setPlayer] = useState(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  const videoId = getYouTubeId(video?.sources?.[0] || video?.url || video?.src);

  // YouTube player options
  const opts = {
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

  const onReady = useCallback((event) => {
    setPlayer(event.target);
    console.log('YouTube player ready');
  }, []);

  const onStateChange = useCallback((event) => {
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

  const onError = useCallback((event) => {
    console.error('YouTube player error:', event.data);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }, [player, isPlaying]);

  const toggleMute = useCallback(() => {
    if (!player) return;

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  }, [player, isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!player) return;

    if (isFullscreen) {
      player.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  }, [player, isFullscreen]);

  const handleDownload = useCallback(() => {
    if (videoId) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const link = document.createElement('a');
      link.href = youtubeUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [videoId]);

  const handleShare = useCallback(() => {
    if (videoId) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      if (navigator.share) {
        navigator.share({
          title: video?.title,
          text: video?.description,
          url: youtubeUrl
        }).catch((error) => console.error('Error sharing:', error));
      } else {
        navigator.clipboard.writeText(youtubeUrl);
        alert('YouTube URL copied to clipboard!');
      }
    }
  }, [videoId, video?.title, video?.description]);

  // Auto-hide controls
  React.useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  if (!videoId) {
    return (
      <Box className="youtube-error">
        <Typography variant="h6" color="error">
          Invalid YouTube URL
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please provide a valid YouTube video URL
        </Typography>
      </Box>
    );
  }

  const videoPlayer = (
    <Box
      className="youtube-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box className="youtube-wrapper">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          className="youtube-player"
        />
      </Box>

      {/* Center Play Button (when paused) */}
      {!isPlaying && (
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

      {/* Center Pause Button (on hover when playing) */}
      {isPlaying && (
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

      {/* Custom Controls Overlay */}
      {showControls && (
        <Box className="youtube-controls">
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
              <IconButton onClick={handleDownload} className="action-btn" title="Open in YouTube">
                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>YouTube</Typography>
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
    </Box>
  );

  if (isModal) {
    return (
      <Dialog
        open={true}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        className="youtube-modal"
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

export default YouTubePlayer;
