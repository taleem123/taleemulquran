// Firebase service for content management
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Collections
const COLLECTIONS = {
  SHORT_VIDEOS: 'shortVideos',
  LESSONS: 'lessons',
  RECENT_VIDEOS: 'recentVideos',
  SELECTED_SURAHS: 'selectedSurahs',
  ADMIN_USERS: 'adminUsers'
};

// Short Videos Service
export const shortVideosService = {
  // Get all short videos
  async getAll() {
    try {
      const q = query(collection(db, COLLECTIONS.SHORT_VIDEOS), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting short videos:', error);
      throw error;
    }
  },

  // Get short video by ID
  async getById(id) {
    try {
      const docRef = doc(db, COLLECTIONS.SHORT_VIDEOS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting short video:', error);
      throw error;
    }
  },

  // Add new short video
  async add(videoData) {
    try {
      // Normalize data structure - ensure we have both url and sources
      const normalizedData = {
        ...videoData,
        // Ensure we have both url and sources for backward compatibility
        url: videoData.url || (videoData.sources && videoData.sources[0]) || '',
        sources: videoData.sources || (videoData.url ? [videoData.url] : []),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.SHORT_VIDEOS), normalizedData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding short video:', error);
      throw error;
    }
  },

  // Update short video
  async update(id, videoData) {
    try {
      // Normalize data structure - ensure we have both url and sources
      const normalizedData = {
        ...videoData,
        // Ensure we have both url and sources for backward compatibility
        url: videoData.url || (videoData.sources && videoData.sources[0]) || '',
        sources: videoData.sources || (videoData.url ? [videoData.url] : []),
        updatedAt: Timestamp.now()
      };
      
      const docRef = doc(db, COLLECTIONS.SHORT_VIDEOS, id);
      await updateDoc(docRef, normalizedData);
    } catch (error) {
      console.error('Error updating short video:', error);
      throw error;
    }
  },

  // Delete short video
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SHORT_VIDEOS, id));
    } catch (error) {
      console.error('Error deleting short video:', error);
      throw error;
    }
  }
};

// Lessons Service
export const lessonsService = {
  // Get all lessons
  async getAll() {
    try {
      const q = query(collection(db, COLLECTIONS.LESSONS), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting lessons:', error);
      throw error;
    }
  },

  // Get lesson by ID
  async getById(id) {
    try {
      const docRef = doc(db, COLLECTIONS.LESSONS, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting lesson:', error);
      throw error;
    }
  },

  // Add new lesson
  async add(lessonData) {
    try {
      // Normalize data structure - ensure we have both url and sources
      const normalizedData = {
        ...lessonData,
        // Ensure we have both url and sources for backward compatibility
        url: lessonData.url || (lessonData.sources && lessonData.sources[0]) || '',
        sources: lessonData.sources || (lessonData.url ? [lessonData.url] : []),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.LESSONS), normalizedData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding lesson:', error);
      throw error;
    }
  },

  // Update lesson
  async update(id, lessonData) {
    try {
      // Normalize data structure - ensure we have both url and sources
      const normalizedData = {
        ...lessonData,
        // Ensure we have both url and sources for backward compatibility
        url: lessonData.url || (lessonData.sources && lessonData.sources[0]) || '',
        sources: lessonData.sources || (lessonData.url ? [lessonData.url] : []),
        updatedAt: Timestamp.now()
      };
      
      const docRef = doc(db, COLLECTIONS.LESSONS, id);
      await updateDoc(docRef, normalizedData);
    } catch (error) {
      console.error('Error updating lesson:', error);
      throw error;
    }
  },

  // Delete lesson
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.LESSONS, id));
    } catch (error) {
      console.error('Error deleting lesson:', error);
      throw error;
    }
  }
};

// Recent Videos Service
// Recent Videos Service - Optimized for homepage
export const recentVideosService = {
  // Get recent short videos (optimized for homepage - only gets 3 most recent)
  async getRecent(limitCount = 3) {
    try {
      const q = query(
        collection(db, COLLECTIONS.SHORT_VIDEOS), 
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting recent videos:', error);
      throw error;
    }
  }
};

// Recent Lessons Service - Optimized for homepage
export const recentLessonsService = {
  // Get recent lessons (optimized for homepage - only gets 3 most recent)
  async getRecent(limitCount = 3) {
    try {
      const q = query(
        collection(db, COLLECTIONS.LESSONS), 
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting recent lessons:', error);
      throw error;
    }
  }
};

// Selected Surahs Service
export const selectedSurahsService = {
  // Get selected surahs
  async getSelected() {
    try {
      const q = query(collection(db, COLLECTIONS.SELECTED_SURAHS), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting selected surahs:', error);
      throw error;
    }
  },

  // Update selected surahs
  async updateSelected(surahs) {
    try {
      // Clear existing selections
      const existingQuery = query(collection(db, COLLECTIONS.SELECTED_SURAHS));
      const existingSnapshot = await getDocs(existingQuery);
      const deletePromises = existingSnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Add new selections
      const addPromises = surahs.map((surah, index) => 
        addDoc(collection(db, COLLECTIONS.SELECTED_SURAHS), {
          ...surah,
          order: index,
          createdAt: Timestamp.now()
        })
      );
      await Promise.all(addPromises);
    } catch (error) {
      console.error('Error updating selected surahs:', error);
      throw error;
    }
  }
};

// Admin Users Service
export const adminUsersService = {
  // Get all admin users
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.ADMIN_USERS));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting admin users:', error);
      throw error;
    }
  },

  // Add admin user
  async add(userData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.ADMIN_USERS), {
        ...userData,
        createdAt: Timestamp.now(),
        isActive: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding admin user:', error);
      throw error;
    }
  },

  // Update admin user
  async update(id, userData) {
    try {
      const docRef = doc(db, COLLECTIONS.ADMIN_USERS, id);
      await updateDoc(docRef, {
        ...userData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating admin user:', error);
      throw error;
    }
  },

  // Delete admin user
  async delete(id) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.ADMIN_USERS, id));
    } catch (error) {
      console.error('Error deleting admin user:', error);
      throw error;
    }
  }
};

// Mock data for initial setup
export const mockData = {
  shortVideos: [
    {
      title: 'Islamic Teaching Video 1',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'A beautiful Islamic teaching video about Quranic lessons and moral values.',
      category: 'tafseer',
      isActive: true
    },
    {
      title: 'Islamic Teaching Video 2',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'Another inspiring Islamic video sharing wisdom from the Quran.',
      category: 'ethics',
      isActive: true
    },
    {
      title: 'Islamic Teaching Video 3',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'Learn about Islamic principles through this educational video.',
      category: 'prayer',
      isActive: true
    }
  ],
  lessons: [
    {
      title: 'Tafseer Lesson 1: Understanding Surah Al-Fatiha',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'A comprehensive tafseer lesson explaining the deep meanings and interpretations of Surah Al-Fatiha, the opening chapter of the Quran.',
      category: 'tafseer',
      duration: '15:30',
      isActive: true
    },
    {
      title: 'Tafseer Lesson 2: Stories of the Prophets',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'An in-depth exploration of the stories of prophets mentioned in the Quran and the lessons we can learn from their lives.',
      category: 'tafseer',
      duration: '18:45',
      isActive: true
    },
    {
      title: 'Tafseer Lesson 3: Islamic Ethics and Morals',
      sources: ['https://www.youtube.com/shorts/xDawAJKKgE0'],
      platform: 'youtube',
      description: 'A detailed study of Islamic ethics and moral values as taught in the Quran, with practical applications for daily life.',
      category: 'ethics',
      duration: '20:15',
      isActive: true
    }
  ]
};


