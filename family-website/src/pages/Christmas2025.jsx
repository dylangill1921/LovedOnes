import React, { useState, useEffect } from 'react';
import '../assets/styles/Christmas2025.css';

// Import images directly
import photo1 from '../assets/images/photo1.jpeg';
import photo2 from '../assets/images/photo2.jpeg';
import photo3 from '../assets/images/photo3.jpeg';

// Message constant - moved outside component to avoid dependency issues
const FULL_MESSAGE = "My Dearest Jordan,\n\nThis Christmas, I want you to know just how much you mean to me and how deeply grateful I am to have you in my life. You have brought so much joy, happiness, and light into my world, and I can't imagine my life without you.\n\nYou have done so much for me - you've supported me, believed in me, and loved me in ways I never knew were possible. Every day with you feels like a gift, and every moment we share makes me the happiest person alive.\n\nYour kindness, your beautiful smile, your caring heart - everything about you makes me fall in love with you more and more each day. You've shown me what true love really means, and for that, I will be forever grateful.\n\nThis Christmas, I want you to know that you are my greatest blessing, my favorite person, and the one I want to spend all my Christmases with. You make every day feel like a celebration, and I love you more than words can express.\n\nThank you for being you, for loving me, and for making me the happiest man alive. I love you, Jordan, with all my heart.";

const Christmas2025 = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);
  
  // Typewriter State
  const [displayedText, setDisplayedText] = useState('');

  // 1. Initialize Snow
  useEffect(() => {
    const items = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 5 + 7,
      size: Math.random() * 10 + 10,
      opacity: Math.random() * 0.6 + 0.2,
      blur: Math.random() * 2
    }));
    setSnowflakes(items);
  }, []);

  // 2. Typewriter Effect Logic
  useEffect(() => {
    if (cardOpen) {
      if (displayedText.length < FULL_MESSAGE.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(FULL_MESSAGE.slice(0, displayedText.length + 1));
        }, 30); 
        return () => clearTimeout(timeout);
      }
    } else {
      setDisplayedText(''); 
    }
  }, [cardOpen, displayedText]);

  return (
    <div className="christmas-page">
      
      {/* Hanging Lights */}
      <ul className="light-rope">
        {Array.from({ length: 35 }).map((_, i) => <li key={i}></li>)}
      </ul>

      {/* Polaroids - Now using the imported variables */}
      <div className="polaroids-container">
        <div className="polaroid p1">
          <img src={photo1} alt="Us" />
        </div>
        
        <div className="polaroid p2">
          <img src={photo2} alt="Us" />
        </div>

        <div className="polaroid p3">
          <img src={photo3} alt="Us" />
        </div>
      </div>


      {/* Snow */}
      <div className="snow-container">
        {snowflakes.map(s => (
          <div
            key={s.id}
            className="snowflake"
            style={{
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              fontSize: `${s.size}px`,
              opacity: s.opacity,
              filter: `blur(${s.blur}px)`
            }}
          >
            {['❄️', '❅', '❆'][s.id % 3]}
          </div>
        ))}
      </div>

      <div className="christmas-content">
        <h1 className="christmas-title">Merry Christmas</h1>
        <h2 className="christmas-subtitle">My Beautiful Jordan 💕</h2>

        {/* 3D Flip Card */}
        <div className={`premium-card-wrapper ${cardOpen ? 'opened' : ''}`}>
          <div 
            className={`premium-card ${cardOpen ? 'open' : ''}`} 
            onClick={() => setCardOpen(!cardOpen)}
          >
            <div className="card-front">
              <div className="card-seal">💌</div>
              <h3 className="card-front-title">FOR YOU</h3>
              <p className="card-front-hint">Tap to Open</p>
            </div>

            <div className="card-back">
              <div className="card-back-header">
                <span className="card-icon">💝</span>
                <h2 className="card-greeting">My Dearest Jordan,</h2>
              </div>
              
              <div className="card-message-container">
                <div className="typewriter-text typewriter-cursor">
                  {displayedText.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < displayedText.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="card-signature">
                <div className="signature-line"></div>
                <p className="signature-love">With all my love,</p>
                <p className="signature-name">Dylan ❤️</p>
              </div>
            </div>
          </div>
        </div>

        {/* Christmas Tree */}
        <div className="christmas-tree-container">
          <div className="christmas-tree">
            <div className="tree-star">⭐</div>
            <div className="tree-section tree-top">
              <span className="ornament red">🔴</span>
              <span className="ornament blue">🔵</span>
              <span className="ornament yellow">🟡</span>
            </div>
            <div className="tree-section tree-middle">
              <span className="ornament red">🔴</span>
              <span className="ornament green">🟢</span>
              <span className="ornament blue">🔵</span>
              <span className="ornament yellow">🟡</span>
            </div>
            <div className="tree-section tree-bottom">
              <span className="ornament red">🔴</span>
              <span className="ornament green">🟢</span>
              <span className="ornament blue">🔵</span>
              <span className="ornament yellow">🟡</span>
              <span className="ornament red">🔴</span>
            </div>
            <div className="tree-trunk"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Christmas2025;