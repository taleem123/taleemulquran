// Application constants for better maintainability

export const API_ENDPOINTS = {
  SOUNDCLOUD: 'https://soundcloud.com/taleemquranpk',
  YOUTUBE: 'https://www.youtube.com',
  FACEBOOK: 'https://www.facebook.com'
};

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  TAFSEER: '/tafseer',
  SHORTS: '/shorts',
  COMING_SOON: '/coming-soon'
};

export const LOADING_MESSAGES = {
  DEFAULT: 'Loading...',
  SURAHS: 'Loading Surahs...',
  AUDIO: 'Loading Audio...',
  VIDEO: 'Loading Video...',
  PAGE: 'Loading page...'
};

export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'Content not found.',
  GENERIC: 'Something went wrong. Please try again.',
  SURAH_NOT_FOUND: 'Surah not found',
  AUDIO_LOAD_ERROR: 'Failed to load audio',
  VIDEO_LOAD_ERROR: 'Failed to load video'
};

export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  LAZY_LOAD_THRESHOLD: 0.1,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 960,
  LG: 1280,
  XL: 1920
};
