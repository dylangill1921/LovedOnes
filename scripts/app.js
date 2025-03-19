/*
    Title: Family Website
    Name: Dylan Gill
    File: app.js
    Date: March 18, 2025
    Description: Main scripts.
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links for active state
    const navLinks = document.querySelectorAll('.navbar .nav-list a');
    const currentPath = window.location.pathname;

    // Set active link
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Hamburger clicked');
            const isActive = navList.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
        });
    } else {
        console.error('Hamburger or navList not found:', { hamburger, navList });
    }
});
