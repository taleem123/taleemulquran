import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import {
  PlayArrow,
  Share,
  OpenInNew,
  Download
} from '@mui/icons-material';
import UniversalVideoPlayer from '../../design-system/components/UniversalVideoPlayer';
import { getThumbnailUrl } from '../../utils/videoPlatforms';
import SectionHeader from '../SectionHeader';
import './style.css';

const SelectedLessons = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Selected lessons data - longer videos (15-20 minutes)
  const selectedLessons = [
    {
      id: 1,
      title: 'Tafseer Lesson 1: Understanding Surah Al-Fatiha',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'A comprehensive tafseer lesson explaining the deep meanings and interpretations of Surah Al-Fatiha, the opening chapter of the Quran.'
    },
    {
      id: 2,
      title: 'Tafseer Lesson 2: Stories of the Prophets',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'An in-depth exploration of the stories of prophets mentioned in the Quran and the lessons we can learn from their lives.'
    },
    {
      id: 3,
      title: 'Tafseer Lesson 3: Islamic Ethics and Morals',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'A detailed study of Islamic ethics and moral values as taught in the Quran, with practical applications for daily life.'
    }
  ];

  const handleVideoClick = useCallback((video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  }, []);

  const handleDirectPlay = useCallback((video, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.sources && video.sources[0]) {
      window.open(video.sources[0], '_blank');
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
    if (video.sources && video.sources[0]) {
      const link = document.createElement('a');
      link.href = video.sources[0];
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

  const LessonCard = ({ lesson }) => (
    <Card 
      className="video-card"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleVideoClick(lesson);
      }}
    >
      <Box className="video-thumbnail-container">
        {lesson.thumb || lesson.thumbnail ? (
          <CardMedia
            component="img"
            height="200"
            image={lesson.thumb || lesson.thumbnail}
            alt={lesson.title}
            className="video-thumbnail"
          />
        ) : (
          <Box 
            className="video-thumbnail-placeholder"
            sx={{
              height: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: lesson.platform === 'facebook' ? '#1877f2' : 
                             lesson.platform === 'tiktok' ? '#000000' : 
                             lesson.platform === 'youtube' ? '#ff0000' : '#666666',
              color: 'white',
              fontSize: '3rem'
            }}
          >
            {getPlatformIcon(lesson.platform)}
            <Typography variant="caption" sx={{ mt: 1, fontSize: '0.8rem' }}>
              {lesson.platform?.toUpperCase()}
            </Typography>
          </Box>
        )}
        
        <Box className="play-button-overlay">
          <IconButton className="play-button" size="large">
            <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
          </IconButton>
        </Box>

        <Chip
          label="Lesson"
          size="small"
          className="duration-badge"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        />

        <Box className="platform-icon">
          {getPlatformIcon(lesson.platform)}
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
          
          <Box className="metadata-right">
            <Box className="metadata-item">
              <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                YouTube
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <section className="selected-lessons-section section-padding">
      <div className="container">
        <SectionHeader 
          title="منتخب اسباق"
          subtitle="تعلیم القرآن کی تفصیلی تفسیر کے اسباق اور طویل لیکچرز"
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
            مزید دیکھیے
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <UniversalVideoPlayer
          video={selectedVideo}
          isModal={true}
          onClose={handleCloseVideo}
          showDownload={true}
          showShare={true}
        />
      )}
    </section>
  );
};

export default SelectedLessons;
