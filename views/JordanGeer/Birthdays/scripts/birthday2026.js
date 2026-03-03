/*
    Title: Family Website
    Name: Dylan Gill
    File: birthday2026.js
    Date: March 3, 2026
    Description: Interactive adventure animations for Jordan's 24th Birthday page
*/

document.addEventListener('DOMContentLoaded', () => {

    // ===== PROGRESS BAR =====
    const progressFill = document.getElementById('progressFill');
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) progressFill.style.width = (scrollTop / docHeight) * 100 + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ===== ADVENTURE MAP =====
    const mapDots = document.querySelectorAll('.map-dot');
    const chapters = document.querySelectorAll('.chapter');

    function updateAdventureMap() {
        const scrollY = window.scrollY + window.innerHeight / 2;
        let activeIndex = 0;
        chapters.forEach((ch, i) => {
            if (scrollY >= ch.offsetTop) activeIndex = i;
        });
        mapDots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
    }
    window.addEventListener('scroll', updateAdventureMap, { passive: true });
    mapDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(dot.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ===== SHOOTING STARS CANVAS =====
    const starsCanvas = document.getElementById('starsCanvas');
    if (starsCanvas) {
        const sCtx = starsCanvas.getContext('2d');
        function resizeStars() {
            starsCanvas.width = starsCanvas.parentElement.offsetWidth;
            starsCanvas.height = starsCanvas.parentElement.offsetHeight;
        }
        resizeStars();
        window.addEventListener('resize', resizeStars);

        const bgStars = [];
        for (let i = 0; i < 120; i++) {
            bgStars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                size: Math.random() * 2 + 0.5,
                twinkle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01
            });
        }

        const shootingStars = [];
        function spawnShootingStar() {
            shootingStars.push({
                x: Math.random() * starsCanvas.width * 0.8,
                y: Math.random() * starsCanvas.height * 0.3,
                vx: Math.random() * 8 + 4, vy: Math.random() * 3 + 1,
                length: Math.random() * 80 + 40,
                alpha: 1, decay: Math.random() * 0.015 + 0.008
            });
        }
        setInterval(() => { if (Math.random() > 0.5) spawnShootingStar(); }, 1500);

        function animateStars() {
            sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            bgStars.forEach(s => {
                s.twinkle += s.speed;
                const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;
                sCtx.save();
                sCtx.globalAlpha = Math.max(0, alpha);
                sCtx.fillStyle = '#fff';
                sCtx.beginPath();
                sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                sCtx.fill();
                sCtx.restore();
            });

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const ss = shootingStars[i];
                ss.x += ss.vx; ss.y += ss.vy; ss.alpha -= ss.decay;
                sCtx.save();
                const grad = sCtx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.vy * (ss.length / ss.vx));
                grad.addColorStop(0, `rgba(255,255,255,${ss.alpha})`);
                grad.addColorStop(1, 'rgba(255,255,255,0)');
                sCtx.strokeStyle = grad;
                sCtx.lineWidth = 2;
                sCtx.beginPath();
                sCtx.moveTo(ss.x, ss.y);
                sCtx.lineTo(ss.x - ss.length, ss.y - ss.vy * (ss.length / ss.vx));
                sCtx.stroke();
                sCtx.globalAlpha = ss.alpha;
                sCtx.shadowColor = '#ffd700';
                sCtx.shadowBlur = 15;
                sCtx.fillStyle = '#fff';
                sCtx.beginPath();
                sCtx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
                sCtx.fill();
                sCtx.restore();
                if (ss.alpha <= 0) shootingStars.splice(i, 1);
            }
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // ===== CONFETTI & FIREWORKS =====
    const canvas = document.getElementById('celebrationCanvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const sparkleColors = ['#ff6ec7', '#ffd700', '#c084fc', '#ff4081', '#7c4dff', '#00e5ff', '#ff9100', '#69f0ae'];

    class Confetti {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width; this.y = -20;
            this.size = Math.random() * 7 + 3; this.vy = Math.random() * 2.5 + 1;
            this.vx = (Math.random() - 0.5) * 2.5; this.rot = Math.random() * 360;
            this.rotSpd = (Math.random() - 0.5) * 8;
            this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            this.alpha = 1; this.wobble = Math.random() * Math.PI * 2;
        }
        update() {
            this.y += this.vy; this.x += this.vx + Math.sin(this.wobble) * 0.4;
            this.wobble += 0.06; this.rot += this.rotSpd; this.alpha -= 0.001;
            if (this.y > canvas.height + 20 || this.alpha <= 0) this.reset();
        }
        draw() {
            ctx.save(); ctx.translate(this.x, this.y);
            ctx.rotate((this.rot * Math.PI) / 180); ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
            ctx.restore();
        }
    }

    class FireworkParticle {
        constructor(x, y, color) {
            this.x = x; this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed;
            this.color = color; this.size = Math.random() * 3 + 1;
            this.alpha = 1; this.decay = Math.random() * 0.02 + 0.008;
            this.trail = [];
        }
        update() {
            this.trail.push({ x: this.x, y: this.y, a: this.alpha * 0.5 });
            if (this.trail.length > 5) this.trail.shift();
            this.vy += 0.04; this.x += this.vx; this.y += this.vy;
            this.vx *= 0.98; this.vy *= 0.98; this.alpha -= this.decay;
        }
        draw() {
            this.trail.forEach((t, i) => {
                ctx.save(); ctx.globalAlpha = t.a * (i / this.trail.length) * 0.3;
                ctx.beginPath(); ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
            });
            ctx.save(); ctx.globalAlpha = this.alpha;
            ctx.shadowColor = this.color; ctx.shadowBlur = 15;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.fill(); ctx.restore();
        }
    }

    const confetti = [];
    const fireworks = [];
    for (let i = 0; i < 50; i++) {
        const c = new Confetti(); c.y = Math.random() * canvas.height; confetti.push(c);
    }

    function launchFirework() {
        const x = Math.random() * canvas.width * 0.7 + canvas.width * 0.15;
        const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.05;
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        for (let i = 0; i < 45; i++) fireworks.push(new FireworkParticle(x, y, color));
    }

    for (let i = 0; i < 4; i++) setTimeout(() => launchFirework(), i * 400);
    setInterval(() => { if (Math.random() > 0.4) launchFirework(); }, 2500);

    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => { c.update(); c.draw(); });
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update(); fireworks[i].draw();
            if (fireworks[i].alpha <= 0) fireworks.splice(i, 1);
        }
        requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    // ===== FLOATING PARTICLES =====
    const particlesContainer = document.getElementById('particles');
    const pColors = ['rgba(255,110,199,0.5)', 'rgba(255,215,0,0.5)', 'rgba(192,132,252,0.5)', 'rgba(255,255,255,0.2)'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 2;
        p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;
            background-color:${pColors[Math.floor(Math.random() * pColors.length)]};
            animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 5}s;
            box-shadow:0 0 ${size * 3}px ${pColors[Math.floor(Math.random() * pColors.length)]};`;
        particlesContainer.appendChild(p);
    }

    // ===== BEGIN BUTTON =====
    document.getElementById('beginBtn').addEventListener('click', () => {
        document.getElementById('chapter1').scrollIntoView({ behavior: 'smooth' });
        for (let i = 0; i < 3; i++) setTimeout(() => launchFirework(), i * 200);
    });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.animationDelay || '0') * 1000;
                setTimeout(() => entry.target.classList.add('visible'), delay);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-element').forEach(el => revealObserver.observe(el));

    // ===== TYPEWRITER =====
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const textEl = entry.target.querySelector('.typewriter-text');
                const fullText = textEl.dataset.text;
                let index = 0;
                function type() {
                    if (index < fullText.length) {
                        textEl.textContent += fullText.charAt(index);
                        index++;
                        setTimeout(type, 40 + Math.random() * 30);
                    }
                }
                setTimeout(type, 500);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.typewriter-container').forEach(el => typewriterObserver.observe(el));

    // ===== GIFT UNWRAP =====
    const giftBox = document.getElementById('giftBox');
    const giftInstruction = document.getElementById('giftInstruction');
    const giftReveal = document.getElementById('giftReveal');

    if (giftBox) {
        giftBox.addEventListener('click', () => {
            if (giftBox.classList.contains('opened')) return;
            giftBox.classList.add('opened');
            giftInstruction.classList.add('hidden');

            for (let i = 0; i < 5; i++) setTimeout(() => launchFirework(), i * 200);

            const rect = giftBox.getBoundingClientRect();
            for (let i = 0; i < 20; i++) {
                const spark = document.createElement('div');
                spark.textContent = ['✨', '🎉', '🎊', '💖', '⭐', '🌟'][Math.floor(Math.random() * 6)];
                spark.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;
                    top:${rect.top + rect.height / 2}px;font-size:${Math.random() * 20 + 15}px;
                    pointer-events:none;z-index:100;transition:all 1.5s ease-out;opacity:1;`;
                document.body.appendChild(spark);
                requestAnimationFrame(() => {
                    spark.style.transform = `translate(${(Math.random() - 0.5) * 300}px,${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 360}deg)`;
                    spark.style.opacity = '0';
                });
                setTimeout(() => spark.remove(), 1600);
            }

            setTimeout(() => giftReveal.classList.add('visible'), 1000);
        });
    }

    // ===== COUNTER ANIMATION =====
    let countersAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                document.querySelectorAll('.constellation-number').forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const duration = 2800;
                    const start = performance.now();
                    function tick(now) {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 4);
                        counter.textContent = Math.floor(eased * target).toLocaleString();
                        if (progress < 1) requestAnimationFrame(tick);
                        else counter.textContent = target.toLocaleString();
                    }
                    requestAnimationFrame(tick);
                });
            }
        });
    }, { threshold: 0.2 });
    const ch3 = document.getElementById('chapter3');
    if (ch3) counterObserver.observe(ch3);

    // ===== LETTER REVEAL =====
    let letterRevealed = false;
    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !letterRevealed) {
                letterRevealed = true;
                document.querySelectorAll('.letter-content p').forEach((p, i) => {
                    setTimeout(() => p.classList.add('visible'), i * 350);
                });
            }
        });
    }, { threshold: 0.15 });
    const ch4 = document.getElementById('chapter4');
    if (ch4) letterObserver.observe(ch4);

    // ===== LANTERN RELEASE CANVAS =====
    const lanternCanvas = document.getElementById('lanternCanvas');
    const lanternSection = document.getElementById('chapterLanterns');

    if (lanternCanvas && lanternSection) {
        const lCtx = lanternCanvas.getContext('2d');
        const lanterns = [];
        const lanternStars = [];
        let lanternCount = 0;
        const lanternCountEl = document.getElementById('lanternCount');

        const wishes = [
            "May all your dreams come true 💫",
            "Wishing you endless happiness 🌟",
            "Here's to another amazing year ✨",
            "You deserve the whole world 🌍",
            "May your smile never fade 😊",
            "Sending you all my love 💖",
            "Adventure awaits you, baby 🗺️",
            "The best is yet to come 🚀",
            "You make the world brighter ☀️",
            "Forever grateful for you 🙏",
            "Cheers to 24 incredible years 🥂",
            "You are magic 🪄",
            "Here's to us and our future 💍",
            "May laughter follow you always 😂",
            "Shine on, beautiful ⭐",
            "Every day with you is a gift 🎁"
        ];

        function resizeLanternCanvas() {
            lanternCanvas.width = lanternSection.offsetWidth;
            lanternCanvas.height = lanternSection.offsetHeight;
        }
        resizeLanternCanvas();
        window.addEventListener('resize', resizeLanternCanvas);

        // Background stars for the lantern sky
        for (let i = 0; i < 80; i++) {
            lanternStars.push({
                x: Math.random() * lanternCanvas.width,
                y: Math.random() * lanternCanvas.height,
                size: Math.random() * 1.5 + 0.5,
                twinkle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.015 + 0.005
            });
        }

        class Lantern {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vy = -(Math.random() * 0.8 + 0.3);
                this.vx = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 15 + 20;
                this.alpha = 0;
                this.maxAlpha = 0.9;
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = Math.random() * 0.01 + 0.005;
                this.glowPulse = Math.random() * Math.PI * 2;
                this.wish = wishes[Math.floor(Math.random() * wishes.length)];
                this.showWish = true;
                this.wishAlpha = 1;
                this.age = 0;
            }

            update() {
                this.age++;
                // Fade in
                if (this.alpha < this.maxAlpha) this.alpha += 0.015;
                // Float upward
                this.y += this.vy;
                this.x += this.vx + Math.sin(this.wobble) * 0.2;
                this.wobble += this.wobbleSpeed;
                this.glowPulse += 0.02;
                // Fade out wish text
                if (this.age > 120) {
                    this.wishAlpha = Math.max(0, this.wishAlpha - 0.01);
                }
                // Fade out when off screen
                if (this.y < -50) this.alpha -= 0.01;
                return this.alpha > 0;
            }

            draw() {
                const glowSize = this.size * (1.8 + Math.sin(this.glowPulse) * 0.3);

                // Outer glow
                lCtx.save();
                lCtx.globalAlpha = this.alpha * 0.2;
                const outerGlow = lCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize * 1.5);
                outerGlow.addColorStop(0, 'rgba(255, 170, 50, 0.4)');
                outerGlow.addColorStop(0.5, 'rgba(255, 120, 30, 0.1)');
                outerGlow.addColorStop(1, 'transparent');
                lCtx.fillStyle = outerGlow;
                lCtx.beginPath();
                lCtx.arc(this.x, this.y, glowSize * 1.5, 0, Math.PI * 2);
                lCtx.fill();
                lCtx.restore();

                // Lantern body (warm gradient)
                lCtx.save();
                lCtx.globalAlpha = this.alpha;
                const bodyGrad = lCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                bodyGrad.addColorStop(0, '#ffe8a0');
                bodyGrad.addColorStop(0.3, '#ffcc44');
                bodyGrad.addColorStop(0.7, '#ff8800');
                bodyGrad.addColorStop(1, 'rgba(200, 60, 10, 0.3)');
                lCtx.fillStyle = bodyGrad;
                lCtx.beginPath();
                lCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                lCtx.fill();

                // Inner bright core
                lCtx.globalAlpha = this.alpha * 0.8;
                const coreGrad = lCtx.createRadialGradient(this.x, this.y - 2, 0, this.x, this.y, this.size * 0.4);
                coreGrad.addColorStop(0, '#fff');
                coreGrad.addColorStop(1, 'transparent');
                lCtx.fillStyle = coreGrad;
                lCtx.beginPath();
                lCtx.arc(this.x, this.y - 2, this.size * 0.4, 0, Math.PI * 2);
                lCtx.fill();
                lCtx.restore();

                // Wish text
                if (this.showWish && this.wishAlpha > 0) {
                    lCtx.save();
                    lCtx.globalAlpha = this.alpha * this.wishAlpha * 0.8;
                    lCtx.font = '14px "Cormorant Garamond", serif';
                    lCtx.fillStyle = '#ffd700';
                    lCtx.textAlign = 'center';
                    lCtx.shadowColor = 'rgba(255, 215, 0, 0.5)';
                    lCtx.shadowBlur = 10;
                    lCtx.fillText(this.wish, this.x, this.y + this.size + 25);
                    lCtx.restore();
                }
            }
        }

        // Click to release lanterns
        lanternSection.addEventListener('click', (e) => {
            const rect = lanternCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            lanterns.push(new Lantern(x, y));
            lanternCount++;
            if (lanternCountEl) lanternCountEl.textContent = lanternCount;

            // Every 5th lantern, extra firework
            if (lanternCount % 5 === 0) launchFirework();
        });

        function animateLanterns() {
            lCtx.clearRect(0, 0, lanternCanvas.width, lanternCanvas.height);

            // Draw stars
            lanternStars.forEach(s => {
                s.twinkle += s.speed;
                lCtx.save();
                lCtx.globalAlpha = 0.3 + Math.sin(s.twinkle) * 0.4;
                lCtx.fillStyle = '#fff';
                lCtx.beginPath();
                lCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                lCtx.fill();
                lCtx.restore();
            });

            // Draw & update lanterns
            for (let i = lanterns.length - 1; i >= 0; i--) {
                const alive = lanterns[i].update();
                lanterns[i].draw();
                if (!alive) lanterns.splice(i, 1);
            }

            requestAnimationFrame(animateLanterns);
        }
        animateLanterns();
    }

    // ===== WISH BUTTON =====
    const wishBtn = document.getElementById('wishBtn');
    const wishReveal = document.getElementById('wishReveal');
    const heartsExplosion = document.getElementById('heartsExplosion');

    if (wishBtn) {
        wishBtn.addEventListener('click', () => {
            wishBtn.classList.add('hidden');
            setTimeout(() => wishReveal.classList.add('revealed'), 300);

            const hearts = ['💖', '💕', '💗', '💝', '🥰', '✨', '🎉', '🎊', '🎂', '💫', '⭐', '🌟'];
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const h = document.createElement('div');
                    h.classList.add('explosion-heart');
                    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    h.style.left = Math.random() * 100 + '%';
                    h.style.top = Math.random() * 100 + '%';
                    h.style.fontSize = (Math.random() * 30 + 15) + 'px';
                    h.style.setProperty('--dx', (Math.random() - 0.5) * 400 + 'px');
                    h.style.setProperty('--dy', (Math.random() - 0.5) * 400 + 'px');
                    h.style.setProperty('--rot', (Math.random() - 0.5) * 720 + 'deg');
                    heartsExplosion.appendChild(h);
                    setTimeout(() => h.remove(), 4000);
                }, i * 60);
            }
            for (let i = 0; i < 6; i++) setTimeout(() => launchFirework(), i * 300);
        });
    }

    // ===== POLAROID TILT =====
    document.querySelectorAll('.polaroid').forEach(p => {
        p.addEventListener('mousemove', (e) => {
            const rect = p.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            p.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-15px) scale(1.05)`;
        });
        p.addEventListener('mouseleave', () => {
            const rot = getComputedStyle(p).getPropertyValue('--rotate') || '0deg';
            p.style.transform = `rotate(${rot})`;
        });
    });

    // ===== MUSIC =====
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('backgroundMusic');
    const musicText = musicToggle.querySelector('.music-text');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            if (musicText) musicText.textContent = 'Play Our Song';
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                if (musicText) musicText.textContent = 'Pause';
                isPlaying = true;
            }).catch(err => console.log('Audio blocked:', err));
        }
    });

    // ===== PARALLAX HERO =====
    window.addEventListener('scroll', () => {
        const entrance = document.querySelector('.entrance-content');
        if (entrance) {
            const scrollY = window.scrollY;
            const rect = entrance.getBoundingClientRect();
            if (rect.bottom > 0) {
                entrance.style.transform = `translateY(${scrollY * 0.3}px)`;
                entrance.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.8));
            }
        }
    }, { passive: true });
});
