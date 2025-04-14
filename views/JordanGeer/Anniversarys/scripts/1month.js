/*
    Title: Family Website
    Name: Dylan Gill
    File: 1month.js
    Date: March 19, 2025
    Description: 1 month scripts.
*/

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

// Timer using Luxon for accurate time tracking
const startDate = luxon.DateTime.fromISO('2025-02-12T19:00:00', { zone: 'America/Toronto' });

function updateTimer() {
    const now = luxon.DateTime.local().setZone('America/Toronto');
    const diff = now.diff(startDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

    // Round seconds to whole numbers
    diff.seconds = Math.floor(diff.seconds);

    // Handle negative values for future dates
    if (now < startDate) {
        diff.years = Math.abs(diff.years);
        diff.months = Math.abs(diff.months);
        diff.days = Math.abs(diff.days);
        diff.hours = Math.abs(diff.hours);
        diff.minutes = Math.abs(diff.minutes);
        diff.seconds = Math.abs(diff.seconds);
    }

    document.getElementById('timer').innerHTML = `
        ${diff.years}y ${diff.months}m ${diff.days}d ${diff.hours}h ${diff.minutes}m ${diff.seconds}s
    `;
}

setInterval(updateTimer, 1000);
updateTimer();

// Section toggle with smooth transitions
function toggleSection() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.classList.toggle('active');
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

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    // Start timer immediately
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Start background music functionality
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
        backgroundMusic.currentTime = 0;
    });
}); 