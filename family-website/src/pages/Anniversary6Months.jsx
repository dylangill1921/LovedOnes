import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/6mths.css';

const Anniversary6Months = () => {
  const [isScrollOpen, setIsScrollOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load the 6mths.js script functionality
    // This is a complex page, so we'll need to initialize the scroll animations
    const script = document.createElement('script');
    script.src = '/scripts/6mths.js';
    script.async = true;
    
    // Instead of loading external script, we'll implement the key functionality inline
    // The page uses Intersection Observer for scroll animations
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Error playing audio: ", error);
      });
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleScroll = () => {
    setIsScrollOpen(!isScrollOpen);
  };

  return (
    <div className="garden-journey">
      {/* Floating Garden Elements */}
      <div className="floating-elements">
        <div className="butterfly butterfly-1"></div>
        <div className="butterfly butterfly-2"></div>
        <div className="butterfly butterfly-3"></div>
        <div className="floating-heart heart-1"></div>
        <div className="floating-heart heart-2"></div>
        <div className="floating-heart heart-3"></div>
      </div>

      {/* Garden Path */}
      <div className="garden-path"></div>

      {/* Water Droplets Animation */}
      <div className="water-droplets">
        <div className="droplet droplet-1"></div>
        <div className="droplet droplet-2"></div>
        <div className="droplet droplet-3"></div>
      </div>

      {/* Journey Sections */}
      <section className="journey-section intro-section" data-month="0">
        <div className="section-content">
          <h1 className="main-title">Our Blooming Journey</h1>
          <p className="subtitle">6 Beautiful Months Together</p>
          <div className="scroll-indicator">
            <span>Scroll to watch our love grow</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
        <div className="garden-bed starter-garden">
          <div className="seed seed-1"></div>
          <div className="seed seed-2"></div>
          <div className="seed seed-3"></div>
        </div>
      </section>

      {/* Month sections - simplified for React */}
      {[1, 2, 3, 4, 5].map((month) => (
        <section key={month} className="journey-section month-section" data-month={month}>
          <div className="milestone-marker">
            <div className="marker-content">
              <h2>Month {month}</h2>
              <span className="marker-subtitle">Growing Together</span>
            </div>
          </div>
          <div className="section-content">
            <div className="memory-card">
              <h3>Beautiful Memories</h3>
              <p>Every moment with you is a treasure.</p>
              <div className="memory-date">{new Date(2025, month + 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
            </div>
          </div>
        </section>
      ))}

      {/* Finale Section */}
      <section className="journey-section finale-section" data-month="6">
        <div className="milestone-marker final-marker">
          <div className="marker-content">
            <h2>Month 6</h2>
            <span className="marker-subtitle">Our Garden Gate</span>
          </div>
        </div>
        <div className="section-content finale-content">
          <div className="heart-gate">
            <div className="gate-left"></div>
            <div className="gate-right"></div>
            <div className="heart-lock"></div>
          </div>
          <h1 className="finale-title">Happy 6 Months, Beautiful!</h1>
          <div className="finale-date">August 2025</div>
          
          {/* Interactive Love Scroll */}
          <div 
            className={`love-scroll ${isScrollOpen ? 'open' : ''}`} 
            id="loveScroll"
            onClick={toggleScroll}
          >
            <div className="scroll-container">
              <div className="scroll-top"></div>
              <div className="scroll-body">
                <div className="scroll-content">
                  <div className="scroll-title">A Message From My Heart</div>
                  <div className="scroll-text">
                    <p><strong>My Dearest Jordan Emily Geer,</strong></p>
                    
                    <p>My lover, my girlfriend, my future wife, and my truest best friend, words can't fully capture what you mean to me. These past six months with you have been a revelation, teaching me what it truly means to love and be loved. You are the best thing that has ever happened to me, and what we share is so precious, so genuine, and feels like a dream I never want to wake from.</p>
                    
                    <p>Thank you for everything you do, every gesture, every moment of care, every smile you gift me. Not a single thing goes unnoticed. I'm endlessly captivated by you, my beautiful girl. Your sparkling eyes, your adorable nose, your perfect eyebrows, that radiant smile, your silky hair, and the way you carry yourself with such grace, it's all breathtaking. You are beautiful in every way, inside and out, and I fall deeper for you every day.</p>
                    
                    <p>From the moment we met, I knew you were special. I'll never forget our first date, when I fell in love with you under the glow of your words. Hearing you share your passions, your love for your family, and your dreams made my heart melt. Your ambition to become a nurse, driven by your genuine desire to help others no matter their struggle, is so inspiring. That selflessness has touched me deeply, and as a software engineer, I've even started weaving that same thoughtfulness into the applications I build, thanks to you.</p>
                    
                    <p>Your joy is infectious, whether we're laughing together, surrounded by your family, or out exploring the world. I can't take my eyes off you, your humor, your warmth, the way you light up every room. I'm so grateful for how you look out for me, always checking in, encouraging me to stay on top of school and work, and reminding me to take care of myself. From helping with the little things around the house to pushing me to be a better person, you make me feel so loved and supported. I never thought I could love someone like this again, but you've shown me what true love is, priceless, boundless, and life-changing.</p>
                    
                    <p>You've opened my heart in ways I never imagined, making me laugh harder, love deeper, and care more for those closest to me. Jordan, you've claimed my heart completely, and it's yours forever. As I look to the future, I see us building a life together. I'm working hard to land a great job and provide the stability we deserve. Down the road, I dream of putting a ring on your finger, marrying you, and starting a family together. You're not just my girlfriend—you're my partner in crime, my soulmate, and I truly believe God brought us together for a reason.</p>
                    
                    <p>Jordan, you are an extraordinary woman, beautiful in every way, and I'm still in awe that you chose me. I love you more than words can express, my beautiful girl, and I can't wait to celebrate countless more milestones with you. Here's to our love, our future, and the incredible journey ahead.</p>
                    
                    <p style={{ textAlign: 'center', marginTop: '25px' }}><em>With all my love,</em></p>
                    <p style={{ textAlign: 'center', marginTop: '10px', fontWeight: '600' }}>Yours forever,</p>
                    <p style={{ textAlign: 'center', marginTop: '5px', fontWeight: '600' }}>Dylan Gill 💕</p>
                    <p style={{ textAlign: 'center', marginTop: '15px', fontStyle: 'italic', color: '#666' }}>August 2025 - Our 6th Month Together</p>
                  </div>
                </div>
              </div>
              <div className="scroll-bottom"></div>
            </div>
            <div className="scroll-shadow"></div>
          </div>
          
          {/* Beautiful Sunset Background */}
          <div className="sunset-backdrop">
            <div className="sun"></div>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>
          
          {/* Enhanced Confetti Zone */}
          <div className="confetti-zone">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`confetti-particle c${i}`}></div>
            ))}
          </div>
        </div>
        <div className="garden-bed finale-garden">
          <div className="paradise-flower pf-1"></div>
          <div className="paradise-flower pf-2"></div>
          <div className="paradise-flower pf-3"></div>
          <div className="paradise-flower pf-4"></div>
          <div className="fountain-of-love"></div>
          <div className="confetti-burst"></div>
        </div>
      </section>

      {/* Interactive Watering Can */}
      <div className="watering-can" id="wateringCan">
        <div className="can-body"></div>
        <div className="can-spout"></div>
        <div className="water-stream"></div>
      </div>

      {/* Music Controls */}
      <div className="music-controls">
        {!isPlaying ? (
          <button className="music-btn play-btn" id="playBtn" onClick={handlePlay}>
            ♪ Play Our Song
          </button>
        ) : (
          <button className="music-btn pause-btn" id="pauseBtn" onClick={handlePause}>
            ⏸ Pause
          </button>
        )}
      </div>

      {/* Hidden Audio Element */}
      <audio 
        id="backgroundMusic" 
        ref={audioRef}
        loop
      >
        <source src="/assets/audio/Ed Sheeran - Perfect.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Anniversary6Months;

