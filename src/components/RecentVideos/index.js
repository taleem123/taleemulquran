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
  Button,
  Dialog,
  DialogContent
} from '@mui/material';
import {
  PlayArrow,
  Share,
  Visibility,
  CalendarToday,
  OpenInNew,
  Download
} from '@mui/icons-material';
import UniversalVideoPlayer from '../UniversalVideoPlayer';
import { getVideoInfo, getThumbnailUrl } from '../../utils/videoPlatforms';
import { testAllVideoUrls, logVideoTestResults } from '../../utils/videoTest';
import './style.css';

const RecentVideos = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Real video data from the provided JSON
  const recentVideos = [
    {
      id: 1,
      title: 'Big Buck Bunny',
      titleUrdu: 'بگ بک بنی - اسلامی تعلیمات',
      subtitleUrdu: 'قرآن کریم کی روشنی میں اخلاقی تعلیمات',
      description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain\'t no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      duration: '10:34',
      views: '31K',
      date: '1/8/2024',
      platform: 'youtube',
      category: 'tafseer'
    },
    {
      id: 2,
      title: 'Facebook Islamic Video',
      titleUrdu: 'فیس بک اسلامی ویڈیو',
      subtitleUrdu: 'قرآن کریم کی تعلیمات',
      description: 'A beautiful Islamic video shared on Facebook about Quranic teachings and moral values.',
      sources: ['https://www.facebook.com/watch/?v=1234567890123456'],
      thumb: null, // Facebook doesn't provide direct thumbnails
      duration: '5:20',
      views: '45K',
      date: '1/10/2024',
      platform: 'facebook',
      category: 'tafseer'
    },
    {
      id: 3,
      title: 'TikTok Islamic Short',
      titleUrdu: 'ٹک ٹاک اسلامی شارٹ',
      subtitleUrdu: 'قرآن کریم کی مختصر تعلیمات',
      description: 'A short and engaging TikTok video about Islamic teachings and daily life lessons.',
      sources: ['https://www.tiktok.com/@islamicteacher/video/1234567890123456789'],
      thumb: null, // TikTok doesn't provide direct thumbnails
      duration: '0:30',
      views: '120K',
      date: '1/15/2024',
      platform: 'tiktok',
      category: 'ethics'
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

  // Test video URLs on component mount (can be removed in production)
  // React.useEffect(() => {
  //   const testVideos = async () => {
  //     const results = await testAllVideoUrls(recentVideos);
  //     logVideoTestResults(results);
  //   };
  //   testVideos();
  // }, []);

  const handleShowMore = useCallback(() => {
    navigate('/shorts');
  }, [navigate]);

  const VideoCard = ({ video }) => {
    const getPlatformIcon = (platform) => {
      switch (platform) {
        case 'facebook':
          return '📘';
        case 'youtube':
          return '📺';
        default:
          return '🎥';
      }
    };

    return (
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
            {video.platform === 'facebook' ? '📘' : 
             video.platform === 'tiktok' ? '🎵' : 
             video.platform === 'youtube' ? '📺' : '🎥'}
            <Typography variant="caption" sx={{ mt: 1, fontSize: '0.8rem' }}>
              {video.platform?.toUpperCase()}
            </Typography>
          </Box>
        )}
          
          {/* Play Button Overlay */}
          <Box className="play-button-overlay">
            <IconButton 
              className="play-button"
              size="large"
            >
              <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
            </IconButton>
          </Box>

          {/* Duration Badge */}
          <Chip
            label={video.duration}
            size="small"
            className="duration-badge"
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          />

          {/* Platform Icon */}
          <Box className="platform-icon">
            {getPlatformIcon(video.platform)}
          </Box>
        </Box>

        <CardContent className="video-content">
          {/* English Title */}
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

          {/* Urdu Title */}
          <Typography 
            variant="h6" 
            component="h3" 
            className="video-title-urdu"
            sx={{
              fontWeight: 'bold',
              color: '#1a365d',
              mb: 0.5,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              direction: 'rtl',
              textAlign: 'right'
            }}
          >
            {video.titleUrdu}
          </Typography>

          {/* Urdu Subtitle */}
          <Typography 
            variant="body2" 
            className="video-subtitle-urdu"
            sx={{
              color: '#666',
              mb: 2,
              fontSize: '0.9rem',
              lineHeight: 1.4,
              direction: 'rtl',
              textAlign: 'right'
            }}
          >
            {video.subtitleUrdu}
          </Typography>

          {/* Video Metadata */}
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
                <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                  {video.date}
                </Typography>
              </Box>
              
              <Box className="metadata-item">
                <Visibility sx={{ fontSize: 14, mr: 0.5 }} />
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                  {video.views}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="service-single-section section-padding">
      <div className="container">
        <div className="service-single-content">
          <h2>حالیہ اضافہ شدہ شارٹ ویڈیوز</h2>
          <p>قرآن کریم کی تازہ ترین ویڈیو تشریحات</p>
        </div>

        <div className="videos-grid">
          <div className="videos-grid-container">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleShowMore}
            className="show-more-btn"
            sx={{
              backgroundColor: '#00a7d5',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0088b3',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 167, 213, 0.3)',
              }
            }}
          >
            مزید دیکھیے
          </Button>
        </Box>
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

export default RecentVideos;
