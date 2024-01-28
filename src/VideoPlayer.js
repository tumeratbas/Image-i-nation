import React, { useEffect } from 'react';

const VideoPlayer = () => {
  useEffect(() => {
    const video = document.getElementById('autoplayVideo');
    if (video) {
      video.play().then(() => {
        console.log('Video started successfully');
      }).catch(error => {
        if (error.name === 'NotAllowedError') {
          console.log('Autoplay not allowed, requesting user interaction...');
          showPlayButton();
        } else {
          console.error('Error while starting the video:', error);
        }
      });
    }
  }, []);

  const showPlayButton = () => {
    alert('Click the button to play the video');
  };

  return (
    <div>
      <video id="autoplayVideo" controls width="100%" height="100%">
        <source src="/videoGiris.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
