// Custom hooks for Firebase data management
import { useState, useEffect } from 'react';
import { 
  shortVideosService, 
  lessonsService, 
  recentVideosService, 
  selectedSurahsService
} from '../services/firebaseService';

// Hook for short videos
export const useShortVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await shortVideosService.getAll();
      setVideos(data.filter(video => video.isActive));
    } catch (err) {
      setError(err.message);
      console.error('Error loading short videos:', err);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, refetch: loadVideos };
};

// Hook for lessons
export const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lessonsService.getAll();
      setLessons(data.filter(lesson => lesson.isActive));
    } catch (err) {
      setError(err.message);
      console.error('Error loading lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  return { lessons, loading, error, refetch: loadLessons };
};

// Hook for recent videos (gets most recent short videos)
export const useRecentVideos = (limit = 3) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecentVideos();
  }, [limit]);

  const loadRecentVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get recent short videos from shortVideos collection
      const data = await shortVideosService.getAll();
      console.log('All short videos from Firebase:', data);
      // Filter active videos and limit to specified count
      const activeVideos = data.filter(video => video.isActive).slice(0, limit);
      console.log('Active videos for recent videos:', activeVideos);
      setVideos(activeVideos);
    } catch (err) {
      setError(err.message);
      console.error('Error loading recent videos:', err);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, refetch: loadRecentVideos };
};

// Hook for selected surahs
export const useSelectedSurahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSelectedSurahs();
  }, []);

  const loadSelectedSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await selectedSurahsService.getSelected();
      setSurahs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading selected surahs:', err);
      // Fallback to default surahs if Firebase fails
      setSurahs([]);
    } finally {
      setLoading(false);
    }
  };

  return { surahs, loading, error, refetch: loadSelectedSurahs };
};

// Hook for all content (combined)
export const useAllContent = () => {
  const [content, setContent] = useState({
    shortVideos: [],
    lessons: [],
    recentVideos: [],
    selectedSurahs: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllContent();
  }, []);

  const loadAllContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [shortVideos, lessons, recentVideos, selectedSurahs] = await Promise.all([
        shortVideosService.getAll().catch(() => []),
        lessonsService.getAll().catch(() => []),
        recentVideosService.getRecent(3).catch(() => []),
        selectedSurahsService.getSelected().catch(() => [])
      ]);

      setContent({
        shortVideos: shortVideos.filter(video => video.isActive),
        lessons: lessons.filter(lesson => lesson.isActive),
        recentVideos,
        selectedSurahs
      });
    } catch (err) {
      setError(err.message);
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, refetch: loadAllContent };
};

