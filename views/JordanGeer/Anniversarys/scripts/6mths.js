// Garden Path Journey - 6 Month Anniversary Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initWateringCan();
    initMusicControls();
    initParallaxEffects();
    initGardenInteractions();
    initLoveScroll(); // Add love scroll functionality
    
    console.log('Garden Path Journey initialized! 🌸');
});

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    // Options for the intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.3
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const month = section.dataset.month;
            
            if (entry.isIntersecting) {
                // Trigger section animations when entering viewport
                animateSection(section, month);
                
                // Add visible class to trigger CSS animations
                section.classList.add('visible');
                
                // Animate garden elements
                animateGarden(section, month);
                
            } else {
                // Reset animations when leaving viewport
                resetSection(section, month);
                
                // Remove visible class to reset CSS animations
                section.classList.remove('visible');
                
                // Reset garden elements
                resetGarden(section, month);
            }
        });
    }, observerOptions);

    // Observe all journey sections
    const sections = document.querySelectorAll('.journey-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Special handling for elements within sections
    initElementObserver();
}

// Initialize element-specific observer for milestone markers and memory cards
function initElementObserver() {
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delays for multiple elements
                if (entry.target.classList.contains('memory-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }, 200);
                }
            } else {
                // Reset when leaving viewport
                entry.target.classList.remove('visible');
                
                if (entry.target.classList.contains('memory-card')) {
                    entry.target.style.transform = 'translateY(30px) scale(0.9)';
                    entry.target.style.opacity = '0';
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -20% 0px'
    });

    // Observe milestone markers and memory cards
    const milestones = document.querySelectorAll('.milestone-marker');
    const memoryCards = document.querySelectorAll('.memory-card');
    
    [...milestones, ...memoryCards].forEach(element => {
        elementObserver.observe(element);
    });
}

// Animate sections based on month
function animateSection(section, month) {
    const monthNum = parseInt(month);
    
    // Update background gradient position based on scroll
    updateBackgroundGradient(monthNum);
    
    // Trigger specific animations based on month
    switch(monthNum) {
        case 0:
            animateIntroSection(section);
            break;
        case 1:
            animateMonth1(section);
            break;
        case 2:
            animateMonth2(section);
            break;
        case 3:
            animateMonth3(section);
            break;
        case 4:
            animateMonth4(section);
            break;
        case 5:
            animateMonth5(section);
            break;
        case 6:
            animateFinaleSection(section);
            break;
    }
}

// Animate garden elements for each month
function animateGarden(section, month) {
    const gardenBed = section.querySelector('.garden-bed');
    if (!gardenBed) return;

    // Add visible class to trigger CSS animations
    setTimeout(() => {
        gardenBed.classList.add('visible');
    }, 300);

    // Create floating particles for special months
    if (month === '4' || month === '6') {
        createFloatingParticles(section);
    }
}

// Specific month animations
function animateIntroSection(section) {
    const title = section.querySelector('.main-title');
    const subtitle = section.querySelector('.subtitle');
    const scrollIndicator = section.querySelector('.scroll-indicator');
    
    // Staggered title animations
    if (title) {
        setTimeout(() => {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (subtitle) {
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 1000);
    }
    
    if (scrollIndicator) {
        setTimeout(() => {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }, 1500);
    }
}

function animateMonth1(section) {
    // Trigger seed sprouting animation
    const seeds = section.querySelectorAll('.seed');
    seeds.forEach((seed, index) => {
        setTimeout(() => {
            seed.style.transform = 'scale(1.2)';
            seed.style.opacity = '1';
            
            // Transform seeds into buds after delay
            setTimeout(() => {
                transformSeedToBud(seed);
            }, 1000);
        }, index * 300);
    });
}

function animateMonth2(section) {
    // Animate flower blooming with color transitions
    const flowers = section.querySelectorAll('.blooming-flower');
    flowers.forEach((flower, index) => {
        setTimeout(() => {
            flower.style.opacity = '1';
            flower.style.transform = 'scale(1)';
            
            // Add blooming animation
            flower.classList.add('blooming');
        }, index * 500);
    });
}

function animateMonth3(section) {
    // Animate butterfly appearance
    const butterfly = section.querySelector('.garden-butterfly');
    if (butterfly) {
        setTimeout(() => {
            butterfly.style.opacity = '1';
            butterfly.classList.add('dancing');
        }, 1000);
    }
}

function animateMonth4(section) {
    // Create petal shower effect
    createPetalShower(section);
    
    // Animate rose bush growth
    const roseBush = section.querySelector('.rose-bush');
    if (roseBush) {
        setTimeout(() => {
            roseBush.style.opacity = '1';
            roseBush.style.transform = 'scale(1)';
        }, 800);
    }
}

function animateMonth5(section) {
    // Animate seasonal changes
    const tree = section.querySelector('.seasonal-tree');
    if (tree) {
        setTimeout(() => {
            tree.style.opacity = '1';
            tree.style.transform = 'scaleY(1)';
        }, 600);
    }
    
    // Create falling leaves effect
    createFallingLeaves(section);
}

function animateFinaleSection(section) {
    // Animate heart gate opening
    const heartGate = section.querySelector('.heart-gate');
    if (heartGate) {
        setTimeout(() => {
            heartGate.style.opacity = '1';
            heartGate.style.transform = 'scale(1)';
            
            // Open the gates
            setTimeout(() => {
                const gateLeft = section.querySelector('.gate-left');
                const gateRight = section.querySelector('.gate-right');
                
                if (gateLeft) gateLeft.style.transform = 'rotateY(-45deg)';
                if (gateRight) gateRight.style.transform = 'rotateY(45deg)';
            }, 1000);
        }, 500);
    }
    
    // Create confetti explosion
    setTimeout(() => {
        createConfettiExplosion(section);
    }, 2000);
}

// Reset sections when scrolling away
function resetSection(section, month) {
    const monthNum = parseInt(month);
    
    // Reset specific animations based on month
    switch(monthNum) {
        case 0:
            resetIntroSection(section);
            break;
        case 1:
            resetMonth1(section);
            break;
        case 2:
            resetMonth2(section);
            break;
        case 3:
            resetMonth3(section);
            break;
        case 4:
            resetMonth4(section);
            break;
        case 5:
            resetMonth5(section);
            break;
        case 6:
            resetFinaleSection(section);
            break;
    }
}

// Reset garden elements for each month
function resetGarden(section, month) {
    const gardenBed = section.querySelector('.garden-bed');
    if (!gardenBed) return;

    // Remove visible class to reset CSS animations
    gardenBed.classList.remove('visible');
}

// Reset functions for each section
function resetIntroSection(section) {
    const title = section.querySelector('.main-title');
    const subtitle = section.querySelector('.subtitle');
    const scrollIndicator = section.querySelector('.scroll-indicator');
    
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
    }
    
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(30px)';
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateY(30px)';
    }
}

function resetMonth1(section) {
    const seeds = section.querySelectorAll('.seed');
    seeds.forEach(seed => {
        seed.style.transform = 'scale(1)';
        seed.style.opacity = '0';
        seed.style.backgroundColor = '#8B4513';
        seed.style.width = '6px';
        seed.style.height = '6px';
        seed.style.borderRadius = '50%';
    });
}

function resetMonth2(section) {
    const flowers = section.querySelectorAll('.blooming-flower');
    flowers.forEach(flower => {
        flower.style.opacity = '0';
        flower.style.transform = 'scale(0)';
        flower.classList.remove('blooming');
    });
}

function resetMonth3(section) {
    const butterfly = section.querySelector('.garden-butterfly');
    if (butterfly) {
        butterfly.style.opacity = '0';
        butterfly.classList.remove('dancing');
    }
}

function resetMonth4(section) {
    const roseBush = section.querySelector('.rose-bush');
    if (roseBush) {
        roseBush.style.opacity = '0';
        roseBush.style.transform = 'scale(0)';
    }
}

function resetMonth5(section) {
    const tree = section.querySelector('.seasonal-tree');
    if (tree) {
        tree.style.opacity = '0';
        tree.style.transform = 'scaleY(0)';
    }
}

function resetFinaleSection(section) {
    const heartGate = section.querySelector('.heart-gate');
    if (heartGate) {
        heartGate.style.opacity = '0';
        heartGate.style.transform = 'scale(0)';
        
        const gateLeft = section.querySelector('.gate-left');
        const gateRight = section.querySelector('.gate-right');
        
        if (gateLeft) gateLeft.style.transform = 'rotateY(0deg)';
        if (gateRight) gateRight.style.transform = 'rotateY(0deg)';
    }
}

// Interactive watering can functionality
function initWateringCan() {
    const wateringCan = document.getElementById('wateringCan');
    const waterDroplets = document.querySelector('.water-droplets');
    
    if (!wateringCan || !waterDroplets) return;
    
    let isWatering = false;
    
    wateringCan.addEventListener('click', function() {
        if (isWatering) return;
        
        isWatering = true;
        wateringCan.classList.add('active');
        waterDroplets.classList.add('active');
        
        // Create water splash effect at cursor position
        createWaterSplash(event.clientX, event.clientY);
        
        // Enhance nearby flowers
        enhanceNearbyFlowers();
        
        // Stop watering after 3 seconds
        setTimeout(() => {
            wateringCan.classList.remove('active');
            waterDroplets.classList.remove('active');
            isWatering = false;
        }, 3000);
    });
    
    // Add hover effect
    wateringCan.addEventListener('mouseenter', function() {
        if (!isWatering) {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    wateringCan.addEventListener('mouseleave', function() {
        if (!isWatering) {
            this.style.transform = 'scale(1) rotate(0deg)';
        }
    });
}

// Music controls functionality
function initMusicControls() {
    const audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    
    if (!audio || !playBtn || !pauseBtn) return;
    
    // Try to autoplay when page loads
    const tryAutoplay = () => {
        audio.play()
            .then(() => {
                // Autoplay successful
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
                addMusicVisualization();
                console.log('🎵 Ed Sheeran - Perfect is now playing!');
            })
            .catch(error => {
                // Autoplay failed (browser policy), show play button
                console.log('Autoplay prevented by browser policy. User interaction required.');
                playBtn.style.display = 'block';
                pauseBtn.style.display = 'none';
            });
    };
    
    // Attempt autoplay after a short delay to ensure page is ready
    setTimeout(tryAutoplay, 1000);
    
    // Manual play button
    playBtn.addEventListener('click', function() {
        audio.play()
            .then(() => {
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'block';
                
                // Add music visualization effect
                addMusicVisualization();
                console.log('🎵 Music started playing!');
            })
            .catch(error => {
                console.log('Audio playback failed:', error);
            });
    });
    
    // Manual pause button
    pauseBtn.addEventListener('click', function() {
        audio.pause();
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        
        // Remove music visualization
        removeMusicVisualization();
        console.log('🎵 Music paused');
    });
    
    // Handle audio end (though it's set to loop)
    audio.addEventListener('ended', function() {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        removeMusicVisualization();
    });
    
    // Handle audio play/pause events for state sync
    audio.addEventListener('play', function() {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        addMusicVisualization();
    });
    
    audio.addEventListener('pause', function() {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        removeMusicVisualization();
    });
    
    // Handle browser autoplay policy changes
    audio.addEventListener('canplaythrough', function() {
        // Audio is ready to play through
        if (audio.paused && !audio.currentTime) {
            // Try autoplay again if it hasn't started yet
            tryAutoplay();
        }
    });
}

// Parallax effects for floating elements
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Move floating elements
        const butterflies = document.querySelectorAll('.butterfly');
        const hearts = document.querySelectorAll('.floating-heart');
        
        butterflies.forEach((butterfly, index) => {
            const speed = 0.3 + (index * 0.1);
            butterfly.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        hearts.forEach((heart, index) => {
            const speed = 0.2 + (index * 0.15);
            heart.style.transform = `translateY(${scrolled * speed}px) rotate(45deg)`;
        });
        
        // Update garden path growth
        updateGardenPath(scrolled);
    });
}

// Garden interaction effects
function initGardenInteractions() {
    // Add click events to flowers for special effects
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('blooming-flower') ||
            e.target.classList.contains('full-flower') ||
            e.target.classList.contains('vibrant-flower') ||
            e.target.classList.contains('paradise-flower')) {
            
            createFlowerSparkles(e.target);
        }
    });
    
    // Add hover effects to memory cards
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Interactive Love Scroll functionality
function initLoveScroll() {
    const loveScroll = document.getElementById('loveScroll');
    if (!loveScroll) return;
    
    let isOpen = false;
    
    loveScroll.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!isOpen) {
            // Open the scroll
            this.classList.add('open');
            isOpen = true;
            
            // Add gentle scroll shake animation
            this.style.animation = 'scroll-open 0.8s ease-out';
            
            // Create sparkles around the scroll
            createScrollSparkles(this);
            
            // Play a soft chime sound effect (if available)
            playScrollSound();
            
        } else {
            // Close the scroll
            this.classList.remove('open');
            isOpen = false;
            
            // Add closing animation
            this.style.animation = 'scroll-close 0.6s ease-in';
        }
        
        // Reset animation after completion
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
    });
    
    // Close scroll when clicking outside
    document.addEventListener('click', function(e) {
        if (!loveScroll.contains(e.target) && isOpen) {
            loveScroll.classList.remove('open');
            isOpen = false;
        }
    });
    
    // Add hover effects
    loveScroll.addEventListener('mouseenter', function() {
        if (!isOpen) {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.filter = 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.3))';
        }
    });
    
    loveScroll.addEventListener('mouseleave', function() {
        if (!isOpen) {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))';
        }
    });
}

// Helper functions for special effects

function createFloatingParticles(section) {
    const particleColors = ['#FFB6C1', '#FFD700', '#FF69B4', '#DDA0DD'];
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particle-float ${3 + Math.random() * 2}s ease-in-out infinite`;
        
        section.appendChild(particle);
        
        // Animate in
        setTimeout(() => {
            particle.style.opacity = '1';
        }, i * 100);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

function createPetalShower(section) {
    const petals = ['🌸', '🌺', '🌷', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.position = 'absolute';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-20px';
        petal.style.fontSize = '20px';
        petal.style.opacity = '0.8';
        petal.style.pointerEvents = 'none';
        petal.style.animation = `petal-fall ${4 + Math.random() * 2}s linear forwards`;
        
        section.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 6000);
    }
}

function createFallingLeaves(section) {
    const leaves = ['🍂', '🍁'];
    
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.position = 'absolute';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.top = '-20px';
        leaf.style.fontSize = '18px';
        leaf.style.opacity = '0.7';
        leaf.style.pointerEvents = 'none';
        leaf.style.animation = `leaf-fall ${5 + Math.random() * 3}s linear forwards`;
        
        section.appendChild(leaf);
        
        setTimeout(() => {
            leaf.remove();
        }, 8000);
    }
}

function createConfettiExplosion(section) {
    const colors = ['#FFD700', '#FF69B4', '#87CEEB', '#FFB6C1', '#DDA0DD'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 200;
        const gravity = 0.5;
        
        confetti.style.animation = `confetti-burst 3s ease-out forwards`;
        confetti.style.setProperty('--angle', angle + 'rad');
        confetti.style.setProperty('--velocity', velocity + 'px');
        
        section.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function createWaterSplash(x, y) {
    for (let i = 0; i < 8; i++) {
        const splash = document.createElement('div');
        splash.style.position = 'fixed';
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        splash.style.width = '6px';
        splash.style.height = '6px';
        splash.style.borderRadius = '50%';
        splash.style.backgroundColor = '#87CEEB';
        splash.style.pointerEvents = 'none';
        splash.style.zIndex = '1000';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        
        splash.style.animation = `water-splash 0.8s ease-out forwards`;
        splash.style.setProperty('--angle', angle + 'rad');
        splash.style.setProperty('--distance', distance + 'px');
        
        document.body.appendChild(splash);
        
        setTimeout(() => {
            splash.remove();
        }, 800);
    }
}

function enhanceNearbyFlowers() {
    const flowers = document.querySelectorAll('[class*="flower"], [class*="paradise"]');
    flowers.forEach(flower => {
        flower.style.filter = 'brightness(1.3) saturate(1.2)';
        flower.style.transform = flower.style.transform + ' scale(1.1)';
        
        setTimeout(() => {
            flower.style.filter = '';
            flower.style.transform = flower.style.transform.replace(' scale(1.1)', '');
        }, 3000);
    });
}

function createFlowerSparkles(flower) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '12px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10';
        
        const rect = flower.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        sparkle.style.animation = `sparkle 1s ease-out forwards`;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function transformSeedToBud(seed) {
    seed.style.backgroundColor = '#90EE90';
    seed.style.width = '12px';
    seed.style.height = '12px';
    seed.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
}

function updateBackgroundGradient(month) {
    const body = document.body;
    const progress = month / 6;
    
    // Update background position to show progression
    body.style.backgroundPosition = `0 ${progress * 20}%`;
}

function updateGardenPath(scrolled) {
    const path = document.querySelector('.garden-path');
    if (!path) return;
    
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrolled / maxScroll;
    
    // Update path width based on scroll progress
    const newWidth = 8 + (scrollProgress * 4);
    path.style.width = newWidth + 'px';
    
    // Update path glow
    const glowIntensity = 0.3 + (scrollProgress * 0.4);
    path.style.boxShadow = `0 0 ${10 + scrollProgress * 20}px rgba(255, 215, 0, ${glowIntensity})`;
}

function addMusicVisualization() {
    const musicBtns = document.querySelectorAll('.music-btn');
    musicBtns.forEach(btn => {
        btn.classList.add('playing');
        btn.style.animation = 'music-pulse 1s ease-in-out infinite alternate';
    });
}

function removeMusicVisualization() {
    const musicBtns = document.querySelectorAll('.music-btn');
    musicBtns.forEach(btn => {
        btn.classList.remove('playing');
        btn.style.animation = '';
    });
}

// Helper function for scroll sparkles
function createScrollSparkles(scroll) {
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '16px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '20';
        sparkle.style.color = '#FFD700';
        
        const rect = scroll.getBoundingClientRect();
        const angle = (i / 12) * Math.PI * 2;
        const radius = 60;
        
        sparkle.style.left = (rect.left + rect.width / 2 + Math.cos(angle) * radius) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2 + Math.sin(angle) * radius) + 'px';
        
        sparkle.style.animation = `scroll-sparkle 1.5s ease-out forwards`;
        sparkle.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

// Helper function for scroll sound (optional)
function playScrollSound() {
    // Create a subtle sound effect using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        // Silently fail if Web Audio API is not supported
        console.log('Audio effect not available');
    }
}

// Add custom CSS animations dynamically
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% { transform: translateY(0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        
        @keyframes petal-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes leaf-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 0.7; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes confetti-burst {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(calc(-50% + var(--velocity) * cos(var(--angle))), calc(-50% + var(--velocity) * sin(var(--angle)))) scale(0); opacity: 0; }
        }
        
        @keyframes water-splash {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(calc(-50% + var(--distance) * cos(var(--angle))), calc(-50% + var(--distance) * sin(var(--angle)))) scale(0); opacity: 0; }
        }
        
        @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 1; }
            50% { transform: scale(1) rotate(180deg); opacity: 1; }
            100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes music-pulse {
            0% { box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3); }
            100% { box-shadow: 0 8px 25px rgba(255, 105, 180, 0.6); }
        }
        
        @keyframes scroll-open {
            0% { transform: scale(1.05) rotate(0deg); }
            25% { transform: scale(1.1) rotate(2deg); }
            50% { transform: scale(1.08) rotate(-1deg); }
            75% { transform: scale(1.06) rotate(1deg); }
            100% { transform: scale(1.05) rotate(0deg); }
        }
        
        @keyframes scroll-close {
            0% { transform: scale(1.05) rotate(0deg); }
            50% { transform: scale(1.02) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes scroll-sparkle {
            0% { 
                transform: scale(0) rotate(0deg); 
                opacity: 0; 
            }
            50% { 
                transform: scale(1.2) rotate(180deg); 
                opacity: 1; 
            }
            100% { 
                transform: scale(0) rotate(360deg) translateY(-20px); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize custom animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCustomAnimations);
} else {
    addCustomAnimations();
}
