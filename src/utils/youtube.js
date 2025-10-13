// YouTube utility functions

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    // Standard watch URLs
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    // Shorts URLs
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    // Embed URLs
    /youtube\.com\/embed\/([^&\n?#]+)/,
    // Legacy v URLs
    /youtube\.com\/v\/([^&\n?#]+)/,
    // Mobile URLs
    /m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
    // Music URLs
    /music\.youtube\.com\/watch\?v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Generate YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns {string} - Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Generate YouTube embed URL
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options
 * @returns {string} - Embed URL
 */
export const getYouTubeEmbedUrl = (videoId, options = {}) => {
  if (!videoId) return null;
  
  const defaultOptions = {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    fs: 1,
    cc_load_policy: 0,
    iv_load_policy: 3,
    autohide: 0,
    disablekb: 0,
    enablejsapi: 1,
    origin: window.location.origin,
    ...options
  };
  
  const params = new URLSearchParams(defaultOptions);
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Generate YouTube watch URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} - Watch URL
 */
export const getYouTubeWatchUrl = (videoId) => {
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Check if URL is a valid YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if valid YouTube URL
 */
export const isYouTubeUrl = (url) => {
  return getYouTubeId(url) !== null;
};

/**
 * Get video duration from YouTube API (requires API key)
 * @param {string} videoId - YouTube video ID
 * @param {string} apiKey - YouTube API key
 * @returns {Promise<number>} - Duration in seconds
 */
export const getYouTubeDuration = async (videoId, apiKey) => {
  if (!videoId || !apiKey) return null;
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const duration = data.items[0].contentDetails.duration;
      // Convert ISO 8601 duration to seconds
      return parseISO8601Duration(duration);
    }
  } catch (error) {
    console.error('Error fetching YouTube duration:', error);
  }
  
  return null;
};

/**
 * Parse ISO 8601 duration to seconds
 * @param {string} duration - ISO 8601 duration (e.g., "PT4M13S")
 * @returns {number} - Duration in seconds
 */
const parseISO8601Duration = (duration) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Format seconds to MM:SS or HH:MM:SS
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
};
