'use strict';

// Make toggleMenu available globally
window.toggleMenu = function() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
};
