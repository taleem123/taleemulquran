/**
 * Performance Configuration
 * Central configuration for all performance optimizations
 */

export const PERFORMANCE_CONFIG = {
  // Animation Settings
  animations: {
    enableParticles: true,
    particleCount: {
      hero: 12,        // Only hero section has particles
      default: 0,      // Other sections: no particles
    },
    particleFPS: 30,   // Limited to 30 FPS
    disableOnMobile: true,
    respectReducedMotion: true,
  },

  // Image Loading
  images: {
    lazyLoad: true,
    lazyLoadMargin: '50px',
    useWebP: true,
    quality: 75,
    placeholder: 'blur',
  },

  // Component Loading
  components: {
    useLazyLoading: true,
    prefetchDelay: 2000, // Prefetch after 2 seconds
  },

  // Search & Filtering
  search: {
    debounceDelay: 300, // 300ms debounce for search
    throttleDelay: 300,
  },

  // Network
  network: {
    enableServiceWorker: true,
    cacheStrategy: 'cache-first',
    cacheMaxAge: 86400000, // 24 hours
  },

  // Bundle Optimization
  bundle: {
    codesplitting: true,
    treeShaking: true,
    minify: true,
    removeSourceMaps: true,
  },

  // Performance Monitoring
  monitoring: {
    logPerformance: false, // Set to true in dev mode
    trackWebVitals: true,
    reportErrors: true,
  },

  // Device Optimization
  device: {
    detectSlowConnection: true,
    adaptToDeviceMemory: true,
    reduceQualityOnLowEnd: true,
  },
};

/**
 * Get performance tier based on device capabilities
 */
export const getPerformanceTier = () => {
  const cores = navigator.hardwareConcurrency || 1;
  const memory = navigator.deviceMemory || 4;
  
  if (cores <= 2 || memory <= 2) return 'low';
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
};

/**
 * Check if device is on slow connection
 */
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return conn && (conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g');
  }
  return false;
};

/**
 * Get optimized configuration based on device
 */
export const getOptimizedConfig = () => {
  const tier = getPerformanceTier();
  const slowConnection = isSlowConnection();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return {
    ...PERFORMANCE_CONFIG,
    animations: {
      ...PERFORMANCE_CONFIG.animations,
      enableParticles: !isMobile && !slowConnection && tier !== 'low',
      particleCount: {
        hero: tier === 'high' ? 12 : tier === 'medium' ? 8 : 0,
        default: 0,
      },
    },
    images: {
      ...PERFORMANCE_CONFIG.images,
      quality: tier === 'high' ? 85 : tier === 'medium' ? 75 : 60,
    },
  };
};

export default PERFORMANCE_CONFIG;

