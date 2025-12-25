import React, { useState, useEffect } from 'react';
import '../assets/styles/styles.css';

const Home = () => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const expandImage = () => {
    setIsImageExpanded(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setIsImageExpanded(false);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isImageExpanded) {
        closeImage();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isImageExpanded]);

  return (
    <>
      <div className="main-content">
        <h1 className="main">Presents for the most important people in my life,</h1>
        <h2>Love you all,</h2>
        <h3>Dylan Gill</h3>
        <div className="img-container" onClick={expandImage}>
          <img 
            src="/assets/images/familyphoto.jpeg" 
            alt="Family at dinner" 
          />
          <div className="img-overlay">
            <span className="view-text">🔍 Click to enlarge</span>
          </div>
        </div>
      </div>

      {/* Simple Image Popup */}
      {isImageExpanded && (
        <div className="image-popup" onClick={closeImage}>
          <img 
            src="/assets/images/familyphoto.jpeg" 
            alt="Family at dinner - Enlarged"
            className="popup-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Home; 