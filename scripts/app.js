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
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Hamburger clicked');
            const isActive = navList.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            // Close all dropdowns when hamburger is toggled
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
        });
    } else {
        console.error('Hamburger or navList not found:', { hamburger, navList });
    }

    // Dropdown click toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent outside click handler from interfering
                console.log('Dropdown clicked:', dropbtn.textContent);
                const isActive = dropdownContent.classList.toggle('active');
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-content').classList.remove('active');
                    }
                });
            });
        } else {
            console.error('Dropbtn or dropdownContent not found in dropdown:', dropdown);
        }
    });

    // Close navbar and dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            console.log('Clicked outside navbar');
            if (navList) navList.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) dropdownContent.classList.remove('active');
            });
        }
    });

    console.log('App.js loaded successfully, active link updated');
});