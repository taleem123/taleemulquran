// Input validation utilities for admin forms

export const validateVideoData = (videoData) => {
  const errors = {};
  
  // Required fields
  if (!videoData.title || videoData.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (videoData.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }
  
  if (!videoData.url && (!videoData.sources || videoData.sources.length === 0)) {
    errors.url = 'Video URL or sources are required';
  }
  
  // URL validation
  if (videoData.url) {
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|facebook\.com|tiktok\.com)/;
    if (!urlPattern.test(videoData.url)) {
      errors.url = 'Please enter a valid video URL (YouTube, Facebook, or TikTok)';
    }
  }
  
  // Description validation
  if (videoData.description && videoData.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }
  
  // Category validation
  const validCategories = ['tafseer', 'ethics', 'prayer', 'benefits', 'family'];
  if (videoData.category && !validCategories.includes(videoData.category)) {
    errors.category = 'Please select a valid category';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLessonData = (lessonData) => {
  const errors = {};
  
  // Required fields
  if (!lessonData.title || lessonData.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (lessonData.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }
  
  if (!lessonData.url && (!lessonData.sources || lessonData.sources.length === 0)) {
    errors.url = 'Lesson URL or sources are required';
  }
  
  // URL validation
  if (lessonData.url) {
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|facebook\.com|tiktok\.com)/;
    if (!urlPattern.test(lessonData.url)) {
      errors.url = 'Please enter a valid video URL (YouTube, Facebook, or TikTok)';
    }
  }
  
  // Description validation
  if (lessonData.description && lessonData.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }
  
  // Category validation
  const validCategories = ['tafseer', 'ethics', 'prayer', 'benefits', 'family'];
  if (lessonData.category && !validCategories.includes(lessonData.category)) {
    errors.category = 'Please select a valid category';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};
