/*
    Title: Family Website
    Name: Dylan Gill
    File: moving.js
    Date: April 1st, 2025
    Description: Moving scripts.
*/

// Add Luxon to the page
const luxonScript = document.createElement('script');
luxonScript.src = 'https://moment.github.io/luxon/global/luxon.min.js';
document.head.appendChild(luxonScript);

luxonScript.onload = () => {
    // Initialize countdown
    const movingDate = luxon.DateTime.fromISO('2025-06-19T07:00:00', { zone: 'America/Toronto' });

    function updateCountdown() {
        const now = luxon.DateTime.local().setZone('America/Toronto');
        const diff = movingDate.diff(now, ['months', 'days', 'hours', 'minutes', 'seconds']).toObject();

        // Handle negative values for future dates
        Object.keys(diff).forEach(unit => {
            diff[unit] = Math.abs(Math.floor(diff[unit]));
        });

        // Update DOM
        document.getElementById('months').textContent = diff.months;
        document.getElementById('days').textContent = diff.days;
        document.getElementById('hours').textContent = diff.hours;
        document.getElementById('minutes').textContent = diff.minutes;
        document.getElementById('seconds').textContent = Math.floor(diff.seconds);
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
};

// Auto-play background music
function playBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.volume = 0.3; // Set volume to 30%
        audio.play().catch(error => {
            console.log('Auto-play was prevented:', error);
            // If auto-play fails, try playing on first user interaction
            document.addEventListener('click', () => {
                audio.play().catch(e => console.log('Manual play failed:', e));
            }, { once: true });
        });
    }
}

// Section Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Start background music
    playBackgroundMusic();
    const momBtn = document.getElementById('momBtn');
    const dadBtn = document.getElementById('dadBtn');
    const momSection = document.getElementById('momSection');
    const dadSection = document.getElementById('dadSection');
    const backBtns = document.querySelectorAll('.back-btn');
    const titleSection = document.querySelector('.title-section');
    let activeSection = null;

    function showSection(section) {
        // Hide current section if exists
        if (activeSection) {
            activeSection.classList.remove('active');
        }

        // Hide title section
        titleSection.style.display = 'none';
        document.body.style.overflow = 'hidden';

        // Show new section
        section.classList.add('active');
        activeSection = section;

        // Show back button
        const backBtn = section.querySelector('.back-btn');
        backBtn.style.display = 'block';
        setTimeout(() => {
            backBtn.classList.add('visible');
        }, 100);

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function resetView(section) {
        // Hide back button
        const backBtn = section.querySelector('.back-btn');
        backBtn.classList.remove('visible');

        // Hide section
        section.classList.remove('active');
        activeSection = null;

        // Show title section
        titleSection.style.display = 'flex';
        document.body.style.overflow = '';

        // Reset any unrolled scrolls
        section.querySelectorAll('.scroll.unrolled').forEach(scroll => {
            scroll.classList.remove('unrolled');
        });

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    momBtn.addEventListener('click', () => {
        showSection(momSection);
    });

    dadBtn.addEventListener('click', () => {
        showSection(dadSection);
    });

    // Handle back button clicks
    backBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const section = btn.closest('.parent-section');
            resetView(section);
        });
    });

    // Toggle scroll unravel on click
    const scrolls = document.querySelectorAll('.scroll');
    scrolls.forEach(scroll => {
        scroll.addEventListener('click', () => {
            scroll.classList.toggle('unrolled');
        });
    });

    // Photo hover effect
    const photos = document.querySelectorAll('.photo-item img');
    photos.forEach(photo => {
        photo.addEventListener('mouseover', () => {
            photo.style.transform = 'scale(1.1)';
            photo.style.transition = 'transform 0.3s ease';
        });

        photo.addEventListener('mouseout', () => {
            photo.style.transform = 'scale(1)';
        });
    });
});