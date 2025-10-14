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
import { Add, Edit, Delete, Visibility, PlayArrow, Save, Cancel, Refresh, School } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getThumbnailUrl } from '../../utils/videoPlatforms';

const LessonsManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'lessons'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const lessonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error loading lessons:', error);
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
        await updateDoc(doc(db, 'lessons', editingLesson.id), lessonData);
        toast.success('Lesson updated successfully');
      } else {
        lessonData.createdAt = new Date();
        lessonData.views = 0;
        await addDoc(collection(db, 'lessons'), lessonData);
        toast.success('Lesson added successfully');
      }

      setOpenDialog(false);
      loadLessons();
    } catch (error) {
      console.error('Error saving lesson:', error);
      toast.error('Failed to save lesson');
    }
  };

  const handleDelete = async (lesson) => {
    if (window.confirm(`Are you sure you want to delete "${lesson.title}"?`)) {
      try {
        await deleteDoc(doc(db, 'lessons', lesson.id));
        toast.success('Lesson deleted successfully');
        loadLessons();
      } catch (error) {
        console.error('Error deleting lesson:', error);
        toast.error('Failed to delete lesson');
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
          Lessons Management
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Refresh />} onClick={loadLessons}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd} color="secondary">
            Add Lesson
          </Button>
        </Box>
      </Box>

      {lessons.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <School sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No lessons found
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleAdd} sx={{ mt: 2 }} color="secondary">
            Add Your First Lesson
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
              {lessons.map((lesson) => (
                <TableRow key={lesson.id}>
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
                    <IconButton size="small" onClick={() => window.open(lesson.url, '_blank')} title="View">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleEdit(lesson)} title="Edit">
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(lesson)} title="Delete" color="error">
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
          {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
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
                label="Lesson URL"
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
          <Button onClick={handleSave} variant="contained" startIcon={<Save />} color="secondary">
            {editingLesson ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LessonsManagement;
