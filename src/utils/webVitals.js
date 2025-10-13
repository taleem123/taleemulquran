/**
 * Web Vitals Reporting
 * Measures and reports core web vitals for performance monitoring
 */

// Internal function to report web vitals (currently unused but kept for future analytics integration)
// const reportWebVital = (metric) => {
//   // Log to console in development
//   if (process.env.NODE_ENV === 'development') {
//     console.log(`[Web Vital] ${metric.name}:`, metric);
//   }

//   // Send to analytics in production
//   if (process.env.NODE_ENV === 'production') {
//     // Example: Send to Google Analytics
//     if (window.gtag) {
//       window.gtag('event', metric.name, {
//         event_category: 'Web Vitals',
//         value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
//         event_label: metric.id,
//         non_interaction: true,
//       });
//     }
//   }
// };

/**
 * Initialize Web Vitals tracking
 */
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    }).catch(() => {
      // web-vitals not available, silently fail
    });
  }
};

/**
 * Custom performance metrics
 */
export const logCustomMetric = (name, value, unit = 'ms') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${value}${unit}`);
  }

  // Mark in performance timeline
  if (performance && performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measure time between two marks
 */
export const measurePerformance = (startMark, endMark, measureName) => {
  if (performance && performance.measure) {
    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      logCustomMetric(measureName, Math.round(measure.duration));
      return measure.duration;
    } catch (e) {
      // Marks may not exist
      return null;
    }
  }
  return null;
};

/**
 * Log component render time
 */
export const logComponentRender = (componentName) => {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    if (renderTime > 16) { // Log if render takes more than 1 frame (16ms)
      logCustomMetric(`${componentName} render`, Math.round(renderTime));
    }
  };
};

/**
 * Monitor long tasks (tasks > 50ms)
 */
export const monitorLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('[Long Task]', Math.round(entry.duration), 'ms', entry);
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }
  }
};

export default reportWebVitals;

