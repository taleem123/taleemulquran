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
import AnimatedBackground from '../AnimatedBackground';
import './style.css';

const RecentVideos = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Real video data from the provided JSON
  const recentVideos = [
    {
      id: 1,
      title: 'Islamic Teaching Video 1',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'A beautiful Islamic teaching video about Quranic lessons and moral values.'
    },
    {
      id: 2,
      title: 'Islamic Teaching Video 2',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'Another inspiring Islamic video sharing wisdom from the Quran.'
    },
    {
      id: 3,
      title: 'Islamic Teaching Video 3',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'Learn about Islamic principles through this educational video.'
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
        text: video.titleUrdu,
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
      link.download = `${video.title || 'video'}.mp4`;
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
    navigate('/shorts');
  }, [navigate]);

  const getPlatformIcon = (platform) => {
    return '';
    // switch (platform) {
    //   case 'facebook':
    //     return '📘';
    //   case 'youtube':
    //     return '📺';
    //   case 'tiktok':
    //     return '🎵';
    //   default:
    //     return '🎥';
    // }
  };

  const VideoCard = ({ video }) => (
    <Card 
      className="video-card"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleVideoClick(video);
      }}
    >
      <Box className="video-thumbnail-container">
        {video.thumb || video.thumbnail ? (
          <CardMedia
            component="img"
            height="200"
            image={video.thumb || video.thumbnail}
            alt={video.title}
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
        
        <Box className="play-button-overlay">
          <IconButton className="play-button" size="large">
            <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
          </IconButton>
        </Box>

        <Chip
          label="Video"
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
          {getPlatformIcon(video.platform)}
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
              lineHeight: 1.4
            }}
          >
            {video.description}
          </Typography>
        )}

        <Box className="video-metadata">
          <Box className="metadata-left">
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
    <AnimatedBackground variant="warm" particleCount={0} enableParticles={false}>
      <section className="recent-videos-section section-padding">
        <div className="container">
        <SectionHeader 
          title="شارٹ ویڈیوز"
          subtitle="تعلیم القرآن  کی تازہ ترین شارٹ ویڈیو تشریحات"
        />

        {/* Videos Grid */}
        <div className="videos-grid">
          <Grid container spacing={2}>
            {recentVideos.map((video) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
                <VideoCard video={video} />
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
    </AnimatedBackground>
  );
};

export default RecentVideos;