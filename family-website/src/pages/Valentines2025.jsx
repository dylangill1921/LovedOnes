import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/Valentines2025.css';

const Valentines2025 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Heart animation
  useEffect(() => {
    const createHeart = () => {
      if (!containerRef.current) return;
      
      const heart = document.createElement('div');
      heart.classList.add('love');
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.animationDuration = Math.random() * 3 + 2 + 's';
      
      containerRef.current.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 3000);
    };

    const interval = setInterval(createHeart, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  const toggleImages = () => {
    setShowImages(!showImages);
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Error playing audio: ", error);
      });
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#DB7093', paddingTop: '60px' }}>
      <h1 className="VdayTitle">Happy Valentine's Day <br /> Baby! 💖</h1>
      
      <div className="container" ref={containerRef}></div>
      
      <div className={`wrapper ${isOpen ? 'open' : ''}`} onClick={toggleEnvelope}>
        <div className="envelope">
          <div className="name-tag"><h2>Jordan Geer</h2></div>
          <div className="letter">
            <div className="text">
              <strong>Dear My Beautiful girl,</strong>
              <p>
                Where do I start with you miss Jordan Geer, I truly can't get enough of you... 
                Baby the day I met you I was so nervous because you were so beautiful and I did not want to f*** it up,
                but the good time we had at mini golf as I got my ass kicked was amazing! But all the dates have been amazing... The best part to me on that day 
                was getting to know you, as we were in some random parking lot, hearing you talk about yourself, your passions, why you are a nurse,
                and your future goals I knew you were the one for me and I could not let you go! Honestly it was also inspiring and very surreal to
                hear you tell me about yourself, that day I knew you were the one for me... Baby I love everything about you especially your personality 
                as you have such a big heart and your so kind, sweet, caring person and I even love your weird/funny side because to me thats the best parts of you!
                Baby I love your laugh as it is so cute and your smile its so beautiful that one once said "Her smile, a pink sunset— perfect, pure, and softly set. In her glow, the world finds light,
                beauty at its finest sight".
                Baby I have loved getting to know everything about you over the last month and a half and cannot wait to find out more about you from your family,
                as I am really excited to meet all of them and know who raised the most beautiful girl in the world! I truly can't get enough of you, baby you are the most beautiful girl in the world 
                and I have told you so from Day 1 so Happy Valentine's Day Baby!! 
                <br />
                P.S. Thank you for making my birthday A special day, as the best part was being with you baby!!
              </p>
              <strong>Love: Dylan Gill</strong>
            </div>
          </div>
        </div>
        <div className="heart"></div>
      </div>
      
      <button className="btn" id="showIMGS" onClick={toggleImages}>
        Click to see My Heaven
      </button>
      
      <audio 
        id="backgroundMusic" 
        ref={audioRef}
        loop 
        style={{ display: 'none' }}
      >
        <source src="/assets/audio/bruno_mars-just_the_way_you_are.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="audio-controls">
        <button id="playButton" onClick={handlePlay}>Play</button>
        <button id="stopButton" onClick={handleStop}>Stop</button>
      </div>
      
      <div 
        id="imageContainer" 
        style={{ 
          display: showImages ? 'block' : 'none',
          opacity: showImages ? 1 : 0,
          transition: 'opacity 1.5s ease'
        }}
      >
        <img src="/assets/images/IMG_6713.jpeg" alt="Heaven1" id="imageLeft" />
        <img src="/assets/images/IMG_6714.jpeg" alt="Heaven2" id="imageRight" />
      </div>
    </div>
  );
};

export default Valentines2025;

