import React, { Fragment, useState, useCallback, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material';
import {
  PlayArrow,
  Share,
  OpenInNew,
  Search,
  Download
} from '@mui/icons-material';
import UniversalVideoPlayer from '../../design-system/components/UniversalVideoPlayer';
import { getThumbnailUrl } from '../../utils/videoPlatforms';
import SectionHeader from '../../components/SectionHeader';
import AnimatedBackground from '../../components/AnimatedBackground';

import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import './style.css'

// All lessons data - longer videos (15-20 minutes)
const allLessons = [
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
    },
    {
      id: 4,
      title: 'Tafseer Lesson 4: Understanding Prayer in Quran',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'A comprehensive study of prayer as mentioned in the Quran, its importance, and the spiritual benefits.'
    },
    {
      id: 5,
      title: 'Tafseer Lesson 5: Family Values in Islam',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'Exploring the Islamic perspective on family relationships, marriage, and raising children according to Quranic teachings.'
    },
    {
      id: 6,
      title: 'Tafseer Lesson 6: Patience and Perseverance',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      thumb: getThumbnailUrl('youtube', 'xDawAJKKgE0'),
      platform: 'youtube',
      description: 'Learning about patience and perseverance from Quranic stories and verses, and how to apply these virtues in daily life.'
    }
];

const SelectedLessonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    // Create a new array to avoid mutating the original
    let filtered = [...allLessons];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter (removed since we don't have categories anymore)
    // if (filterBy !== 'all') {
    //   filtered = filtered.filter(lesson => lesson.category === filterBy);
    // }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'most_viewed':
          return parseInt(b.views) - parseInt(a.views);
        case 'longest':
          return parseInt(b.duration.replace(':', '')) - parseInt(a.duration.replace(':', ''));
        case 'shortest':
          return parseInt(a.duration.replace(':', '')) - parseInt(b.duration.replace(':', ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

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

  const handleDownload = useCallback((video, e) => {
    e.preventDefault();
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

  const handleCloseVideo = useCallback(() => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  }, []);

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
              title="Download Video"
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
    <Fragment>
      <Navbar />
      <AnimatedBackground variant="purple" particleCount={0} enableParticles={false}>
      <section className="service-single-section section-padding">
        <div className="container">
          <SectionHeader 
            title="منتخب اسباق"
            subtitle="تفصیلی تفسیر کے اسباق، کہانیاں اور طویل لیکچرز سے نصیحتیں"
          />

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="اسباق تلاش کریں..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
              }}
              className="search-input"
            />

            <div className="filter-controls">
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>ترتیب</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="ترتیب"
                >
                  <MenuItem value="newest">تازہ ترین</MenuItem>
                  <MenuItem value="oldest">پرانی</MenuItem>
                  <MenuItem value="most_viewed">زیادہ دیکھی گئی</MenuItem>
                  <MenuItem value="longest">طویل</MenuItem>
                  <MenuItem value="shortest">مختصر</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>قسم</InputLabel>
                <Select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  label="قسم"
                >
                  <MenuItem value="all">تمام</MenuItem>
                  <MenuItem value="tafseer">تفسیر</MenuItem>
                  <MenuItem value="ethics">اخلاق</MenuItem>
                  <MenuItem value="prayer">نماز</MenuItem>
                  <MenuItem value="benefits">فوائد</MenuItem>
                  <MenuItem value="family">خاندان</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            <Typography variant="body2" color="text.secondary">
              {filteredLessons.length} میں سے {allLessons.length} ویڈیوز دکھائی جا رہی ہیں
            </Typography>
          </div>

          {/* Lessons Grid */}
          <div className="videos-grid">
            <Grid container spacing={2}>
              {filteredLessons.length === 0 ? (
                <Grid size={12}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📚</div>
                    <h3>کوئی سبق نہیں ملا</h3>
                    <p>اپنی تلاش کی شرائط کو تبدیل کرنے کی کوشش کریں</p>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setSearchTerm('');
                        setFilterBy('all');
                        setSortBy('newest');
                      }}
                    >
                      فلٹر صاف کریں
                    </Button>
                  </div>
                </Grid>
              ) : (
                filteredLessons.map((lesson) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson.id}>
                    <LessonCard lesson={lesson} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </section>
      </AnimatedBackground>

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

      <Footer footerClass={'wpo-ne-footer-2'} />
      <Scrollbar />
    </Fragment>
  );
};

export default SelectedLessonsPage;
