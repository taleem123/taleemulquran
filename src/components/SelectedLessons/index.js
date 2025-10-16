import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
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
import SectionHeader from '../SectionHeader';
import AnimatedBackground from '../AnimatedBackground';
import { useRecentLessons } from '../../hooks/useFirebaseData';
import './style.css';

const SelectedLessons = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Use Firebase data - get only the 3 most recent lessons (optimized)
  const { lessons: selectedLessons, loading, error } = useRecentLessons(3);

  const handleVideoClick = useCallback((video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  }, []);

  const handleDirectPlay = useCallback((video, e) => {
    e.preventDefault();
    e.stopPropagation();
    const videoUrl = video?.url || (video?.sources && video.sources[0]);
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  }, []);

  const handleShare = useCallback((video, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description || 'Islamic teaching lesson',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  const handleDownload = useCallback((video, e) => {
    e.stopPropagation();
    const videoUrl = video?.url || (video?.sources && video.sources[0]);
    if (videoUrl) {
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${video.title || 'lesson'}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);


  const handleCloseVideo = useCallback(() => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  }, []);

  const handleShowMore = useCallback(() => {
    navigate('/lessons');
  }, [navigate]);

  // Helper function to get thumbnail URL
  const getVideoThumbnail = useCallback((lesson) => {
    // First try existing thumbnail fields
    if (lesson.thumb) return lesson.thumb;
    if (lesson.thumbnail) return lesson.thumbnail;
    
    // Get video URL from either url field or sources array
    const videoUrl = lesson?.url || (lesson?.sources && lesson.sources[0]);
    if (!videoUrl) return null;
    
    // Extract video info and generate thumbnail
    const { platform, videoId } = getVideoInfo(videoUrl);
    return getThumbnailUrl(platform, videoId);
  }, []);

  const LessonCard = React.memo(({ lesson }) => (
    <Card 
      className="video-card"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleVideoClick(lesson);
      }}
    >
      <Box className="video-thumbnail-container">
        <CardMedia
          component="img"
          height="200"
          image={getVideoThumbnail(lesson) || 'https://via.placeholder.com/400x200/f5f5f5/666666?text=No+Thumbnail'}
          alt={lesson.title}
          className="video-thumbnail"
          sx={{
            objectFit: 'cover',
            width: '100%'
          }}
        />
        
        <Box className="play-button-overlay">
          <IconButton className="play-button" size="large">
            <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
          </IconButton>
        </Box>

      </Box>

      <CardContent className="video-content">
        <Typography 
          variant="h6" 
          component="h3" 
          className="video-title-english"
          sx={{
            fontWeight: 'bold',
            color: '#1a365d',
            mb: 1,
            fontSize: '1rem',
            lineHeight: 1.3
          }}
        >
          {lesson.title}
        </Typography>

        {/* Description (optional) */}
        {lesson.description && (
          <Typography 
            variant="body2" 
            className="video-description"
            sx={{
              color: '#666',
              mb: 2,
              fontSize: '0.9rem',
              lineHeight: 1.4
            }}
          >
            {lesson.description}
          </Typography>
        )}

        <Box className="video-metadata">
          <Box className="metadata-left">
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDirectPlay(lesson, e);
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
                handleDownload(lesson, e);
              }}
              className="download-button"
              title="Download Lesson"
            >
              <Download sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton 
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleShare(lesson, e);
              }}
              className="share-button"
              title="Share Lesson"
            >
              <Share sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          
        </Box>
      </CardContent>
    </Card>
  ));

  // Loading state
  if (loading) {
    return (
      <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
        <section className="selected-lessons-section section-padding">
          <div className="container">
            <SectionHeader 
              title="Selected Lessons"
              subtitle="Detailed Quranic interpretation lessons and comprehensive lectures"
            />
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          </div>
        </section>
      </AnimatedBackground>
    );
  }

  // Error state
  if (error) {
    return (
      <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
        <section className="selected-lessons-section section-padding">
          <div className="container">
            <SectionHeader 
              title="Selected Lessons"
              subtitle="Detailed Quranic interpretation lessons and comprehensive lectures"
            />
            <Alert severity="error">
              Failed to load lessons. Please try again later.
            </Alert>
          </div>
        </section>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
      <section className="selected-lessons-section section-padding">
        <div className="container">
        <SectionHeader 
          title="Selected Lessons"
          subtitle="تعلیم القرآن کی تفصیلی تفسیر میں سے لیے گے اسباق "
        />

        {/* Lessons Grid */}
        <div className="videos-grid">
          <Grid container spacing={2}>
            {selectedLessons.map((lesson) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson.id}>
                <LessonCard lesson={lesson} />
              </Grid>
            ))}
          </Grid>
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <button className="view-all-btn" onClick={handleShowMore}>
            View More
          </button>
        </div>
          </div>

          {/* Video Modal */}
          {isVideoModalOpen && selectedVideo && (
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
                    
                    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&start=0`;
                    
                    return (
                      <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
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

        </section>
        </AnimatedBackground>
      );
    };

    export default SelectedLessons;
