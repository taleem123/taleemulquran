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
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Logo from '../../images/slider/no-bg-logo.png';
import EnhancedSearch from '../EnhancedSearch';

const EnhancedHeader = () => {
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
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'About', path: '/about', icon: <InfoIcon /> },
    { label: 'Contact', path: '/contact', icon: <ContactIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
        <img src={Logo} alt="Taleem ul Quran" style={{ height: 40, marginRight: 10 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Taleem Ul Quran
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              }
            }}
          >
            <Box sx={{ mr: 2, color: 'primary.main' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'white', 
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              mr: 4
            }}
            onClick={() => handleNavigation('/')}
          >
            <img 
              src={Logo} 
              alt="Taleem ul Quran" 
              style={{ height: 50, marginRight: 10 }} 
            />
            {!isMobile && (
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                تعلیم القرآن
              </Typography>
            )}
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{ 
                    mr: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 167, 213, 0.1)',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Search and Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={toggleSearch}
              sx={{
                backgroundColor: showSearch ? 'primary.main' : 'transparent',
                color: showSearch ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: showSearch ? 'primary.dark' : 'rgba(0, 167, 213, 0.1)',
                }
              }}
            >
              <SearchIcon />
            </IconButton>

            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Search Bar */}
        {showSearch && (
          <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderTop: '1px solid #eee' }}>
            <EnhancedSearch 
              onSurahSelect={handleSurahSelect}
              placeholder="Search Surahs by name, translation, or number..."
            />
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default EnhancedHeader;
