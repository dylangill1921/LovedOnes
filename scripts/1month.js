// Twinkling stars
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
}
setInterval(createStar, 200);

// Timer 
const startDate = new Date('2025-02-12T19:00:00');
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = `
        ${years}y ${months}m ${days}d ${hours}h ${mins}m ${secs}s
    `;
}
setInterval(updateTimer, 1000);
updateTimer();

// Scroll toggle
function toggleScroll() {
    const scroll = document.getElementById('scroll');
    scroll.classList.toggle('open');
}

// Audio controls
const backgroundMusic = document.getElementById('backgroundMusic');
const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');

playButton.addEventListener('click', () => {
    backgroundMusic.play().catch(error => {
        console.log("Error playing audio: ", error);
    });
});

stopButton.addEventListener('click', () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Reset to start
});