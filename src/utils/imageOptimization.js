/**
 * Image Optimization Utilities
 */

/**
 * Create optimized image loader with WebP support
 * @param {string} src - Original image source
 * @param {number} width - Target width
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized image source
 */
export const getOptimizedImageSrc = (src, width = 800, quality = 75) => {
  // Check if browser supports WebP
  const supportsWebP = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  };

  // For now, return original src (can be enhanced with image CDN)
  return src;
};

/**
 * Lazy load image with Intersection Observer
 * @param {HTMLImageElement} img - Image element
 * @param {string} src - Image source
 */
export const lazyLoadImage = (img, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    observer.observe(img);
  } else {
    // Fallback for browsers that don't support Intersection Observer
    img.src = src;
  }
};

/**
 * Preload critical images
 * @param {string[]} images - Array of image URLs to preload
 */
export const preloadCriticalImages = (images) => {
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Get responsive image srcset
 * @param {string} baseSrc - Base image source
 * @param {number[]} widths - Array of widths for srcset
 * @returns {string} srcset string
 */
export const getResponsiveSrcSet = (baseSrc, widths = [320, 640, 768, 1024, 1280]) => {
  // This is a placeholder - implement with your image CDN
  return widths.map(w => `${baseSrc} ${w}w`).join(', ');
};

export default {
  getOptimizedImageSrc,
  lazyLoadImage,
  preloadCriticalImages,
  getResponsiveSrcSet
};

