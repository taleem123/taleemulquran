import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const LearningResources = () => {
  const ClickHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="wpo-learning-tiles-section">
      <div className="container">
        <div className="learning-tiles-grid">
          <Link to="/tafseer/audios" onClick={ClickHandler} className="learning-tile active">
            <div className="tile-icon">
              <i className="ti-headphone"></i>
            </div>
            <div className="tile-content">
              <h4>Complete Audio Tafseer</h4>
            </div>
          </Link>

          <Link to="/shorts" onClick={ClickHandler} className="learning-tile active">
            <div className="tile-icon">
              <i className="ti-video-clapper"></i>
            </div>
            <div className="tile-content">
              <h4>Short Videos</h4>
            </div>
          </Link>

          <Link to="/lessons" onClick={ClickHandler} className="learning-tile active">
            <div className="tile-icon">
              <i className="ti-book"></i>
            </div>
            <div className="tile-content">
              <h4>Selected Lessons</h4>
            </div>
          </Link>
        </div>
      </div>
      <div className="container" style={{ marginTop: '40px' }}>
        <div className="learning-tiles-grid">
          <div className="learning-tile coming-soon">
            <div className="tile-icon">
              <i className="ti-file"></i>
            </div>
            <div className="tile-content">
              <h4>PDF Tafseer</h4>
              <span className="coming-soon-label">Coming Soon</span>
            </div>
          </div>

          <div className="learning-tile coming-soon">
            <div className="tile-icon">
              <i className="ti-video-camera"></i>
            </div>
            <div className="tile-content">
              <h4>Video Tafseer</h4>
              <span className="coming-soon-label">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningResources;
