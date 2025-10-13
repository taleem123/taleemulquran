import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import { 
  PlayArrow, 
  Download, 
  Share, 
  BookmarkBorder, 
  Bookmark,
  Info
} from '@mui/icons-material';
import videoImage from '../../images/video.png';
import pdfImage from '../../images/pdf.png';
import audioImage from '../../images/audio.png';
import shortVideos from '../../images/shortvideos.png';
import './style.css';

const EnhancedServiceCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [bookmarkedServices, setBookmarkedServices] = useState(new Set());

  const handleCardHover = useCallback((cardId) => {
    setHoveredCard(cardId);
  }, []);

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const toggleBookmark = useCallback((serviceId) => {
    setBookmarkedServices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback((service) => {
    if (navigator.share) {
      navigator.share({
        title: service.title,
        text: service.description,
        url: window.location.origin + service.path
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.origin + service.path);
      // You could show a toast notification here
    }
  }, []);

  const services = [
    {
      id: 'audio',
      title: 'تعلیم القرآن ( آڈیو تفسیر )',
      englishTitle: 'Audio Tafseer',
      description: 'Listen to authentic Quranic tafseer with detailed explanations',
      image: audioImage,
      path: '/tafseer/audios',
      available: true,
      features: ['High Quality Audio', 'Downloadable', 'Offline Access'],
      color: '#00a7d5'
    },
    {
      id: 'shorts',
      title: 'تعلیم القرآن ( شارٹ ویڈیوز )',
      englishTitle: 'Short Videos',
      description: 'Quick video lessons perfect for social media sharing',
      image: shortVideos,
      path: '/tafseer/shortvideos',
      available: false,
      features: ['Social Media Ready', 'Quick Learning', 'Shareable'],
      color: '#e74c3c'
    },
    {
      id: 'pdf',
      title: 'تعلیم القرآن ( پی ڈی ایف تفسیر )',
      englishTitle: 'PDF Tafseer',
      description: 'Download and read detailed written tafseer',
      image: pdfImage,
      path: '/tafseer/pdf',
      available: false,
      features: ['Downloadable PDF', 'Offline Reading', 'Print Friendly'],
      color: '#f39c12'
    },
    {
      id: 'video',
      title: 'تعلیم القرآن ( ویڈیو تفسیر )',
      englishTitle: 'Video Tafseer',
      description: 'Watch comprehensive video explanations',
      image: videoImage,
      path: '/tafseer/video',
      available: false,
      features: ['Visual Learning', 'HD Quality', 'Interactive'],
      color: '#9b59b6'
    }
  ];

  const ServiceCard = ({ service }) => {
    const isHovered = hoveredCard === service.id;
    const isBookmarked = bookmarkedServices.has(service.id);

    return (
      <Card
        className={`service-card ${!service.available ? 'coming-soon' : ''}`}
        onMouseEnter={() => handleCardHover(service.id)}
        onMouseLeave={handleCardLeave}
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 15px 35px rgba(0, 0, 0, 0.15)' 
            : '0 5px 15px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            '& .service-overlay': {
              opacity: 1,
            },
            '& .service-actions': {
              opacity: 1,
              transform: 'translateY(0)',
            }
          }
        }}
      >
        {/* Coming Soon Badge */}
        {!service.available && (
          <Chip
            label="Coming Soon"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
              fontWeight: 'bold'
            }}
          />
        )}

        {/* Bookmark Button */}
        <IconButton
          className="bookmark-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(service.id);
          }}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'white',
            }
          }}
        >
          {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
        </IconButton>

        {/* Card Media */}
        <CardMedia
          component="div"
          className="service-media"
          sx={{
            height: 200,
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${service.color}20, ${service.color}40)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }
          }}
        >
          {/* Overlay with actions */}
          <Fade in={isHovered} timeout={300}>
            <Box
              className="service-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <Box className="service-actions" sx={{ display: 'flex', gap: 2 }}>
                {service.available ? (
                  <>
                    <Tooltip title="Start Learning">
                      <IconButton
                        component={Link}
                        to={service.path}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <PlayArrow />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        sx={{
                          backgroundColor: 'secondary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'secondary.dark',
                            transform: 'scale(1.1)',
                          }
                        }}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <Tooltip title="Coming Soon">
                    <IconButton
                      sx={{
                        backgroundColor: 'error.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'error.dark',
                        }
                      }}
                    >
                      <Info />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Share">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleShare(service);
                    }}
                    sx={{
                      backgroundColor: 'success.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'success.dark',
                        transform: 'scale(1.1)',
                      }
                    }}
                  >
                    <Share />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Fade>
        </CardMedia>

        {/* Card Content */}
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom
            className="urdu-font"
            sx={{
              fontWeight: 'bold',
              color: service.available ? 'text.primary' : 'text.disabled',
              mb: 1
            }}
          >
            {service.title}
          </Typography>

          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            {service.englishTitle}
          </Typography>

          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.6 }}
          >
            {service.description}
          </Typography>

          {/* Features */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {service.features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  borderColor: service.color,
                  color: service.color,
                  '&:hover': {
                    backgroundColor: `${service.color}10`,
                  }
                }}
              />
            ))}
          </Box>

          {/* Action Button */}
          {service.available ? (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to={service.path}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: service.color,
                  '&:hover': {
                    backgroundColor: service.color,
                    filter: 'brightness(0.9)',
                  },
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Start Learning
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                disabled
                fullWidth
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}
              >
                Coming Soon
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="enhanced-service-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title">
              <h2>تعلیم القرآن</h2>
              <hr />
              <p className="urdu-font">
                ٹیکنالوجی کے دور میں جہاں اچھائی اور برائی ایک کلک پر دستیاب ہے وہاں ضرورت اس امر کی ہے کہ قرآن مجید کے حقیقی علم کو عوام میں روشناس کروا نے کے لیے تعلیم القرآن جیسی نایاب تفسیر اب ڈیجیٹل صورت میں بھی دستیاب ہو۔
              </p>
              <p className="urdu-font">
                قرآن پاک کی یہ حیرت انگیز تفسیر سلف صالحین کی تعلیمات کو حالات حاضرہ سے روشناس اور مربوط کرتی ہے۔
              </p>
            </div>
          </div>
        </div>

        <div className="service-grid">
          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedServiceCards;
