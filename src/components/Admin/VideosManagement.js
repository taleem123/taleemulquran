import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
  Chip,
  Grid
} from '@mui/material';
import { Add, Edit, Delete, Visibility, PlayArrow, Save, Cancel, Refresh, VideoLibrary } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getThumbnailUrl } from '../../utils/videoPlatforms';
import { validateVideoData, sanitizeInput } from '../../utils/validation';

const VideosManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    platform: 'youtube',
    category: 'tafseer',
    isActive: true
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'shortVideos'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      url: '',
      platform: 'youtube',
      category: 'tafseer',
      isActive: true
    });
    setOpenDialog(true);
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title || '',
      description: video.description || '',
      url: video.url || '',
      platform: video.platform || 'youtube',
      category: video.category || 'tafseer',
      isActive: video.isActive !== undefined ? video.isActive : true
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      // Sanitize input data
      const sanitizedData = {
        title: sanitizeInput(formData.title),
        description: sanitizeInput(formData.description),
        url: sanitizeInput(formData.url),
        platform: formData.platform,
        category: formData.category,
        isActive: formData.isActive
      };

      // Validate data
      const validation = validateVideoData(sanitizedData);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach(error => {
          toast.error(error);
        });
        return;
      }

      const videoData = {
        ...sanitizedData,
        thumbnail: getThumbnailUrl(sanitizedData.platform, sanitizedData.url),
        updatedAt: new Date()
      };

      if (editingVideo) {
        await updateDoc(doc(db, 'shortVideos', editingVideo.id), videoData);
        toast.success('Video updated successfully');
      } else {
        videoData.createdAt = new Date();
        videoData.views = 0;
        await addDoc(collection(db, 'shortVideos'), videoData);
        toast.success('Video added successfully');
      }

      setOpenDialog(false);
      loadVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Failed to save video');
    }
  };

  const handleDelete = async (video) => {
    if (window.confirm(`Are you sure you want to delete "${video.title}"?`)) {
      try {
        await deleteDoc(doc(db, 'shortVideos', video.id));
        toast.success('Video deleted successfully');
        loadVideos();
      } catch (error) {
        console.error('Error deleting video:', error);
        toast.error('Failed to delete video');
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4" component="h1">
          Short Videos Management
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={loadVideos}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            Add Video
          </Button>
        </Box>
      </Box>

      {videos.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <VideoLibrary sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No videos found
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd} sx={{ mt: 2 }}>
            Add Your First Video
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <Box
                      sx={{
                        width: 80,
                        height: 60,
                        backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : 'none',
                        backgroundColor: '#f5f5f5',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {!video.thumbnail && <PlayArrow sx={{ color: 'text.secondary' }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap sx={{ maxWidth: 250 }}>
                      {video.title}
                    </Typography>
                    {video.description && (
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 250 }}>
                        {video.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={video.platform?.toUpperCase() || 'Unknown'} size="small" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Chip label={video.category || 'Uncategorized'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={video.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      color={video.isActive ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => window.open(video.url, '_blank')} title="View">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleEdit(video)} title="Edit">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(video)} title="Delete" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Video URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  label="Platform"
                >
                  <MenuItem value="youtube">YouTube</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="tiktok">TikTok</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                >
                  <MenuItem value="tafseer">Tafseer</MenuItem>
                  <MenuItem value="ethics">Ethics</MenuItem>
                  <MenuItem value="prayer">Prayer</MenuItem>
                  <MenuItem value="benefits">Benefits</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} startIcon={<Cancel />}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
            {editingVideo ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideosManagement;
