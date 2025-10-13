import React, { useRef, useState, useCallback } from 'react';
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
  Close
} from '@mui/icons-material';
import './style.css';

const SimpleVideoPlayer = ({ video, isModal = false, onClose, showDownload = false, showShare = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get video source
  const videoSrc = video?.sources?.[0] || video?.url || video?.src;

  const togglePlayPause = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!document.fullscreenElement) {
      videoElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (videoSrc) {
      const link = document.createElement('a');
      link.href = videoSrc;
      link.download = `${video?.title || 'video'}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [videoSrc, video?.title]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: video?.title,
        text: video?.description,
        url: videoSrc
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(videoSrc);
      alert('Video URL copied to clipboard!');
    }
  }, [video?.title, video?.description, videoSrc]);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => setIsPlaying(false), []);

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

  const videoPlayer = (
    <Box
      className="simple-video-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="simple-video"
        src={videoSrc}
        poster={video?.thumb || video?.thumbnail}
        preload="metadata"
        onClick={togglePlayPause}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={(e) => {
          console.error('Video error:', e);
        }}
      />

      {/* Center Play Button */}
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

      {/* Center Pause Button (on hover) */}
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

      {/* Controls */}
      {showControls && (
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
              <IconButton onClick={handleDownload} className="action-btn" title="Download">
                <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>Download</Typography>
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

export default SimpleVideoPlayer;
