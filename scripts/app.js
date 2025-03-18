/*
    Title: Family Website
    Name: Dylan Gill
    File: app.js
    Date: March 18, 2025
    Description: Main scripts!
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
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Dropdown click toggle (for mobile and desktop compatibility)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');

        // Click event to toggle dropdown
        dropbtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.innerWidth <= 768) { // Only toggle on mobile
                dropdown.classList.toggle('active');
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown') && !e.target.closest('.hamburger')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    console.log('App.js loaded successfully, active link updated');
});