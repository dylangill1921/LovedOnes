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

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Ensure proper visibility when toggling
        if (navList.classList.contains('active')) {
            navList.style.visibility = 'visible';
            navList.style.opacity = '1';
            navList.style.pointerEvents = 'auto';
        } else {
            setTimeout(() => {
                if (!navList.classList.contains('active')) {
                    navList.style.visibility = 'hidden';
                }
            }, 300);
        }
    });

    // Dropdown handling
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropBtn = dropdown.querySelector('.dropbtn');
        let timeoutId;

        // Handle mouse enter for desktop
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.style.visibility = 'hidden';
                        content.style.opacity = '0';
                        content.style.pointerEvents = 'none';
                    }
                });
                
                // Open this dropdown
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.display = 'block';
                dropdownContent.style.opacity = '1';
                dropdownContent.style.pointerEvents = 'auto';
            });

            // Handle mouse leave for desktop
            dropdown.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (dropdownContent.style.opacity === '0') {
                            dropdownContent.style.visibility = 'hidden';
                            dropdownContent.style.display = 'none';
                        }
                    }, 300);
                }, 100);
            });
        }

        // Handle click events (for both mobile and desktop)
        dropBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (window.innerWidth <= 768) {
                // Mobile behavior
                const isOpen = dropdownContent.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.classList.remove('active');
                    content.style.visibility = 'hidden';
                    content.style.display = 'none';
                    content.style.opacity = '0';
                });

                if (!isOpen) {
                    dropdownContent.classList.add('active');
                    dropdownContent.style.visibility = 'visible';
                    dropdownContent.style.display = 'block';
                    dropdownContent.style.opacity = '1';
                }
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            if (window.innerWidth > 768) {
                // Desktop behavior
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.opacity = '0';
                    content.style.pointerEvents = 'none';
                    setTimeout(() => {
                        if (content.style.opacity === '0') {
                            content.style.display = 'none';
                        }
                    }, 300);
                });
            }
        }
    });

    // Prevent hover issues when scrolling on mobile
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        document.body.classList.add('is-scrolling');

        isScrolling = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
        }, 100);
    });

    // Handle window resize with smooth transitions
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                // Reset mobile menu with proper visibility
                navList.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                navList.style.opacity = '1';
                navList.style.visibility = 'visible';
                navList.style.pointerEvents = 'auto';
                navList.style.transform = 'none';
                
                // Reset dropdowns
                document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                    dropdown.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'none';
                    dropdown.classList.remove('active');
                });
            }
        }, 250);
    });
});
