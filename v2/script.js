document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- Header Background on Scroll ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(243, 244, 246, 0.98)';
            header.style.padding = '0.5rem 0';
            header.style.transition = '0.3s';
        } else {
            header.style.backgroundColor = 'rgba(249, 250, 251, 0.96)';
            header.style.padding = '1rem 0';
        }
    });

    // --- Section photo backgrounds ---
    // Applies images from /images/<data-bg>.<ext> as a CSS var --photo-bg
    // Tries common extensions so you don't need to hardcode the real one.
    const setPhotoBg = (el, baseName) => {
        const exts = ['jpg','jpeg','png','webp'];
        const basePath = 'images/' + baseName + '.';
        let i = 0;

        const tryNext = () => {
            if (i >= exts.length) return;
            const url = basePath + exts[i++];
            const img = new Image();
            img.onload = () => el.style.setProperty('--photo-bg', `url("${url}")`);
            img.onerror = tryNext;
            img.src = url;
        };
        tryNext();
    };

    document.querySelectorAll('.photo-bg[data-bg]').forEach(el => {
        const name = el.getAttribute('data-bg');
        if (name) setPhotoBg(el, name);
    });


});
