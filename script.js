// ========================================
// WAIT FOR DOM TO LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initScrollReveal();
    initHeaderScrollEffect();
});


// ========================================
// MOBILE NAVIGATION
// ========================================

function initMobileNavigation() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menu on button click
    menuBtn.addEventListener('click', () => {
        toggleMobileMenu(menuBtn, navMenu);
    });

    // Close menu when any link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(menuBtn, navMenu);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnButton = menuBtn.contains(e.target);
        const isMenuOpen = navMenu.classList.contains('active');

        if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
            closeMobileMenu(menuBtn, navMenu);
        }
    });
}

function toggleMobileMenu(menuBtn, navMenu) {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function closeMobileMenu(menuBtn, navMenu) {
    menuBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
}


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const ELEMENT_VISIBLE_OFFSET = 100; // pixels from bottom of viewport

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            const isVisible = elementTop < windowHeight - ELEMENT_VISIBLE_OFFSET;

            if (isVisible) {
                element.classList.add('active');
            }
        });
    }

    // Listen to scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on initial load
    revealOnScroll();
}


// ========================================
// HEADER BACKGROUND ON SCROLL
// ========================================

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    const SCROLL_THRESHOLD = 50; // pixels scrolled before effect triggers

    window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            applyScrolledHeaderStyle(header);
        } else {
            applyDefaultHeaderStyle(header);
        }
    });
}

function applyScrolledHeaderStyle(header) {
    header.style.backgroundColor = 'rgba(243, 244, 246, 0.98)';
    header.style.padding = '0.5rem 0';
    header.style.transition = '0.3s';
}

function applyDefaultHeaderStyle(header) {
    header.style.backgroundColor = 'rgba(249, 250, 251, 0.96)';
    header.style.padding = '1rem 0';
}