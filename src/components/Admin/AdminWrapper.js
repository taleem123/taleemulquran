import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Button,
  TextField,
  Container
} from '@mui/material';
import {
  Dashboard,
  VideoLibrary,
  School,
  Settings,
  Menu as MenuIcon,
  Logout,
  Home,
  Close
} from '@mui/icons-material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'react-toastify';
import AdminDashboard from './AdminDashboard';
import VideosManagement from './VideosManagement';
import LessonsManagement from './LessonsManagement';
import SettingsPage from './SettingsPage';

const drawerWidth = 260;

const AdminWrapper = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowLogin(false);
      } else {
        setUser(null);
        setShowLogin(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
    handleProfileMenuClose();
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed: ' + error.message);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Short Videos', icon: <VideoLibrary />, path: '/admin/videos' },
    { text: 'Lessons', icon: <School />, path: '/admin/lessons' },
    { text: 'Settings', icon: <Settings />, path: '/admin/settings' }
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar 
        sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          minHeight: { xs: 56, sm: 64 }
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          Taleem Ul Quran
        </Typography>
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            edge="end"
          >
            <Close />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                  color: isActive ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? theme.palette.primary.dark 
                      : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => window.open('/', '_blank')}
            sx={{
              mx: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="View Public Site" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2, backgroundColor: theme.palette.grey[100] }}>
        <Typography variant="caption" color="text.secondary">
          Logged in as:
        </Typography>
        <Typography variant="body2" noWrap sx={{ fontWeight: 'bold' }}>
          {user?.email}
        </Typography>
      </Box>
    </Box>
  );

  if (showLogin) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 2
        }}
      >
        <Box
          sx={{
            background: 'white',
            borderRadius: 2,
            p: { xs: 3, sm: 4 },
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: 400
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Admin Login
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
            Enter your credentials to access the admin panel
          </Typography>
          <LoginForm onLogin={handleLogin} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', direction: 'ltr' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Portal
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.grey[50],
          mt: { xs: 7, sm: 8 },
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/videos" element={<VideosManagement />} />
            <Route path="/lessons" element={<LessonsManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

// Login Form Component
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      await onLogin(email, password);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        autoComplete="email"
        autoFocus
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default AdminWrapper;