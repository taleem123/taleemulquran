import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './main-component/App/App';
import './css/font-awesome.min.css';
import './css/themify-icons.css';
import './css/flaticon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './utils/webVitals';
import { monitorLongTasks } from './utils/webVitals';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// Measure and report web vitals for performance monitoring
reportWebVitals((metric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric.name, ':', metric.value);
  }
  // In production, send to analytics
});

// Monitor long tasks in development
if (process.env.NODE_ENV === 'development') {
  monitorLongTasks();
}
