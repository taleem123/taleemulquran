import React, { useCallback, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton as MuiIconButton
} from '@mui/material';
import {
  PlayArrow,
  Share,
  OpenInNew,
  Download,
  Close
} from '@mui/icons-material';
import { getThumbnailUrl, getYouTubeId, getVideoInfo } from '../../utils/videoPlatforms';
import { downloadVideo } from '../../utils/videoDownload';
import DownloadModal from '../DownloadModal';

const VideoCard = ({ 
  video, 
  onVideoClick, 
  onDirectPlay, 
  onDownload, 
  onShare, 
  showModal = true,
  className = "video-card"
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleVideoClick = useCallback((video) => {
    if (showModal) {
      setSelectedVideo(video);
      setIsVideoModalOpen(true);
    } else if (onVideoClick) {
      onVideoClick(video);
    }
  }, [showModal, onVideoClick]);

  const handleDirectPlay = useCallback((video, e) => {
    e.preventDefault();
    e.stopPropagation();
    const videoUrl = video?.url || (video?.sources && video.sources[0]);
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  }, []);

  const handleDownload = useCallback(async (video, e) => {
    e.stopPropagation();
    
    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1976d2;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-family: Arial, sans-serif;
      `;
      loadingToast.textContent = 'Starting download... This may take a few minutes.';
      document.body.appendChild(loadingToast);
      
      // Call the real download function
      await downloadVideo(video);
      
      // Remove loading toast
      document.body.removeChild(loadingToast);
      
      // Show success message
      const successToast = document.createElement('div');
      successToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 10000;
        font-family: Arial, sans-serif;
      `;
      successToast.textContent = 'Download started successfully!';
      document.body.appendChild(successToast);
      
      // Remove success toast after 3 seconds
      setTimeout(() => {
        if (document.body.contains(successToast)) {
          document.body.removeChild(successToast);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Download failed:', error);
      
      // Remove loading toast if it exists
      const loadingToast = document.querySelector('[style*="position: fixed"][style*="top: 20px"]');
      if (loadingToast) {
        document.body.removeChild(loadingToast);
      }
      
      // Show error message
      alert(`Download failed: ${error.message}`);
    }
  }, []);

  const handleShare = useCallback((video, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description || video.title,
        url: video?.url || (video?.sources && video.sources[0])
      });
    } else {
      // Fallback: copy to clipboard
      const videoUrl = video?.url || (video?.sources && video.sources[0]);
      navigator.clipboard.writeText(videoUrl).then(() => {
        // You could show a toast notification here
        console.log('Video URL copied to clipboard');
      });
    }
  }, []);

  const handleCloseVideo = useCallback(() => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  }, []);

  // Helper function to get thumbnail URL
  const getVideoThumbnail = useCallback((video) => {
    // First try existing thumbnail fields
    if (video.thumb) return video.thumb;
    if (video.thumbnail) return video.thumbnail;
    
    // Get video URL from either url field or sources array
    const videoUrl = video?.url || (video?.sources && video.sources[0]);
    if (!videoUrl) return null;
    
    // Extract video info and generate thumbnail
    const { platform, videoId } = getVideoInfo(videoUrl);
    return getThumbnailUrl(platform, videoId);
  }, []);

  return (
    <>
      <Card 
        className={className}
        onClick={() => handleVideoClick(video)}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
          }
        }}
      >
        <Box className="video-thumbnail-container" sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={getVideoThumbnail(video) || 'https://via.placeholder.com/400x200/f5f5f5/666666?text=No+Thumbnail'}
            alt={video.title}
            className="video-thumbnail"
            sx={{
              objectFit: 'cover',
              width: '100%'
            }}
          />
          
          <Box 
            className="play-button-overlay"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <IconButton 
              className="play-button" 
              size="large"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)'
                }
              }}
            >
              <PlayArrow sx={{ fontSize: 40, color: '#1976d2' }} />
            </IconButton>
          </Box>
        </Box>

        <CardContent className="video-content" sx={{ p: 2 }}>
          <Typography 
            variant="h6" 
            component="h3" 
            className="video-title"
            sx={{
              fontWeight: 'bold',
              color: '#1a365d',
              mb: 1,
              fontSize: '1rem',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {video.title}
          </Typography>

          {/* Description (optional) */}
          {video.description && (
            <Typography 
              variant="body2" 
              className="video-description"
              sx={{
                color: '#666',
                mb: 2,
                fontSize: '0.9rem',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {video.description}
            </Typography>
          )}

          <Box 
            className="video-metadata"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1
            }}
          >
            <Box className="metadata-left" sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDirectPlay(video, e);
                }}
                className="direct-play-button"
                title="Direct Play"
                sx={{ color: '#00a7d5' }}
              >
                <OpenInNew sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload(video, e);
                }}
                className="download-button"
                title="Download Video"
              >
                <Download sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton 
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleShare(video, e);
                }}
                className="share-button"
                title="Share Video"
              >
                <Share sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Video Modal */}
      {showModal && isVideoModalOpen && selectedVideo && (
        <Dialog
          open={isVideoModalOpen}
          onClose={handleCloseVideo}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: '#000',
              borderRadius: 2,
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            backgroundColor: '#000',
            color: 'white',
            borderBottom: '1px solid #333'
          }}>
            <Typography variant="h6" component="div">
              {selectedVideo.title}
            </Typography>
            <MuiIconButton
              aria-label="close"
              onClick={handleCloseVideo}
              sx={{ color: 'white' }}
            >
              <Close />
            </MuiIconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0, backgroundColor: '#000' }}>
            <Box sx={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
              {(() => {
                // Get video URL from either url field or sources array
                const videoUrl = selectedVideo?.url || (selectedVideo?.sources && selectedVideo.sources[0]);
                
                if (!videoUrl) {
                  return (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      textAlign: 'center',
                      p: 2
                    }}>
                      <Typography variant="h6" gutterBottom>
                        No Video URL Found
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        The video data is missing both URL and sources fields.
                      </Typography>
                    </Box>
                  );
                }
                
                const videoId = getYouTubeId(videoUrl);
                
                if (!videoId) {
                  return (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      textAlign: 'center',
                      p: 2
                    }}>
                      <Typography variant="h6" gutterBottom>
                        Invalid YouTube URL
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Could not extract video ID from: {videoUrl}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        <a 
                          href={videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#1976d2', textDecoration: 'underline' }}
                        >
                          Open in YouTube
                        </a>
                      </Typography>
                    </Box>
                  );
                }
                
                return (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&start=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  />
                );
              })()}
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <DownloadModal
          open={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          video={video}
          videoUrl={video?.url || (video?.sources && video.sources[0])}
        />
      )}
    </>
  );
};

export default React.memo(VideoCard);
