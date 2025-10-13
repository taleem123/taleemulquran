import React, { useState, useCallback } from 'react'
// import ModalVideo from 'react-modal-video'
// import '../../../node_modules/react-modal-video/scss/modal-video.scss';

const VideoModal = ({ videoId = 'LTqRm53QjI0', channel = 'youtube' }) => {
  const [, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // const closeModal = useCallback(() => {
  //   setIsOpen(false);
  // }, []);

  return (
    <div>
      {/* <ModalVideo 
        channel={channel} 
        isOpen={isOpen} 
        videoId={videoId} 
        onClose={closeModal} 
      /> */}
      <div className="video-btn">
        <ul>
          <li>
            <button 
              className="wrap" 
              onClick={openModal}
              aria-label="Play video"
            >
              <i className="fi flaticon-play" aria-hidden="true"></i>
            </button> 
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoModal;