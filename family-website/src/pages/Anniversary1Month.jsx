import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/1month.css';

const Anniversary1Month = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState('');
  const audioRef = useRef(null);

  // Star animation
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    };
    const interval = setInterval(createStar, 200);
    return () => clearInterval(interval);
  }, []);

  // Timer using Luxon
  useEffect(() => {
    // Dynamically load Luxon
    const script = document.createElement('script');
    script.src = 'https://moment.github.io/luxon/global/luxon.min.js';
    script.onload = () => {
      const startDate = window.luxon.DateTime.fromISO('2025-02-12T19:00:00', { zone: 'America/Toronto' });
      
      const updateTimer = () => {
        const now = window.luxon.DateTime.local().setZone('America/Toronto');
        const diff = now.diff(startDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();
        
        diff.seconds = Math.floor(diff.seconds);
        
        if (now < startDate) {
          Object.keys(diff).forEach(key => {
            diff[key] = Math.abs(diff[key]);
          });
        }
        
        setTimer(`${diff.years}y ${diff.months}m ${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s`);
      };
      
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    };
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const toggleSection = () => {
    setIsActive(!isActive);
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
    <main className="main-content">
      <section className="anniversary-section">
        <div className="section-content">
          <h1>Happy 1 Month Baby</h1>

          <div className="timer-box">
            <div className="timer" id="timer">{timer}</div>
          </div>

          <div className={`message-container ${isActive ? 'active' : ''}`}>
            <button className="heart" onClick={toggleSection}></button>
            <div className="scroll-wrapper">
              <div className="scroll-content">
                My Love, Where has the time gone... Honestly feels like I have known you my whole life.
                Baby how happy I am and lucky to have you in my life as been a blessing from god, you are the bestest thing that has
                ever happend to me! You make me feel like the luckiest guy on earth! Baby you are such a blessing like god has given me the
                most BEAUTIFUL GIRL in the whole world and I get to call you mine is absoloutley mind blowing to me...
                Baby getting to know you I have gotten to see pretty much every side of you and I love all of it as you are beautiful on the inside and outside,
                I just can't get enough of you honestly.
                Babe being in your presence is like heaven to me because I have so much joy being with you, I feel at peace with everything in my life,
                I am so happy, and I feel so safe when im with you. Jordan I've never thought I would love again until I met you, you have taught me how to 
                be there for someone no matter the situation mentally or physically, or even just someone to talk to, or someone to hold, or someone to lean on...
                Baby thank you for being the bestest girlfriend a guy could ever ask for because I see so much more than you just being my girlfriend, I see us getting married,
                I see us starting a family, I see us being in love until death do us part, I see us having a beautiful family and a dog one day and living 
                where we always dream of! That's all because you took a chance with a guy you never met before and trusted your gut and look where we are now...
                Babe you have such a beautiful soul, you are such a good person, and your the most beautiful girl in the whole world, honestly do not want to fuck
                this up beacuase you are so perfect and I want to be the bestest and mostest perfect boyfriend for you because you are the bestest thing thats ever happend to me.
                Thank you for being you, thank you for teaching me how to love someone again, thank you for making me a better person, thank you for being a angel in my life,
                thank you for loving me, thank you for always asking how I'm doing, thank you for always taking care of me when I need it, thank you for always being there for me,
                thank you for being my rock, thank you for showing me the future, thank you for everything you have done for me, as you mean the world to me.
                My BEAUTIFUL GIRL I love you to the moon and back and HAPPY Anniversary my love, I hope I can be everything you need in a man as you are everything and more and some more for me!!
                You have taught me how to be a better man and how to care for someone babe...<br />
                LOVE YOU SO MUCH Babe!<br />
                Yours Truly,<br />
                Dylan Gill
              </div>
            </div>
            <div className="audio-controls">
              <button id="playButton" onClick={handlePlay} aria-label="Play music">Play</button>
              <button id="stopButton" onClick={handleStop} aria-label="Stop music">Stop</button>
            </div>
          </div>
        </div>
      </section>

      <audio 
        id="backgroundMusic" 
        ref={audioRef}
        loop 
        style={{ display: 'none' }}
      >
        <source src="/assets/audio/Vance Joy - Riptide (Lyrics).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
};

export default Anniversary1Month;

