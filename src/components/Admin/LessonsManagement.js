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
import { Add, Edit, Delete, Visibility, PlayArrow, Save, Cancel, Refresh, School } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getThumbnailUrl } from '../../utils/videoPlatforms';

const LessonsManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    platform: 'youtube',
    category: 'tafseer',
    isActive: true
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(collection(db, 'lessons'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const lessonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error loading lessons:', error);
      setError('Failed to load lessons. Please try again.');
      toast.error('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLesson(null);
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

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
    setFormData({
      title: lesson.title || '',
      description: lesson.description || '',
      url: lesson.url || '',
      platform: lesson.platform || 'youtube',
      category: lesson.category || 'tafseer',
      isActive: lesson.isActive !== undefined ? lesson.isActive : true
    });
    setOpenDialog(true);
  };

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

  const handleSave = async () => {
    try {
      if (!formData.title.trim()) {
        toast.error('Title is required');
        return;
      }
      if (!formData.url.trim()) {
        toast.error('Lesson URL is required');
        return;
      }
      
      const urlValidation = validateAndTransformUrl(formData.url);
      if (!urlValidation.isValid) {
        toast.error(urlValidation.message);
        return;
      }

      // Use the transformed URL
      formData.url = urlValidation.url;

      setSaving(true);
      const lessonData = {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        platform: formData.platform,
        category: formData.category,
        isActive: formData.isActive,
        thumbnail: getThumbnailUrl(formData.platform, formData.url),
        updatedAt: new Date()
      };

      if (editingLesson) {
        // Optimistic update
        setLessons(prevLessons =>
          prevLessons.map(l =>
            l.id === editingLesson.id ? { ...l, ...lessonData } : l
          )
        );
        await updateDoc(doc(db, 'lessons', editingLesson.id), lessonData);
        toast.success('Lesson updated successfully');
      } else {
        lessonData.createdAt = new Date();
        lessonData.views = 0;
        // Optimistic update
        const tempId = Date.now().toString();
        setLessons(prevLessons => [{ id: tempId, ...lessonData }, ...prevLessons]);
        const docRef = await addDoc(collection(db, 'lessons'), lessonData);
        setLessons(prevLessons =>
          prevLessons.map(l =>
            l.id === tempId ? { ...l, id: docRef.id } : l
          )
        );
        toast.success('Lesson added successfully');
      }

      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast.error('Failed to save lesson');
      // Revert optimistic update
      loadLessons();
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (lesson) => {
    setLessonToDelete(lesson);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!lessonToDelete) return;

    try {
      setDeleting(lessonToDelete.id);
      // Optimistic update
      setLessons(prevLessons => prevLessons.filter(l => l.id !== lessonToDelete.id));
      await deleteDoc(doc(db, 'lessons', lessonToDelete.id));
      toast.success('Lesson deleted successfully');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson');
      // Revert optimistic update
      loadLessons();
    } finally {
      setDeleting(null);
      setDeleteDialogOpen(false);
      setLessonToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLessonToDelete(null);
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
            Lessons Management
          </Typography>
          <Box display="flex" gap={1}>
            <Button 
              variant="outlined" 
              startIcon={<Refresh />} 
              onClick={loadLessons}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={handleAdd}
              disabled={loading}
              color="secondary"
            >
              Add Lesson
            </Button>
          </Box>
        </Box>

      {lessons.length === 0 ? (
        <Fade in={true}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No lessons found
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={handleAdd} 
              sx={{ mt: 2 }} 
              color="secondary"
            >
              Add Your First Lesson
            </Button>
          </Paper>
        </Fade>
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
              {lessons.map((lesson) => (
                <Fade key={lesson.id} in={true}>
                  <TableRow>
                    <TableCell>
                      <Box
                        sx={{
                          width: 80,
                          height: 60,
                          backgroundImage: lesson.thumbnail ? `url(${lesson.thumbnail})` : 'none',
                          backgroundColor: '#f5f5f5',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {!lesson.thumbnail && <PlayArrow sx={{ color: 'text.secondary' }} />}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap sx={{ maxWidth: 250 }}>
                        {lesson.title}
                      </Typography>
                      {lesson.description && (
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 250 }}>
                          {lesson.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip label={lesson.platform?.toUpperCase() || 'Unknown'} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip label={lesson.category || 'Uncategorized'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lesson.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        color={lesson.isActive ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        size="small" 
                        onClick={() => window.open(lesson.url, '_blank')} 
                        title="View"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(lesson)} 
                        title="Edit"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(lesson)}
                        title="Delete"
                        color="error"
                        disabled={deleting === lesson.id}
                      >
                        {deleting === lesson.id ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Delete />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fade>
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
          {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
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
                label="Lesson URL"
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
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                  disabled={saving}
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
            color="secondary"
            disabled={
              saving || 
              !formData.title.trim() || 
              !formData.url.trim() || 
              !validateAndTransformUrl(formData.url, formData.platform).isValid
            }
          >
            {saving ? (editingLesson ? 'Updating...' : 'Adding...') : (editingLesson ? 'Update' : 'Add')}
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
          Delete Lesson?
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography>
            Are you sure you want to delete "{lessonToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            disabled={deleting === lessonToDelete?.id}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting === lessonToDelete?.id}
            startIcon={deleting === lessonToDelete?.id ? <CircularProgress size={20} /> : <Delete />}
          >
            {deleting === lessonToDelete?.id ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={loading} sx={{ zIndex: 9999 }}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Box>
  </Fade>
  );
};

export default LessonsManagement;
