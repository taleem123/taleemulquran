import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Avatar,
  useTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Add,
  TrendingUp,
  VideoLibrary,
  School,
  CheckCircle,
  Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { addMultipleTestVideos, addTestLesson } from '../../utils/addTestData';

const AdminDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalShortVideos: 0,
    totalLessons: 0,
    activeVideos: 0,
    totalViews: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [shortVideosSnapshot, lessonsSnapshot] = await Promise.all([
        getDocs(collection(db, 'shortVideos')),
        getDocs(collection(db, 'lessons'))
      ]);

      const shortVideos = shortVideosSnapshot.docs.map(doc => doc.data());
      const lessons = lessonsSnapshot.docs.map(doc => doc.data());

      setStats({
        totalShortVideos: shortVideos.length,
        totalLessons: lessons.length,
        activeVideos: [...shortVideos, ...lessons].filter(item => item.isActive).length,
        totalViews: [...shortVideos, ...lessons].reduce((sum, item) => sum + (item.views || 0), 0)
      });

      // Get recent items for activity
      const allItems = [
        ...shortVideos.map(v => ({ ...v, type: 'video' })),
        ...lessons.map(l => ({ ...l, type: 'lesson' }))
      ]
        .filter(item => item.createdAt)
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 5);

      setRecentActivity(allItems);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestData = async () => {
    try {
      await addMultipleTestVideos();
      await addTestLesson();
      loadStats(); // Reload stats
      alert('Test data added successfully!');
    } catch (error) {
      console.error('Error adding test data:', error);
      alert('Error adding test data: ' + error.message);
    }
  };

  const StatCard = ({ title, value, icon, color, subtitle, onClick }) => (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        } : {}
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="subtitle2">
              {title}
            </Typography>
            <Typography variant="h3" component="div" color={color} sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Box display="flex" alignItems="center">
                <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  {subtitle}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 64, height: 64 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your content.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Short Videos"
            value={stats.totalShortVideos}
            icon={<VideoLibrary sx={{ fontSize: 32 }} />}
            color="primary.main"
            subtitle="View all videos"
            onClick={() => navigate('/admin/videos')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Lessons"
            value={stats.totalLessons}
            icon={<School sx={{ fontSize: 32 }} />}
            color="secondary.main"
            subtitle="View all lessons"
            onClick={() => navigate('/admin/lessons')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Content"
            value={stats.activeVideos}
            icon={<CheckCircle sx={{ fontSize: 32 }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            icon={<Visibility sx={{ fontSize: 32 }} />}
            color="info.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {recentActivity.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                No recent activity
              </Typography>
            ) : (
              <List>
                {recentActivity.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ px: 0 }}>
                      <Avatar sx={{ bgcolor: item.type === 'video' ? 'primary.main' : 'secondary.main', mr: 2 }}>
                        {item.type === 'video' ? <VideoLibrary /> : <School />}
                      </Avatar>
                      <ListItemText
                        primary={item.title}
                        secondary={`${item.type === 'video' ? 'Video' : 'Lesson'} • ${item.category || 'Uncategorized'}`}
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                onClick={() => navigate('/admin/videos')}
                color="primary"
              >
                Add Short Video
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                fullWidth
                onClick={() => navigate('/admin/lessons')}
                color="secondary"
              >
                Add Lesson
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => window.open('/', '_blank')}
              >
                View Public Site
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleAddTestData}
                color="secondary"
                sx={{ mt: 1 }}
              >
                Add Test Data
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Content Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Total Content
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {stats.totalShortVideos + stats.totalLessons}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.activeVideos}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Inactive
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                  {stats.totalShortVideos + stats.totalLessons - stats.activeVideos}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;