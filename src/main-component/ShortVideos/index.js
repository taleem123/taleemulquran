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
  Visibility,
  CalendarToday,
  OpenInNew,
  Search,
  Download
} from '@mui/icons-material';
import UniversalVideoPlayer from '../../components/UniversalVideoPlayer';
import { getVideoInfo, getThumbnailUrl } from '../../utils/videoPlatforms';

import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import './style.css'

const ShortVideos = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Real video data from the provided JSON
  const allVideos = [
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
      title: 'Facebook Islamic Reel',
      titleUrdu: 'فیس بک اسلامی رییل',
      subtitleUrdu: 'قرآن کریم کی مختصر تعلیمات',
      description: 'A beautiful Islamic reel shared on Facebook about Quranic teachings and daily life lessons.',
      sources: ['https://www.facebook.com/reel/1937160177055027'],
      thumb: null, // Facebook doesn't provide direct thumbnails
      duration: '0:45',
      views: '85K',
      date: '1/10/2024',
      platform: 'facebook',
      category: 'ethics'
    },
    {
      id: 3,
      title: 'TikTok Islamic Short',
      titleUrdu: 'ٹک ٹاک اسلامی شارٹ',
      subtitleUrdu: 'قرآن کریم کی مختصر تعلیمات',
      description: 'A short and engaging TikTok video about Islamic teachings and moral values.',
      sources: ['https://www.tiktok.com/@islamicteacher/video/1234567890123456789'],
      thumb: null, // TikTok doesn't provide direct thumbnails
      duration: '0:30',
      views: '150K',
      date: '1/15/2024',
      platform: 'tiktok',
      category: 'tafseer'
    },
    {
      id: 4,
      title: 'For Bigger Escape',
      titleUrdu: 'بڑی فرار کے لیے - اسلامی تعلیمات',
      subtitleUrdu: 'قرآن کریم میں فرار کی تعلیمات',
      description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman\'s escapes aren\'t quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.',
      sources: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'],
      thumb: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      duration: '0:15',
      views: '28K',
      date: '1/20/2024',
      platform: 'youtube',
      category: 'prayer'
    },
    {
      id: 5,
      title: 'For Bigger Fun',
      titleUrdu: 'بڑی تفریح کے لیے - اسلامی تعلیمات',
      subtitleUrdu: 'قرآن کریم میں تفریح کی تعلیمات',
      description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35. Find out more at google.com/chromecast.',
      sources: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'],
      thumb: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
      duration: '0:15',
      views: '19K',
      date: '1/25/2024',
      platform: 'youtube',
      category: 'benefits'
    },
    {
      id: 6,
      title: 'Sintel',
      titleUrdu: 'سینٹل - اسلامی تعلیمات',
      subtitleUrdu: 'قرآن کریم کی روشنی میں اخلاقی تعلیمات',
      description: 'Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender.',
      sources: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'],
      thumb: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
      duration: '15:00',
      views: '22K',
      date: '1/30/2024',
      platform: 'youtube',
      category: 'family'
    }
  ];

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = allVideos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.titleUrdu.includes(searchTerm) ||
        video.subtitleUrdu.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(video => video.category === filterBy);
    }

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
  }, [searchTerm, sortBy, filterBy]);

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
  //     const results = await testAllVideoUrls(allVideos);
  //     logVideoTestResults(results);
  //   };
  //   testVideos();
  // }, []);

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

  return (
        <Fragment>
      <Navbar />
      
      <section className="service-single-section section-padding">
        <div className="container">
          <div className="service-single-content">
            <h2>شارٹ ویڈیوز</h2>
            <p>قرآن کریم کی تمام ویڈیو تشریحات اور تعلیمات</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <TextField
              fullWidth
              placeholder="ویڈیوز تلاش کریں..."
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
              {filteredVideos.length} میں سے {allVideos.length} ویڈیوز دکھائی جا رہی ہیں
            </Typography>
          </div>

          {/* Videos Grid */}
          <div className="videos-grid">
            <Grid container spacing={2}>
              {filteredVideos.length === 0 ? (
                <Grid size={12}>
                  <div className="empty-state">
                    <div className="empty-state-icon">🎥</div>
                    <h3>کوئی ویڈیو نہیں ملی</h3>
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
                filteredVideos.map((video) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
                    <VideoCard video={video} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>
      </section>

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
export default ShortVideos;
