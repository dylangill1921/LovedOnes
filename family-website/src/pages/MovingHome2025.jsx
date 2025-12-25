import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/moving.css';

const MovingHome2025 = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [countdown, setCountdown] = useState({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef(null);

  // Countdown timer using Luxon
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://moment.github.io/luxon/global/luxon.min.js';
    script.onload = () => {
      const movingDate = window.luxon.DateTime.fromISO('2025-06-19T07:00:00', { zone: 'America/Toronto' });
      
      const updateCountdown = () => {
        const now = window.luxon.DateTime.local().setZone('America/Toronto');
        const diff = movingDate.diff(now, ['months', 'days', 'hours', 'minutes', 'seconds']).toObject();
        
        Object.keys(diff).forEach(unit => {
          diff[unit] = Math.abs(Math.floor(diff[unit]));
        });
        
        setCountdown({
          months: diff.months,
          days: diff.days,
          hours: diff.hours,
          minutes: diff.minutes,
          seconds: Math.floor(diff.seconds)
        });
      };
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      
      return () => clearInterval(interval);
    };
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Auto-play background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }
  }, []);

  const showSection = (section) => {
    setActiveSection(section);
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetView = () => {
    setActiveSection(null);
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '60px' }}>
      <section 
        className={`title-section ${activeSection ? 'hidden' : ''}`}
        style={{ display: activeSection ? 'none' : 'flex' }}
      >
        <h1 className="main">Moving Day 2025</h1>
        <div className="countdown-container">
          <div className="countdown-item">
            <span id="months">{countdown.months}</span>
            <p>Months</p>
          </div>
          <div className="countdown-item">
            <span id="days">{countdown.days}</span>
            <p>Days</p>
          </div>
          <div className="countdown-item">
            <span id="hours">{countdown.hours}</span>
            <p>Hours</p>
          </div>
          <div className="countdown-item">
            <span id="minutes">{countdown.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="countdown-item">
            <span id="seconds">{countdown.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>
        <div className="button-container">
          <button id="momBtn" className="parent-btn" onClick={() => showSection('mom')}>
            Mom
          </button>
          <button id="dadBtn" className="parent-btn" onClick={() => showSection('dad')}>
            Dad
          </button>
        </div>
      </section>

      <section 
        id="momSection" 
        className={`parent-section ${activeSection === 'mom' ? 'active' : ''}`}
      >
        <h2>Mom's Section</h2>
        <div className="section-content">
          <div className="scroll-container">
            <div className="scroll">
              <div className="scroll-symbol">✧</div>
              <div className="scroll-content">
                Dear Mom,
                <br />
                This is the hardest good bye yet I have ever gave anyone, it's like the most important person in my life is leaving me, My rock is crumbling away.
                Mom thank you for everything you have done for me in my lat 22 years, honestly I don't know if I could ever repay you as you have done so much for me. Thank you for all laughs, all the memories, all the support, and all the love you have given me.
                Mom you have have made me the happiest and most proudest son in the whole world, as you do so much for this family and for me that I can't even begin to repay you. I'm going to miss you so much, as I won't have anyone
                to annoy, to yell at, to ask you to do my laundry, and to piss you off. Mom thank you for being my rock for the last 22 years, and thank you for always being there for me, and always loving me no matter when I f***** up.
                You mean the absolute world to me Mom as words couldn't even describe how much you mean to me. I am really scared to move out on my own soon but I have no other choice. Thank you for everything you have done for the family mom as every
                every single thing you have done has not gone unnoticed, and it all speaks volume on how big your heart is as you truly love this family. Thank you for always taking care of me, spending time with me, watching movies and my shows with me while I was growing up.
                Hopefully when you come in October I will be graduated and have a job is the plan but who knows whats going to happen. Thank you so much for being so kind and loving to Jordan as you both are my two worlds, and hopefully 
                sometime in the near future we get married and have a kid, and then you can be a grandma and move back here. I love you so much Mom, I am so proud of you and how far you have come in life, I'm going to miss you so much you have no idea truly this is
                the hardest good bye yet and your my world...
                <br />
                I'll Love you forever,
                <br />
                I'll Like you for always,
                <br />
                As long as I'm living
                <br />
                my Mommy you will be
                <br />
                Love Always,<br />
                Dylan Gill #88
              </div>
            </div>
          </div>
          <div className="photo-gallery">
            <div className="photo-item">
              <img src="/assets/images/IMG_7324.jpeg" alt="Mom and me past" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7329.jpeg" alt="Mom and me present" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7321.jpeg" alt="Mom and me present" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7322.jpeg" alt="Dad and me present" />
            </div>
          </div>
          <button className="back-btn" onClick={resetView}>Back</button>
        </div>
      </section>

      <section 
        id="dadSection" 
        className={`parent-section ${activeSection === 'dad' ? 'active' : ''}`}
      >
        <h2>Dad's Section</h2>
        <div className="section-content">
          <div className="scroll-container">
            <div className="scroll">
              <div className="scroll-symbol">✧</div>
              <div className="scroll-content"> 
                Dear Dad, 
                <br />
                I wish this was going to be easier, but this has not been easy at all to deal with. Dad I'm sorry for getting mad at you the last
                few weeks very easily, as I'm not mad with you, I am mad about you guys leaving, and I don't want you to leave at all. Dad thank you for 
                everything you have done for this family through the last 22 years, all the sacrifices you have made, all the hard work you have put in, and all the love you have given to this family.
                None of that ever goes unnoticed, and I will never forget it. I will never forget the times we have spent together, the times we have laughed, the times we have cried, the times you have taught me, and the times you have been there for me.
                I love you so much man, and I will miss having you in my life everyday. I honestly am going to hate the fact that I don't have you to talk about sports with anymore... Dad you were such a huge person in my life, I have always said since I was little
                you are my hero, and I truly meant those words. You have done so much for me in my life that I hope I can now make you proud to call me your son, as I hope to graduate in the coming months, and I hope to get a job in my field of work so you can be proud of me to finally getting the big boy job!
                I want to be a man like you who is always there for his family, and who always puts his family first. I promise you I will never forget anything you have taught me through the last 22 years of my life,
                all the stuff you keep reminding me and telling me has stayed as a reminder in my mind through the years. I know we havenn't had the best relationship over the years but I promise you I have done nothing but admire and look up to you as you have been a great father to me and the family, you have
                set the bounds of what it means to be a father, and I will only hope to be half the man you are in life. You have given me a new goal in life to strive for as being a man like you Dad. Hopefully in the next few years I can begin my life with Jordan and hopefully get married, and then have a kid, and hopefully then you can be proud of me Dad.
                Man I love you so much Dad, and I'm really going to miss you, this F****** sucks that your leaving and its not a good feeling but man will I miss you so much man. Please take care of Mom for me, and the dogs. Please keep in touch with me call or text whenever you want man not like I got much going on at the moment but hopefully soon.
                Make sure you come down for my graduation as it is in October I believe, and hopefully I get a job before then so I can make you proud. Well Dad I love you man and I hope you and Mom enjoy this new journey your on and you guys have a blast in the Newfoundland and The Dominican. 
                <br />
                Love Always,<br />
                Dylan Gill #88
              </div>
            </div>
          </div>
          <div className="photo-gallery">
            <div className="photo-item">
              <img src="/assets/images/IMG_7327.jpeg" alt="Dad and me past" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7323.jpeg" alt="Dad and me present" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7326.jpeg" alt="Dad and me present" />
            </div>
            <div className="photo-item">
              <img src="/assets/images/IMG_7322.jpeg" alt="Dad and me present" />
            </div>
          </div>
          <button className="back-btn" onClick={resetView}>Back</button>
        </div>
      </section>
      
      <audio 
        id="bg-music" 
        ref={audioRef}
        loop 
        style={{ display: 'none' }}
      >
        <source src="/assets/audio/snowpatrol.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MovingHome2025;

