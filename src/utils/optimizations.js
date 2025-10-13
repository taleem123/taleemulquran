// Performance Optimization Utilities

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to ensure a function is called at most once per interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Image preloader to improve perceived performance
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Promise} Promise that resolves when all images are loaded
 */
export const preloadImages = (imageUrls) => {
  return Promise.all(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    })
  );
};

/**
 * Check if user is on a slow connection
 * @returns {boolean} True if connection is slow
 */
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection && (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  }
  return false;
};

/**
 * Get device performance tier (low, medium, high)
 * @returns {string} Performance tier
 */
export const getDevicePerformanceTier = () => {
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  
  // Check device memory (in GB)
  const memory = navigator.deviceMemory || 4;
  
  if (cores <= 2 || memory <= 2) {
    return 'low';
  } else if (cores <= 4 || memory <= 4) {
    return 'medium';
  } else {
    return 'high';
  }
};

/**
 * Intersection Observer factory for lazy loading
 * @param {Function} callback - Callback function when element intersects
 * @param {Object} options - Intersection observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  
  // Fallback: call callback immediately
  return {
    observe: (element) => callback([{ isIntersecting: true, target: element }]),
    disconnect: () => {},
    unobserve: () => {}
  };
};

/**
 * Request Idle Callback wrapper with fallback
 * @param {Function} callback - Function to run during idle time
 * @param {Object} options - Options for requestIdleCallback
 */
export const requestIdleCallback = (callback, options = {}) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback to setTimeout
    return setTimeout(callback, 1);
  }
};

/**
 * Cancel Idle Callback wrapper
 * @param {number} id - ID from requestIdleCallback
 */
export const cancelIdleCallback = (id) => {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
};

const optimizations = {
  debounce,
  throttle,
  preloadImages,
  isSlowConnection,
  getDevicePerformanceTier,
  createIntersectionObserver,
  requestIdleCallback,
  cancelIdleCallback
};

export default optimizations;

