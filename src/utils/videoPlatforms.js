// Universal video platform utilities

/**
 * Detect video platform from URL
 * @param {string} url - Video URL
 * @returns {string} - Platform name ('youtube', 'facebook', 'tiktok', 'unknown')
 */
export const detectPlatform = (url) => {
  if (!url || typeof url !== 'string') return 'unknown';
  
  const urlLower = url.toLowerCase();
  
  // YouTube patterns
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
    return 'youtube';
  }
  
  // Facebook patterns
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.watch') || urlLower.includes('fb.com')) {
    return 'facebook';
  }
  
  // TikTok patterns
  if (urlLower.includes('tiktok.com') || urlLower.includes('vm.tiktok.com')) {
    return 'tiktok';
  }
  
  return 'unknown';
};

/**
 * Extract video ID from YouTube URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null
 */
export const getYouTubeId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
    /music\.youtube\.com\/watch\?v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Extract video ID from Facebook URL
 * @param {string} url - Facebook URL
 * @returns {string|null} - Video ID or null
 */
export const getFacebookId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /facebook\.com\/.*\/videos\/(\d+)/,
    /facebook\.com\/.*\/reel\/(\d+)/,
    /fb\.watch\/([^\/\?]+)/,
    /facebook\.com\/.*\/posts\/(\d+)/,
    /facebook\.com\/.*\/photos\/(\d+)/,
    /facebook\.com\/watch\/\?v=(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Extract video ID from TikTok URL
 * @param {string} url - TikTok URL
 * @returns {string|null} - Video ID or null
 */
export const getTikTokId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /tiktok\.com\/@[^\/]+\/video\/(\d+)/,
    /vm\.tiktok\.com\/([^\/\?]+)/,
    /tiktok\.com\/.*\/video\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

/**
 * Get video ID for any platform
 * @param {string} url - Video URL
 * @returns {object} - { platform, videoId }
 */
export const getVideoInfo = (url) => {
  const platform = detectPlatform(url);
  
  let videoId = null;
  switch (platform) {
    case 'youtube':
      videoId = getYouTubeId(url);
      break;
    case 'facebook':
      videoId = getFacebookId(url);
      break;
    case 'tiktok':
      videoId = getTikTokId(url);
      break;
    default:
      break;
  }
  
  return { platform, videoId };
};

/**
 * Generate thumbnail URL for any platform
 * @param {string} platform - Platform name
 * @param {string} videoId - Video ID
 * @returns {string|null} - Thumbnail URL
 */
export const getThumbnailUrl = (platform, videoId) => {
  if (!videoId) return null;
  
  switch (platform) {
    case 'youtube':
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    case 'facebook':
      // Facebook doesn't provide direct thumbnail URLs
      return null;
    case 'tiktok':
      // TikTok doesn't provide direct thumbnail URLs
      return null;
    default:
      return null;
  }
};

/**
 * Generate embed URL for any platform
 * @param {string} platform - Platform name
 * @param {string} videoId - Video ID
 * @param {object} options - Embed options
 * @returns {string|null} - Embed URL
 */
export const getEmbedUrl = (platform, videoId, options = {}) => {
  if (!videoId) return null;
  
  const defaultOptions = {
    autoplay: 0,
    controls: 1,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    fs: 1,
    ...options
  };
  
  switch (platform) {
    case 'youtube':
      const ytParams = new URLSearchParams(defaultOptions);
      return `https://www.youtube.com/embed/${videoId}?${ytParams.toString()}`;
    
    case 'facebook':
      // For Facebook reels and videos, use the original URL directly
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${videoId}`)}&show_text=false&width=560&height=315&t=0`;
    
    case 'tiktok':
      return `https://www.tiktok.com/embed/v2/${videoId}`;
    
    default:
      return null;
  }
};

/**
 * Generate watch URL for any platform
 * @param {string} platform - Platform name
 * @param {string} videoId - Video ID
 * @returns {string|null} - Watch URL
 */
export const getWatchUrl = (platform, videoId) => {
  if (!videoId) return null;
  
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/watch?v=${videoId}`;
    case 'facebook':
      return `https://www.facebook.com/watch/?v=${videoId}`;
    case 'tiktok':
      return `https://www.tiktok.com/@username/video/${videoId}`; // Note: TikTok needs username
    default:
      return null;
  }
};

/**
 * Check if platform supports custom controls
 * @param {string} platform - Platform name
 * @returns {boolean} - True if supports custom controls
 */
export const supportsCustomControls = (platform) => {
  return platform === 'youtube';
};

/**
 * Get platform display name
 * @param {string} platform - Platform name
 * @returns {string} - Display name
 */
export const getPlatformDisplayName = (platform) => {
  switch (platform) {
    case 'youtube':
      return 'YouTube';
    case 'facebook':
      return 'Facebook';
    case 'tiktok':
      return 'TikTok';
    default:
      return 'Unknown';
  }
};

/**
 * Get platform icon (you can replace with actual icons)
 * @param {string} platform - Platform name
 * @returns {string} - Icon name or emoji
 */
export const getPlatformIcon = (platform) => {
  switch (platform) {
    case 'youtube':
      return '📺';
    case 'facebook':
      return '📘';
    case 'tiktok':
      return '🎵';
    default:
      return '🎬';
  }
};
