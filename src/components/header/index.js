import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Search as SearchIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Logo from '../../images/slider/no-bg-logo.png';
import HeaderTopbar from '../HeaderTopbar';
import EnhancedSearch from '../EnhancedSearch';
import './style.css';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleSurahSelect = useCallback((surah) => {
    navigate(`/tafseer/audios/${surah.number}`, { state: { surah } });
    setShowSearch(false);
  }, [navigate]);

  const toggleSearch = useCallback(() => {
    setShowSearch(!showSearch);
  }, [showSearch]);

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Modern Drawer Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          p: 3,
          background: 'linear-gradient(135deg, #00a7d5, #00ded8)',
          color: 'white',
          position: 'relative',
          minHeight: '180px'
        }}
      >
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <img 
          src={Logo} 
          alt="Taleem ul Quran" 
          style={{ 
            height: 60, 
            marginBottom: 12,
            filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }} 
        />
        {/* <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Taleem Ul Quran
        </Typography> */}
        <Typography 
          variant="caption" 
          sx={{ 
            opacity: 0.9,
            fontSize: '0.85rem',
            mt: 0.5
          }}
        >
          Taleem Ul Quran
        </Typography>
      </Box>

      {/* Search in Mobile Drawer */}
      <Box sx={{ px: 2, pt: 3, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            handleDrawerToggle();
            setShowSearch(true);
          }}
          sx={{
            background: 'linear-gradient(135deg, #00a7d5, #00ded8)',
            color: 'white',
            borderRadius: '12px',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 167, 213, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #0088b3, #00c4bf)',
              boxShadow: '0 6px 16px rgba(0, 167, 213, 0.4)',
            }
          }}
        >
        </Button>
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 2, py: 2, mb: 8 }}>
        {navigationItems.map((item, index) => (
          <ListItem 
            key={item.label}
            button 
            onClick={() => handleNavigation(item.path)}
            sx={{
              borderRadius: '12px',
              mb: 1.5,
              py: 2,
              px: 3,
              transition: 'all 0.3s ease',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              '&:hover': {
                backgroundColor: 'rgba(0, 167, 213, 0.08)',
                boxShadow: '0 4px 12px rgba(0, 167, 213, 0.15)',
              }
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 600,
                  fontSize: '1.15rem',
                  color: '#1a365d',
                  textAlign: 'center',
                  direction: 'ltr'
                }
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Footer Info */}
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 167, 213, 0.1)',
          backgroundColor: 'rgba(0, 167, 213, 0.03)'
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#666',
            fontSize: '0.75rem'
          }}
        >
          © 2024 Taleem Ul Quran
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <HeaderTopbar/>
      <AppBar 
        position="sticky" 
        className="modern-header"
        sx={{ 
          background: isMobile ? 'white' : 'linear-gradient(135deg, #00a7d5 0%, #00ded8 100%)', 
          color: isMobile ? 'text.primary' : 'white',
          boxShadow: '0 4px 20px rgba(0, 167, 213, 0.15)',
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: isMobile ? '3px solid' : 'none',
          borderImage: isMobile ? 'linear-gradient(90deg, #00a7d5, #00ded8) 1' : 'none',
          display: isMobile && mobileOpen ? 'none' : 'block'
        }}
      >
        <Toolbar sx={{ py: 1.5, minHeight: { xs: 70, md: 80 } }}>
          {/* Mobile Menu Button - FAR LEFT */}
          {isMobile && (
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="menu-button"
              sx={{
                background: 'linear-gradient(135deg, #00a7d5, #00ded8)',
                color: 'white',
                width: 45,
                height: 45,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 167, 213, 0.3)',
                mr: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #0088b3, #00c4bf)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 167, 213, 0.4)',
                }
              }}
            >
              <MenuIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}

          {/* Logo - CENTER (Mobile) / LEFT (Desktop) */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              mr: isMobile ? 'auto' : 2,
              ml: isMobile ? 'auto' : 0,
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => handleNavigation('/')}
          >
            <img 
              src={Logo} 
              alt="Taleem ul Quran" 
              style={{ 
                height: isMobile ? 50 : 60, 
                marginRight: 10,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }} 
            />
          </Box>

          {/* Desktop Navigation - LEFT Side (after logo) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className="nav-button"
                  sx={{ 
                    px: 3,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    fontFamily: '"Roboto", "Arial", sans-serif',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: 0,
                      height: '3px',
                      background: 'white',
                      transition: 'all 0.3s ease',
                      transform: 'translateX(-50%)'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      '&:before': {
                        width: '80%'
                      }
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Button - RIGHT Side (Desktop Only) */}
          {!isMobile && (
            <IconButton
              onClick={toggleSearch}
              className="action-button"
              sx={{
                backgroundColor: showSearch ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                width: 45,
                height: 45,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                boxShadow: showSearch ? '0 4px 12px rgba(255, 255, 255, 0.2)' : 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              <SearchIcon sx={{ fontSize: 22 }} />
            </IconButton>
          )}
        </Toolbar>

        {/* Search Bar */}
        {showSearch && (
          <Box 
            className="search-bar-container"
            sx={{ 
              p: 2.5, 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderTop: '1px solid rgba(0, 167, 213, 0.1)',
              animation: 'slideDown 0.3s ease'
            }}
          >
            <EnhancedSearch 
              onSurahSelect={handleSurahSelect}
              placeholder="Search by surah names, translation or numbers..."
            />
          </Box>
        )}
      </AppBar>

      {/* Modern Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '85vw', sm: 320 },
            maxWidth: 320,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            borderLeft: '3px solid',
            borderImage: 'linear-gradient(180deg, #00a7d5, #00ded8) 1',
            overflowX: 'hidden'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;