import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Menu,
  MenuItem,
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
  Settings,
  SkipPrevious,
  SkipNext,
  Download,
  Share,
  Close
} from '@mui/icons-material';
import './style.css';

const VideoPlayer = ({ video, autoplay = false, controls = true, isModal = false, onClose, showDownload = false, showShare = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Video source (use first source from the video object)
  const videoSrc = React.useMemo(() => {
    if (!video) return null;
    
    // Check for sources array first
    if (video.sources && Array.isArray(video.sources) && video.sources.length > 0) {
      return video.sources[0];
    }
    
    // Fallback to url property
    if (video.url) {
      return video.url;
    }
    
    // Fallback to src property
    if (video.src) {
      return video.src;
    }
    
    return null;
  }, [video]);

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlayPause = useCallback(() => {
    console.log('VideoPlayer - Toggle play/pause clicked', { isPlaying, isLoading, hasError });
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        console.log('VideoPlayer - Pausing video');
        video.pause();
      } else {
        console.log('VideoPlayer - Playing video');
        video.play().catch(error => {
          console.error("Error attempting to play", error);
          setHasError(true);
          setIsLoading(false);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.warn('VideoPlayer - No video element found');
    }
  }, [isPlaying, isLoading, hasError]);

  const handleSeek = useCallback((_, newValue) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = newValue;
      setCurrentTime(newValue);
    }
  }, []);

  const handleVolumeChange = useCallback((_, newValue) => {
    const video = videoRef.current;
    if (video) {
      video.volume = newValue;
      setVolume(newValue);
      setIsMuted(newValue === 0);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
      setVolume(isMuted ? 1 : 0);
    }
  }, [isMuted]);

  const handlePlaybackRateChange = useCallback((rate) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSpeedMenu(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const player = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      player.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => {
        console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
    }
  }, []);

  const skip = useCallback((seconds) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
    }
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handleEnded = useCallback(() => setIsPlaying(false), []);

  const handleDownload = useCallback(() => {
    if (videoSrc) {
      const link = document.createElement('a');
      link.href = videoSrc;
      link.download = `${video.title || 'video'}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [videoSrc, video.title]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: videoSrc
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(videoSrc);
      alert('Video URL copied to clipboard!');
    }
  }, [video.title, video.description, videoSrc]);

  // Debug video data and test URL accessibility
  useEffect(() => {
    console.log('VideoPlayer - Video object:', video);
    console.log('VideoPlayer - Video source:', videoSrc);
    console.log('VideoPlayer - Video sources array:', video?.sources);
    console.log('VideoPlayer - Video URL:', video?.url);
    
    // Don't test URL accessibility immediately - let the video element handle it
    // This prevents false error states due to CORS or network issues
  }, [video, videoSrc]);

  // Video event handlers
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoSrc) {
      console.warn('VideoPlayer - No video element or source:', { videoElement: !!videoElement, videoSrc });
      if (!videoSrc) {
        setHasError(true);
        setIsLoading(false);
      }
      return;
    }

    console.log('VideoPlayer - Setting up video with source:', videoSrc);
    
    // Reset states
    setHasError(false);
    setIsPlaying(false);
    setIsLoading(true);

    const handleLoadStart = () => {
      console.log('VideoPlayer - Load started');
      setIsLoading(true);
      setHasError(false);
    };

    const handleLoadedMetadata = () => {
      console.log('VideoPlayer - Metadata loaded');
      setDuration(videoElement.duration);
      setIsLoading(false);
      setHasError(false);
    };

    const handleLoadedData = () => {
      console.log('VideoPlayer - Data loaded');
      setDuration(videoElement.duration);
      setIsLoading(false);
      setHasError(false);
    };

    const handleCanPlay = () => {
      console.log('VideoPlayer - Can play');
      setIsLoading(false);
      setHasError(false);
    };

    const handleCanPlayThrough = () => {
      console.log('VideoPlayer - Can play through');
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      console.error('Video error details:', {
        error: e,
        videoSrc,
        videoElement: videoElement.src,
        readyState: videoElement.readyState,
        networkState: videoElement.networkState
      });
      
      setIsLoading(false);
      setHasError(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };

    // Add event listeners
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('volumechange', handleVolumeChange);
    videoElement.addEventListener('error', handleError);

    // Set a timeout to stop loading if it takes too long
    const loadingTimeout = setTimeout(() => {
      console.warn('VideoPlayer - Loading timeout, stopping loader');
      setIsLoading(false);
    }, 5000); // 5 seconds timeout

    // Also check if video is already loaded
    if (videoElement.readyState >= 2) { // HAVE_CURRENT_DATA
      console.log('VideoPlayer - Video already loaded, stopping loader');
      setIsLoading(false);
      setDuration(videoElement.duration);
    }

    return () => {
      clearTimeout(loadingTimeout);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoSrc, handlePlay, handlePause, handleEnded]);

  // Auto-hide controls
  useEffect(() => {
    let timeout;
    const hide = () => {
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    const show = () => {
      clearTimeout(timeout);
      setShowControls(true);
      hide();
    };

    if (isPlaying && controls) {
      hide();
      return () => clearTimeout(timeout);
    } else {
      clearTimeout(timeout);
      setShowControls(true);
    }
  }, [isPlaying, controls]);

  const videoPlayer = (
    <Box
      className="video-player-container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box
        className="video-wrapper"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="video-element"
          src={videoSrc || ''}
          poster={video?.thumb || video?.thumbnail || ''}
          preload="metadata"
          autoPlay={autoplay}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('VideoPlayer - Video element clicked');
            togglePlayPause();
          }}
          onError={(e) => {
            console.error('Video load error:', e);
            console.error('Video load error details:', {
              videoSrc,
              videoElement: e.target.src,
              readyState: e.target.readyState,
              networkState: e.target.networkState,
              error: e.target.error
            });
            setHasError(true);
            setIsLoading(false);
          }}
        />

        {/* Center Play/Pause Button - Always visible when not playing and not loading */}
        {!hasError && !isPlaying && !isLoading && (
          <Box 
            className="center-play-overlay"
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconButton 
              className="center-play-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('VideoPlayer - Center play button clicked');
                togglePlayPause();
              }}
              size="large"
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <PlayArrow sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        )}

        {/* Center Pause Button - Visible when playing */}
        {!hasError && isPlaying && (
          <Box 
            className="center-pause-overlay"
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              }
            }}
          >
            <IconButton 
              className="center-pause-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('VideoPlayer - Center pause button clicked');
                togglePlayPause();
              }}
              size="large"
              sx={{
                width: 80,
                height: 80,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Pause sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
        )}

        {/* Modern Loading Spinner */}
        {!hasError && isLoading && (
          <Box 
            className="modern-loader"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.8,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                border: '4px solid rgba(255, 255, 255, 0.3)',
                borderTop: '4px solid #00a7d5',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 2,
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 500,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              ویڈیو تیار ہو رہی ہے...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {(hasError || !videoSrc) && (
          <Box className="error-overlay">
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              {!videoSrc ? 'ویڈیو دستیاب نہیں' : 'ویڈیو لوڈ نہیں ہو سکی'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
              {!videoSrc ? 'اس ویڈیو کا سورس دستیاب نہیں' : 'CORS یا نیٹ ورک کی وجہ سے ویڈیو لوڈ نہیں ہو سکی'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
              نیچے "براہ راست دیکھیں" بٹن استعمال کریں
            </Typography>
            {videoSrc && (
              <Typography variant="caption" sx={{ color: 'white', mb: 2, display: 'block', wordBreak: 'break-all', opacity: 0.7 }}>
                URL: {videoSrc}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              {videoSrc && (
                <Button 
                  variant="outlined" 
                  onClick={() => window.open(videoSrc, '_blank')}
                  sx={{ color: 'white', borderColor: 'white', fontWeight: 'bold' }}
                  size="large"
                >
                  براہ راست دیکھیں
                </Button>
              )}
              {videoSrc && (
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setHasError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                  size="large"
                >
                  دوبارہ کوشش کریں
                </Button>
              )}
            </Box>
          </Box>
        )}

        {/* Video Controls Overlay */}
        {showControls && controls && (
          <Box className="video-controls-overlay">
            {/* Top Controls */}
            <Box className="top-controls">
              <Typography variant="h6" className="video-title">
                {video.title}
              </Typography>
              {isModal && (
                <IconButton onClick={onClose} className="close-button">
                  <Close sx={{ color: 'white' }} />
                </IconButton>
              )}
            </Box>


            {/* Bottom Controls */}
            <Box className="bottom-controls">
              <Slider
                aria-label="time-seek"
                value={currentTime}
                min={0}
                max={duration}
                onChange={handleSeek}
                sx={{ flexGrow: 1, mx: 2 }}
              />
              <Typography variant="body2" sx={{ color: 'white', mx: 1 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>

              <Box className="control-buttons">
                <IconButton onClick={() => skip(-10)} title="Skip Back 10s">
                  <SkipPrevious sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={togglePlayPause} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause sx={{ color: 'white' }} /> : <PlayArrow sx={{ color: 'white' }} />}
                </IconButton>
                <IconButton onClick={() => skip(10)} title="Skip Forward 10s">
                  <SkipNext sx={{ color: 'white' }} />
                </IconButton>

                <IconButton onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeOff sx={{ color: 'white' }} /> : <VolumeUp sx={{ color: 'white' }} />}
                </IconButton>
                <Slider
                  aria-label="volume-control"
                  value={volume}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handleVolumeChange}
                  sx={{ width: 80, mx: 1 }}
                />

                <IconButton onClick={(e) => setShowSpeedMenu(e.currentTarget)} title="Playback Speed">
                  <Settings sx={{ color: 'white' }} />
                </IconButton>
                <Menu
                  anchorEl={showSpeedMenu}
                  open={Boolean(showSpeedMenu)}
                  onClose={() => setShowSpeedMenu(false)}
                  MenuListProps={{
                    'aria-labelledby': 'playback-speed-button',
                  }}
                >
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <MenuItem
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      selected={playbackRate === rate}
                    >
                      {rate}x
                    </MenuItem>
                  ))}
                </Menu>

                {showDownload && (
                  <IconButton onClick={handleDownload} title="Download Video">
                    <Download sx={{ color: 'white' }} />
                  </IconButton>
                )}
                {showShare && (
                  <IconButton onClick={handleShare} title="Share Video">
                    <Share sx={{ color: 'white' }} />
                  </IconButton>
                )}

                <IconButton onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
                  {isFullscreen ? <FullscreenExit sx={{ color: 'white' }} /> : <Fullscreen sx={{ color: 'white' }} />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
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
            maxWidth: '800px'
          }
        }}
      >
        <DialogContent className="video-modal-content" sx={{ padding: 0 }}>
          {videoPlayer}
        </DialogContent>
      </Dialog>
    );
  }

  return videoPlayer;
};

export default VideoPlayer;