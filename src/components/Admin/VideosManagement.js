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
  Grid,
  Fade,
  Collapse,
  Alert,
  Backdrop
} from '@mui/material';
import { Add, Edit, Delete, Visibility, PlayArrow, Save, Cancel, Refresh, VideoLibrary } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getThumbnailUrl } from '../../utils/videoPlatforms';
import { sanitizeInput } from '../../utils/validation';

const VideosManagement = () => {
  const validateAndTransformUrl = (url) => {
    try {
      const urlObj = new URL(url);
      let isValid = false;
      let transformedUrl = url;

      // Support youtube.com and youtu.be
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        isValid = true;
        // Extract video ID and standardize URL
        const videoId = urlObj.hostname.includes('youtu.be') 
          ? urlObj.pathname.slice(1)
          : urlObj.searchParams.get('v');
        if (videoId) {
          transformedUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }
      }

      return {
        isValid,
        url: transformedUrl,
        message: isValid ? '' : 'Please enter a valid YouTube URL'
      };
    } catch {
      return {
        isValid: false,
        url: url,
        message: 'Please enter a valid URL'
      };
    }
  };

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, 'shortVideos'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videosData);
    } catch (error) {
      console.error('Error loading videos:', error);
      setError('Failed to load videos. Please try again.');
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
      // Validate URL format and transform if needed
      const urlValidation = validateAndTransformUrl(formData.url.trim());
      if (!urlValidation.isValid) {
        toast.error(urlValidation.message);
        return;
      }

      // Sanitize input data
      const sanitizedData = {
        title: sanitizeInput(formData.title),
        description: sanitizeInput(formData.description),
        url: sanitizeInput(urlValidation.url), // Use transformed URL
        platform: formData.platform,
        category: formData.category,
        isActive: formData.isActive
      };

      // Validate data
      if (!sanitizedData.title.trim()) {
        toast.error('Title is required');
        return;
      }

      setSaving(true);
      const videoData = {
        ...sanitizedData,
        thumbnail: getThumbnailUrl(sanitizedData.platform, sanitizedData.url),
        updatedAt: new Date()
      };

      if (editingVideo) {
        // Optimistic update
        setVideos(prevVideos =>
          prevVideos.map(v =>
            v.id === editingVideo.id ? { ...v, ...videoData } : v
          )
        );
        await updateDoc(doc(db, 'shortVideos', editingVideo.id), videoData);
        toast.success('Video updated successfully');
      } else {
        videoData.createdAt = new Date();
        videoData.views = 0;
        // Optimistic update
        const tempId = Date.now().toString();
        setVideos(prevVideos => [{ id: tempId, ...videoData }, ...prevVideos]);
        const docRef = await addDoc(collection(db, 'shortVideos'), videoData);
        setVideos(prevVideos =>
          prevVideos.map(v =>
            v.id === tempId ? { ...v, id: docRef.id } : v
          )
        );
        toast.success('Video added successfully');
      }

      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Failed to save video');
    }
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!videoToDelete) return;

    try {
      setDeleting(videoToDelete.id);
      // Optimistic update
      setVideos(prevVideos => prevVideos.filter(v => v.id !== videoToDelete.id));
      await deleteDoc(doc(db, 'shortVideos', videoToDelete.id));
      toast.success('Video deleted successfully');
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
      // Revert optimistic update
      loadVideos();
    } finally {
      setDeleting(null);
      setDeleteDialogOpen(false);
      setVideoToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setVideoToDelete(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true}>
      <Box>
        {error && (
          <Collapse in={!!error}>
            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Typography variant="h4" component="h1">
            Short Videos Management
          </Typography>
          <Box display="flex" gap={1}>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />} 
              onClick={loadVideos}
              disabled={loading}>
              Refresh
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={handleAdd}
              disabled={loading}>
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
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(video)}
                      title="Delete"
                      color="error"
                      disabled={deleting === video.id}
                    >
                      {deleting === video.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Delete />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => !saving && setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {editingVideo ? 'Edit Video' : 'Add New Video'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid sx={{ gridColumn: 'span 12' }}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={saving}
                error={!formData.title.trim()}
                helperText={!formData.title.trim() ? 'Title is required' : ''}
              />
            </Grid>
            <Grid sx={{ gridColumn: 'span 12' }}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
                disabled={saving}
              />
            </Grid>
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                fullWidth
                label="Video URL"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                placeholder="https://www.youtube.com/watch?v=..."
                disabled={saving}
                error={!formData.url.trim() || !validateAndTransformUrl(formData.url, formData.platform).isValid}
                helperText={
                  !formData.url.trim() 
                    ? 'URL is required' 
                    : validateAndTransformUrl(formData.url, formData.platform).message
                }
              />
            </Grid>
            {/* Platform is fixed to YouTube */}
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
                Platform: <Chip label="YouTube" size="small" color="primary" />
              </Typography>
            </Grid>
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControl fullWidth disabled={saving}>
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
            <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    disabled={saving}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            startIcon={<Cancel />}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} /> : <Save />}
            disabled={
              saving || 
              !formData.title.trim() || 
              !formData.url.trim() || 
              !validateAndTransformUrl(formData.url, formData.platform).isValid
            }
          >
            {saving ? 'Saving...' : editingVideo ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          Delete Video?
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography>
            Are you sure you want to delete "{videoToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            disabled={deleting === videoToDelete?.id}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting === videoToDelete?.id}
            startIcon={deleting === videoToDelete?.id ? <CircularProgress size={20} /> : <Delete />}
          >
            {deleting === videoToDelete?.id ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={loading} sx={{ zIndex: 9999 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
    </Fade>
  );
};

export default VideosManagement;
