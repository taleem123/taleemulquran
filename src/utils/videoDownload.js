// Video download utilities
import { getVideoInfo } from './videoPlatforms';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app';

/**
 * Download a video file to the user's device using Firebase Functions
 * @param {Object} video - Video object with url, title, etc.
 * @returns {Promise<boolean>} - Success status
 */
export const downloadVideo = async (video) => {
  try {
    const videoUrl = video?.url || (video?.sources && video.sources[0]);
    if (!videoUrl) {
      throw new Error('No video URL found');
    }

    const { platform } = getVideoInfo(videoUrl);
    
    // Check if we can download directly (for direct video files)
    if (canDownloadDirectly(videoUrl)) {
      return await downloadDirectVideo(videoUrl, video.title);
    }
    
    // For platform videos (YouTube, Facebook, TikTok), use Firebase Functions
    return await downloadViaFirebaseFunction(videoUrl, platform, video.title);
    
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

/**
 * Download video using Firebase Functions (backend processing)
 * @param {string} videoUrl - Video URL
 * @param {string} platform - Video platform
 * @param {string} title - Video title
 * @returns {Promise<boolean>} - Success status
 */
const downloadViaFirebaseFunction = async (videoUrl, platform, title) => {
  try {
    const app = getApp();
    const functions = getFunctions(app);
    const downloadVideoFunction = httpsCallable(functions, 'downloadVideo');
    
    // Show loading message
    console.log('Starting download... This may take a few minutes.');
    
    // Call Firebase Function
    const result = await downloadVideoFunction({
      videoUrl: videoUrl,
      platform: platform,
      title: title
    });
    
    if (result.data.success) {
      // Trigger download
      const link = document.createElement('a');
      link.href = result.data.downloadUrl;
      link.download = `${sanitizeFileName(title || 'video')}.mp4`;
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download started successfully!');
      return true;
    } else {
      throw new Error('Download failed on server');
    }
    
  } catch (error) {
    console.error('Firebase Function download failed:', error);
    
    // Fallback to instructions modal
    throw new Error(`Download failed: ${error.message}. Please try using a video downloader extension or online service.`);
  }
};

/**
 * Download video directly from URL
 * @param {string} url - Direct video URL
 * @param {string} title - Video title
 * @returns {Promise<boolean>} - Success status
 */
const downloadDirectVideo = async (url, title) => {
  try {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFileName(title || 'video')}.mp4`;
    link.target = '_blank';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
    
  } catch (error) {
    console.error('Direct download failed:', error);
    throw error;
  }
};

/**
 * Sanitize filename for download
 * @param {string} filename - Original filename
 * @returns {string} - Sanitized filename
 */
const sanitizeFileName = (filename) => {
  return filename
    .replace(/[^a-z0-9]/gi, '_') // Replace non-alphanumeric with underscore
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, '') // Remove leading/trailing underscores
    .substring(0, 100); // Limit length
};

/**
 * Check if video can be downloaded directly
 * @param {string} url - Video URL
 * @returns {boolean} - Whether direct download is possible
 */
export const canDownloadDirectly = (url) => {
  if (!url) return false;
  
  // Check if it's a direct video file
  const videoExtensions = ['.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
};

/**
 * Get download instructions for different platforms
 * @param {string} platform - Video platform
 * @param {string} videoId - Video ID
 * @returns {string} - Download instructions
 */
export const getDownloadInstructions = (platform, videoId) => {
  const instructions = {
    youtube: `
To download this YouTube video:

Method 1 - Online Downloaders:
• Go to yt-dlp.org or similar service
• Paste: https://www.youtube.com/watch?v=${videoId}
• Download in your preferred quality

Method 2 - Browser Extensions:
• Install "Video DownloadHelper" or similar
• Play the video and use the extension

Method 3 - Desktop Software:
• Use 4K Video Downloader
• Use yt-dlp (command line)
    `,
    
    facebook: `
To download this Facebook video:

Method 1 - Online Tools:
• Use fbdown.net or similar service
• Paste the video URL
• Download the video

Method 2 - Browser Extensions:
• Use "Video DownloadHelper" extension
• Right-click on video and select download
    `,
    
    tiktok: `
To download this TikTok video:

Method 1 - Built-in Download:
• Look for download button in TikTok app
• Or use the share button to save

Method 2 - Online Tools:
• Use tiktokdownloader.com
• Paste the video URL
    `
  };
  
  return instructions[platform] || `
To download this video:
• Right-click on the video and select "Save video as..."
• Or use a video downloader extension
• Or copy the URL and use an online downloader
  `;
};
