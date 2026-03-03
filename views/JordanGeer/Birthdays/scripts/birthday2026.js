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
        chapters.forEach((ch, i) => { if (scrollY >= ch.offsetTop) activeIndex = i; });
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
        function resizeStars() { starsCanvas.width = starsCanvas.parentElement.offsetWidth; starsCanvas.height = starsCanvas.parentElement.offsetHeight; }
        resizeStars(); window.addEventListener('resize', resizeStars);
        const bgStars = [];
        for (let i = 0; i < 120; i++) bgStars.push({ x: Math.random() * starsCanvas.width, y: Math.random() * starsCanvas.height, size: Math.random() * 2 + 0.5, twinkle: Math.random() * Math.PI * 2, speed: Math.random() * 0.02 + 0.01 });
        const shootingStars = [];
        function spawnShootingStar() { shootingStars.push({ x: Math.random() * starsCanvas.width * 0.8, y: Math.random() * starsCanvas.height * 0.3, vx: Math.random() * 8 + 4, vy: Math.random() * 3 + 1, length: Math.random() * 80 + 40, alpha: 1, decay: Math.random() * 0.015 + 0.008 }); }
        setInterval(() => { if (Math.random() > 0.5) spawnShootingStar(); }, 1500);
        function animateStars() {
            sCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            bgStars.forEach(s => { s.twinkle += s.speed; sCtx.save(); sCtx.globalAlpha = Math.max(0, 0.3 + Math.sin(s.twinkle) * 0.4); sCtx.fillStyle = '#fff'; sCtx.beginPath(); sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); sCtx.fill(); sCtx.restore(); });
            for (let i = shootingStars.length - 1; i >= 0; i--) { const ss = shootingStars[i]; ss.x += ss.vx; ss.y += ss.vy; ss.alpha -= ss.decay; sCtx.save(); const grad = sCtx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y - ss.vy * (ss.length / ss.vx)); grad.addColorStop(0, `rgba(255,255,255,${ss.alpha})`); grad.addColorStop(1, 'rgba(255,255,255,0)'); sCtx.strokeStyle = grad; sCtx.lineWidth = 2; sCtx.beginPath(); sCtx.moveTo(ss.x, ss.y); sCtx.lineTo(ss.x - ss.length, ss.y - ss.vy * (ss.length / ss.vx)); sCtx.stroke(); sCtx.globalAlpha = ss.alpha; sCtx.shadowColor = '#ffd700'; sCtx.shadowBlur = 15; sCtx.fillStyle = '#fff'; sCtx.beginPath(); sCtx.arc(ss.x, ss.y, 2, 0, Math.PI * 2); sCtx.fill(); sCtx.restore(); if (ss.alpha <= 0) shootingStars.splice(i, 1); }
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // ===== CONFETTI & FIREWORKS =====
    const canvas = document.getElementById('celebrationCanvas');
    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas(); window.addEventListener('resize', resizeCanvas);
    const sparkleColors = ['#ff6ec7', '#ffd700', '#c084fc', '#ff4081', '#7c4dff', '#00e5ff', '#ff9100', '#69f0ae'];

    class Confetti {
        constructor() { this.reset(); }
        reset() { this.x = Math.random() * canvas.width; this.y = -20; this.size = Math.random() * 7 + 3; this.vy = Math.random() * 2.5 + 1; this.vx = (Math.random() - 0.5) * 2.5; this.rot = Math.random() * 360; this.rotSpd = (Math.random() - 0.5) * 8; this.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)]; this.alpha = 1; this.wobble = Math.random() * Math.PI * 2; }
        update() { this.y += this.vy; this.x += this.vx + Math.sin(this.wobble) * 0.4; this.wobble += 0.06; this.rot += this.rotSpd; this.alpha -= 0.001; if (this.y > canvas.height + 20 || this.alpha <= 0) this.reset(); }
        draw() { ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rot * Math.PI / 180); ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color; ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2); ctx.restore(); }
    }
    class FireworkParticle {
        constructor(x, y, color) { this.x = x; this.y = y; const a = Math.random() * Math.PI * 2; const s = Math.random() * 6 + 2; this.vx = Math.cos(a) * s; this.vy = Math.sin(a) * s; this.color = color; this.size = Math.random() * 3 + 1; this.alpha = 1; this.decay = Math.random() * 0.02 + 0.008; this.trail = []; }
        update() { this.trail.push({ x: this.x, y: this.y, a: this.alpha * 0.5 }); if (this.trail.length > 5) this.trail.shift(); this.vy += 0.04; this.x += this.vx; this.y += this.vy; this.vx *= 0.98; this.vy *= 0.98; this.alpha -= this.decay; }
        draw() { this.trail.forEach((t, i) => { ctx.save(); ctx.globalAlpha = t.a * (i / this.trail.length) * 0.3; ctx.beginPath(); ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); ctx.restore(); }); ctx.save(); ctx.globalAlpha = this.alpha; ctx.shadowColor = this.color; ctx.shadowBlur = 15; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); ctx.restore(); }
    }
    const confetti = []; const fireworks = [];
    for (let i = 0; i < 50; i++) { const c = new Confetti(); c.y = Math.random() * canvas.height; confetti.push(c); }
    function launchFirework() { const x = Math.random() * canvas.width * 0.7 + canvas.width * 0.15; const y = Math.random() * canvas.height * 0.4 + canvas.height * 0.05; const c = sparkleColors[Math.floor(Math.random() * sparkleColors.length)]; for (let i = 0; i < 45; i++)fireworks.push(new FireworkParticle(x, y, c)); }
    for (let i = 0; i < 4; i++)setTimeout(() => launchFirework(), i * 400);
    setInterval(() => { if (Math.random() > 0.4) launchFirework(); }, 2500);
    function animateCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); confetti.forEach(c => { c.update(); c.draw(); }); for (let i = fireworks.length - 1; i >= 0; i--) { fireworks[i].update(); fireworks[i].draw(); if (fireworks[i].alpha <= 0) fireworks.splice(i, 1); } requestAnimationFrame(animateCanvas); }
    animateCanvas();

    // ===== FLOATING PARTICLES =====
    const particlesContainer = document.getElementById('particles');
    const pColors = ['rgba(255,110,199,0.5)', 'rgba(255,215,0,0.5)', 'rgba(192,132,252,0.5)', 'rgba(255,255,255,0.2)'];
    for (let i = 0; i < 25; i++) { const p = document.createElement('div'); p.classList.add('particle'); const size = Math.random() * 4 + 2; p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;background-color:${pColors[Math.floor(Math.random() * pColors.length)]};animation-duration:${Math.random() * 15 + 10}s;animation-delay:${Math.random() * 5}s;box-shadow:0 0 ${size * 3}px ${pColors[Math.floor(Math.random() * pColors.length)]};`; particlesContainer.appendChild(p); }

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
                function type() { if (index < fullText.length) { textEl.textContent += fullText.charAt(index); index++; setTimeout(type, 40 + Math.random() * 30); } }
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
                spark.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top + rect.height / 2}px;font-size:${Math.random() * 20 + 15}px;pointer-events:none;z-index:100;transition:all 1.5s ease-out;opacity:1;`;
                document.body.appendChild(spark);
                requestAnimationFrame(() => { spark.style.transform = `translate(${(Math.random() - 0.5) * 300}px,${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 360}deg)`; spark.style.opacity = '0'; });
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
                    const duration = 2800; const start = performance.now();
                    function tick(now) { const p = Math.min((now - start) / duration, 1); const e = 1 - Math.pow(1 - p, 4); counter.textContent = Math.floor(e * target).toLocaleString(); if (p < 1) requestAnimationFrame(tick); else counter.textContent = target.toLocaleString(); }
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
                document.querySelectorAll('.letter-content p').forEach((p, i) => { setTimeout(() => p.classList.add('visible'), i * 350); });
            }
        });
    }, { threshold: 0.15 });
    const ch4 = document.getElementById('chapter4');
    if (ch4) letterObserver.observe(ch4);

    // ===== OUR PLAYLIST (VINYL + AUDIO) =====
    const vinylDisc = document.getElementById('vinylDisc');
    const vinylArm = document.getElementById('vinylArm');
    const nowPlaying = document.getElementById('nowPlaying');
    const npSong = document.getElementById('npSong');
    const npReason = document.getElementById('npReason');
    const npProgressBar = document.getElementById('npProgressBar');
    const tracks = document.querySelectorAll('.track');
    const bgMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicTextEl = musicToggle ? musicToggle.querySelector('.music-text') : null;

    let playlistAudio = null; // dedicated audio for playlist
    let progressInterval = null;
    let isPlaylistPlaying = false;

    tracks.forEach(track => {
        track.addEventListener('click', () => {
            tracks.forEach(t => { t.classList.remove('active'); t.querySelector('.track-heart').textContent = '♡'; });
            track.classList.add('active');
            track.querySelector('.track-heart').textContent = '♥';

            // Update display
            const song = track.dataset.song;
            const artist = track.dataset.artist;
            const reason = track.dataset.reason;
            const audioSrc = track.dataset.audio;

            npSong.textContent = `${song} — ${artist}`;
            npReason.textContent = `"${reason}"`;
            nowPlaying.classList.add('visible');

            // Spin vinyl
            vinylDisc.classList.add('spinning');
            vinylArm.classList.add('playing');

            // Stop background music if playing
            if (bgMusic && !bgMusic.paused) {
                bgMusic.pause();
                if (musicToggle) musicToggle.classList.remove('playing');
                if (musicTextEl) musicTextEl.textContent = 'Play Our Song';
            }

            // Clear old progress interval
            if (progressInterval) clearInterval(progressInterval);
            if (npProgressBar) npProgressBar.style.width = '0%';

            // Play audio if available
            if (audioSrc) {
                if (playlistAudio) {
                    playlistAudio.pause();
                    playlistAudio.removeAttribute('src');
                }
                playlistAudio = new Audio(audioSrc);
                playlistAudio.volume = 0.6;
                playlistAudio.play().then(() => {
                    isPlaylistPlaying = true;

                    // Audio progress bar
                    progressInterval = setInterval(() => {
                        if (playlistAudio && playlistAudio.duration) {
                            const pct = (playlistAudio.currentTime / playlistAudio.duration) * 100;
                            if (npProgressBar) npProgressBar.style.width = pct + '%';
                        }
                    }, 500);

                    playlistAudio.addEventListener('ended', () => {
                        isPlaylistPlaying = false;
                        vinylDisc.classList.remove('spinning');
                        vinylArm.classList.remove('playing');
                        if (progressInterval) clearInterval(progressInterval);
                        if (npProgressBar) npProgressBar.style.width = '100%';
                    });
                }).catch(err => {
                    console.log('Audio play blocked:', err);
                    npReason.textContent += ' (tap again to play audio)';
                });
            } else {
                // No audio file — just show the info
                if (playlistAudio) { playlistAudio.pause(); playlistAudio = null; }
                isPlaylistPlaying = false;
                npReason.textContent += '\n🎵 Audio coming soon...';
            }

            launchFirework();
        });
    });

    // ===== CONSTELLATION HEART =====
    const constCanvas = document.getElementById('constellationCanvas');
    const constSection = document.getElementById('chapterStars');
    if (constCanvas && constSection) {
        const cCtx = constCanvas.getContext('2d');
        const connectedEl = document.getElementById('starsConnected');
        const totalEl = document.getElementById('starsTotal');
        const heartStars = [];
        let heartConnections = 0;

        function resizeConst() {
            constCanvas.width = constSection.offsetWidth;
            constCanvas.height = constSection.offsetHeight;
            placeHeartStars();
        }

        function placeHeartStars() {
            heartStars.length = 0; heartConnections = 0;
            if (connectedEl) connectedEl.textContent = '0';
            const cx = constCanvas.width / 2;
            const cy = constCanvas.height / 2 + 30;
            const scale = Math.min(constCanvas.width, constCanvas.height) * 0.0028;
            const numPoints = 20;
            for (let i = 0; i < numPoints; i++) {
                const t = (i / numPoints) * Math.PI * 2;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                heartStars.push({ x: cx + x * scale * 10, y: cy + y * scale * 10, size: Math.random() * 2 + 2, connected: false, glowAlpha: 0, twinkle: Math.random() * Math.PI * 2 });
            }
            if (totalEl) totalEl.textContent = heartStars.length.toString();
        }
        resizeConst(); window.addEventListener('resize', resizeConst);

        const constBgStars = [];
        for (let i = 0; i < 60; i++) constBgStars.push({ x: Math.random() * constCanvas.width, y: Math.random() * constCanvas.height, size: Math.random() * 1.5 + 0.5, twinkle: Math.random() * Math.PI * 2, speed: Math.random() * 0.012 + 0.004 });

        constSection.addEventListener('click', (e) => {
            const rect = constCanvas.getBoundingClientRect();
            const mx = e.clientX - rect.left, my = e.clientY - rect.top;
            let nearest = null, nearestDist = Infinity;
            heartStars.forEach(s => { if (s.connected) return; const d = Math.hypot(s.x - mx, s.y - my); if (d < nearestDist && d < 80) { nearestDist = d; nearest = s; } });
            if (nearest) {
                nearest.connected = true; nearest.glowAlpha = 1; heartConnections++;
                if (connectedEl) connectedEl.textContent = heartConnections.toString();
                if (heartConnections % 5 === 0) launchFirework();
                if (heartConnections === heartStars.length) { for (let i = 0; i < 8; i++) setTimeout(() => launchFirework(), i * 200); }
            }
        });

        function animateConstellation() {
            cCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);
            constBgStars.forEach(s => { s.twinkle += s.speed; cCtx.save(); cCtx.globalAlpha = 0.2 + Math.sin(s.twinkle) * 0.3; cCtx.fillStyle = '#fff'; cCtx.beginPath(); cCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); cCtx.fill(); cCtx.restore(); });
            const connected = heartStars.filter(s => s.connected);
            if (connected.length > 1) { cCtx.save(); cCtx.strokeStyle = 'rgba(255,215,0,0.3)'; cCtx.lineWidth = 1; cCtx.shadowColor = '#ffd700'; cCtx.shadowBlur = 10; cCtx.beginPath(); const sorted = heartStars.filter(s => s.connected); sorted.forEach((s, i) => { if (i === 0) cCtx.moveTo(s.x, s.y); else cCtx.lineTo(s.x, s.y); }); if (heartConnections === heartStars.length) cCtx.closePath(); cCtx.stroke(); cCtx.restore(); }
            heartStars.forEach(s => { s.twinkle += 0.02; cCtx.save(); if (s.connected) { const g = 0.6 + Math.sin(s.twinkle) * 0.3; cCtx.globalAlpha = g; cCtx.shadowColor = '#ffd700'; cCtx.shadowBlur = 20; cCtx.fillStyle = '#ffd700'; cCtx.beginPath(); cCtx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2); cCtx.fill(); } else { cCtx.globalAlpha = 0.3 + Math.sin(s.twinkle) * 0.2; cCtx.fillStyle = '#fff'; cCtx.beginPath(); cCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); cCtx.fill(); } cCtx.restore(); });
            if (heartConnections === heartStars.length && heartStars.length > 0) { cCtx.save(); cCtx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.002) * 0.3; cCtx.font = '28px "Great Vibes",cursive'; cCtx.fillStyle = '#ffd700'; cCtx.textAlign = 'center'; cCtx.shadowColor = 'rgba(255,215,0,0.6)'; cCtx.shadowBlur = 20; cCtx.fillText('D + J', constCanvas.width / 2, constCanvas.height / 2 + 40); cCtx.restore(); }
            requestAnimationFrame(animateConstellation);
        }
        animateConstellation();
    }

    // ===== LANTERN RELEASE CANVAS =====
    const lanternCanvas = document.getElementById('lanternCanvas');
    const lanternSection = document.getElementById('chapterLanterns');
    if (lanternCanvas && lanternSection) {
        const lCtx = lanternCanvas.getContext('2d');
        const lanterns = []; const lanternStars = [];
        let lanternCount = 0; const lanternCountEl = document.getElementById('lanternCount');
        const wishes = ["May all your dreams come true 💫", "Wishing you endless happiness 🌟", "Here's to another amazing year ✨", "You deserve the whole world 🌍", "May your smile never fade 😊", "Sending you all my love 💖", "Adventure awaits you, baby 🗺️", "The best is yet to come 🚀", "You make the world brighter ☀️", "Forever grateful for you 🙏", "Cheers to 24 incredible years 🥂", "You are magic 🪄", "Here's to us and our future 💍", "May laughter follow you always 😂", "Shine on, beautiful ⭐", "Every day with you is a gift 🎁"];
        function resizeLanternCanvas() { lanternCanvas.width = lanternSection.offsetWidth; lanternCanvas.height = lanternSection.offsetHeight; }
        resizeLanternCanvas(); window.addEventListener('resize', resizeLanternCanvas);
        for (let i = 0; i < 80; i++) lanternStars.push({ x: Math.random() * lanternCanvas.width, y: Math.random() * lanternCanvas.height, size: Math.random() * 1.5 + 0.5, twinkle: Math.random() * Math.PI * 2, speed: Math.random() * 0.015 + 0.005 });

        class Lantern {
            constructor(x, y) { this.x = x; this.y = y; this.vy = -(Math.random() * 0.8 + 0.3); this.vx = (Math.random() - 0.5) * 0.3; this.size = Math.random() * 15 + 20; this.alpha = 0; this.maxAlpha = 0.9; this.wobble = Math.random() * Math.PI * 2; this.wobbleSpeed = Math.random() * 0.01 + 0.005; this.glowPulse = Math.random() * Math.PI * 2; this.wish = wishes[Math.floor(Math.random() * wishes.length)]; this.wishAlpha = 1; this.age = 0; }
            update() { this.age++; if (this.alpha < this.maxAlpha) this.alpha += 0.015; this.y += this.vy; this.x += this.vx + Math.sin(this.wobble) * 0.2; this.wobble += this.wobbleSpeed; this.glowPulse += 0.02; if (this.age > 120) this.wishAlpha = Math.max(0, this.wishAlpha - 0.01); if (this.y < -50) this.alpha -= 0.01; return this.alpha > 0; }
            draw() { const gs = this.size * (1.8 + Math.sin(this.glowPulse) * 0.3); lCtx.save(); lCtx.globalAlpha = this.alpha * 0.2; const og = lCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, gs * 1.5); og.addColorStop(0, 'rgba(255,170,50,0.4)'); og.addColorStop(0.5, 'rgba(255,120,30,0.1)'); og.addColorStop(1, 'transparent'); lCtx.fillStyle = og; lCtx.beginPath(); lCtx.arc(this.x, this.y, gs * 1.5, 0, Math.PI * 2); lCtx.fill(); lCtx.restore(); lCtx.save(); lCtx.globalAlpha = this.alpha; const bg = lCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size); bg.addColorStop(0, '#ffe8a0'); bg.addColorStop(0.3, '#ffcc44'); bg.addColorStop(0.7, '#ff8800'); bg.addColorStop(1, 'rgba(200,60,10,0.3)'); lCtx.fillStyle = bg; lCtx.beginPath(); lCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); lCtx.fill(); lCtx.globalAlpha = this.alpha * 0.8; const cg = lCtx.createRadialGradient(this.x, this.y - 2, 0, this.x, this.y, this.size * 0.4); cg.addColorStop(0, '#fff'); cg.addColorStop(1, 'transparent'); lCtx.fillStyle = cg; lCtx.beginPath(); lCtx.arc(this.x, this.y - 2, this.size * 0.4, 0, Math.PI * 2); lCtx.fill(); lCtx.restore(); if (this.wishAlpha > 0) { lCtx.save(); lCtx.globalAlpha = this.alpha * this.wishAlpha * 0.8; lCtx.font = '14px "Cormorant Garamond",serif'; lCtx.fillStyle = '#ffd700'; lCtx.textAlign = 'center'; lCtx.shadowColor = 'rgba(255,215,0,0.5)'; lCtx.shadowBlur = 10; lCtx.fillText(this.wish, this.x, this.y + this.size + 25); lCtx.restore(); } }
        }
        lanternSection.addEventListener('click', (e) => { const r = lanternCanvas.getBoundingClientRect(); lanterns.push(new Lantern(e.clientX - r.left, e.clientY - r.top)); lanternCount++; if (lanternCountEl) lanternCountEl.textContent = lanternCount; if (lanternCount % 5 === 0) launchFirework(); });
        function animateLanterns() { lCtx.clearRect(0, 0, lanternCanvas.width, lanternCanvas.height); lanternStars.forEach(s => { s.twinkle += s.speed; lCtx.save(); lCtx.globalAlpha = 0.3 + Math.sin(s.twinkle) * 0.4; lCtx.fillStyle = '#fff'; lCtx.beginPath(); lCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2); lCtx.fill(); lCtx.restore(); }); for (let i = lanterns.length - 1; i >= 0; i--) { const alive = lanterns[i].update(); lanterns[i].draw(); if (!alive) lanterns.splice(i, 1); } requestAnimationFrame(animateLanterns); }
        animateLanterns();
    }

    // ===== SPIN THE MEMORY (3 REELS) =====
    const spinBtn = document.getElementById('spinBtn');
    const slotReel1 = document.getElementById('slotReel1');
    const slotReel2 = document.getElementById('slotReel2');
    const slotReel3 = document.getElementById('slotReel3');
    const memoryReveal = document.getElementById('memoryReveal');
    const memoryEmoji = document.getElementById('memoryEmoji');
    const memoryText = document.getElementById('memoryText');
    const spinCountEl = document.getElementById('spinCount');

    const slotEmojis = ['💖', '⛳', '🚗', '📱', '🎬', '🍕', '😂', '🥰', '👨‍👩‍👧', '🌅', '💤', '📸', '🎵', '🤗', '💪', '🌟', '💍', '🎂'];

    const memories = [
        { emoji: '⛳', text: 'Mini golf — where you absolutely destroyed me and stole my heart at the same time.' },
        { emoji: '🚗', text: 'That random parking lot where we talked until the world fell asleep around us.' },
        { emoji: '📱', text: 'Those late night FaceTimes where I never wanted to hang up.' },
        { emoji: '🎬', text: 'Movie nights where I spend more time looking at you than the screen.' },
        { emoji: '🍕', text: 'All the food runs and picking what to eat being the hardest decision we make.' },
        { emoji: '😂', text: 'When we laugh so hard we can\'t breathe — those are my favorite moments.' },
        { emoji: '🥰', text: 'The way you look at me like I\'m the luckiest guy in the world (I am).' },
        { emoji: '👨‍👩‍👧', text: 'Meeting your family and feeling like I was already home.' },
        { emoji: '🌅', text: 'Spontaneous drives with no destination, just us and the road.' },
        { emoji: '💤', text: 'Falling asleep on the phone because neither of us wants to say goodnight.' },
        { emoji: '📸', text: 'Every photo of us that makes me smile every time I scroll past it.' },
        { emoji: '🎵', text: 'Playing our songs and singing badly together — perfection.' },
        { emoji: '🤗', text: 'Every hug that makes the whole world disappear.' },
        { emoji: '💪', text: 'You pushing me to stay focused on school and work — my biggest supporter.' },
        { emoji: '🌟', text: 'The first time I told you I loved you and you said it back.' },
        { emoji: '💍', text: 'Dreaming about our future together — house, family, everything.' }
    ];

    let spinCount = 0;
    let isSpinning = false;

    function spinReel(reelEl, finalEmoji, totalSpins, spinDelay) {
        return new Promise(resolve => {
            let spins = 0;
            function step() {
                const randomEmoji = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
                reelEl.innerHTML = `<div class="slot-item">${randomEmoji}</div>`;
                spins++;
                if (spins < totalSpins) {
                    const delay = 50 + spins * (spins > totalSpins * 0.7 ? 15 : 3);
                    setTimeout(step, Math.min(delay, 250));
                } else {
                    reelEl.innerHTML = `<div class="slot-item">${finalEmoji}</div>`;
                    resolve();
                }
            }
            setTimeout(step, spinDelay);
        });
    }

    if (spinBtn) {
        spinBtn.addEventListener('click', async () => {
            if (isSpinning) return;
            isSpinning = true;
            spinBtn.classList.add('disabled');
            memoryReveal.classList.remove('visible');

            const memory = memories[Math.floor(Math.random() * memories.length)];

            // Spin all 3 reels with staggered stops
            const reel1Emoji = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            const reel3Emoji = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];

            await Promise.all([
                spinReel(slotReel1, reel1Emoji, 15, 0),
                spinReel(slotReel2, memory.emoji, 22, 100),
                spinReel(slotReel3, reel3Emoji, 28, 200)
            ]);

            // Show memory after all reels stop
            setTimeout(() => {
                memoryEmoji.textContent = memory.emoji;
                memoryText.textContent = memory.text;
                memoryReveal.classList.add('visible');
                isSpinning = false;
                spinBtn.classList.remove('disabled');
                spinCount++;
                if (spinCountEl) spinCountEl.textContent = spinCount;
                launchFirework();
            }, 400);
        });
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
                    const h = document.createElement('div'); h.classList.add('explosion-heart');
                    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    h.style.left = Math.random() * 100 + '%'; h.style.top = Math.random() * 100 + '%';
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
        p.addEventListener('mousemove', (e) => { const r = p.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height; p.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-15px) scale(1.05)`; });
        p.addEventListener('mouseleave', () => { p.style.transform = `rotate(${getComputedStyle(p).getPropertyValue('--rotate') || '0deg'})`; });
    });

    // ===== MUSIC (background) =====
    let isBgPlaying = false;
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            // If playlist audio is playing, stop it first
            if (playlistAudio && !playlistAudio.paused) {
                playlistAudio.pause();
                isPlaylistPlaying = false;
                vinylDisc.classList.remove('spinning');
                vinylArm.classList.remove('playing');
                if (progressInterval) clearInterval(progressInterval);
            }

            if (isBgPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
                if (musicTextEl) musicTextEl.textContent = 'Play Our Song';
                isBgPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    if (musicTextEl) musicTextEl.textContent = 'Pause';
                    isBgPlaying = true;
                }).catch(err => console.log('Audio blocked:', err));
            }
        });
    }

    // ===== PARALLAX HERO =====
    window.addEventListener('scroll', () => {
        const entrance = document.querySelector('.entrance-content');
        if (entrance) { const s = window.scrollY; const r = entrance.getBoundingClientRect(); if (r.bottom > 0) { entrance.style.transform = `translateY(${s * 0.3}px)`; entrance.style.opacity = Math.max(0, 1 - s / (window.innerHeight * 0.8)); } }
    }, { passive: true });
});
