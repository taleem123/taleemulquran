// Utility to add test data to Firebase
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const addTestVideo = async () => {
  try {
    const testVideo = {
      title: 'Test Short Video - Surah Al-Fatiha Tafseer',
      description: 'A brief explanation of Surah Al-Fatiha and its meanings',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample YouTube URL
      platform: 'youtube',
      category: 'tafseer',
      isActive: true,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'shortVideos'), testVideo);
    console.log('Test video added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding test video:', error);
    throw error;
  }
};

export const addTestLesson = async () => {
  try {
    const testLesson = {
      title: 'Test Lesson - Understanding Quranic Ethics',
      description: 'A comprehensive lesson on Islamic ethics and moral values',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample YouTube URL
      platform: 'youtube',
      category: 'ethics',
      isActive: true,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'lessons'), testLesson);
    console.log('Test lesson added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding test lesson:', error);
    throw error;
  }
};

// Function to add multiple test videos
export const addMultipleTestVideos = async () => {
  const testVideos = [
    {
      title: 'Surah Al-Baqarah - Verse 1-5 Tafseer',
      description: 'Understanding the opening verses of Surah Al-Baqarah',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      category: 'tafseer',
      isActive: true,
      views: 15,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    },
    {
      title: 'Prayer Times and Their Importance',
      description: 'Learn about the significance of each prayer time',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      category: 'prayer',
      isActive: true,
      views: 8,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    },
    {
      title: 'Family Values in Islam',
      description: 'Islamic teachings about family relationships and responsibilities',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      category: 'family',
      isActive: true,
      views: 22,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
  ];

  try {
    const promises = testVideos.map(video => addDoc(collection(db, 'shortVideos'), video));
    const docRefs = await Promise.all(promises);
    console.log('Multiple test videos added:', docRefs.map(ref => ref.id));
    return docRefs;
  } catch (error) {
    console.error('Error adding multiple test videos:', error);
    throw error;
  }
};
