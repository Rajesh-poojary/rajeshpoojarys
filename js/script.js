/* ============================================================
   RAJESH POOJARY — MONE THEME INSPIRED
   JavaScript — Interactions, Animations & Effects
   ============================================================ */

(function () {
    'use strict';

    /* ===== DOM ELEMENTS ===== */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navBox = document.getElementById('nav-box');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const cursor = document.getElementById('cursor');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button');

    /* ===== CUSTOM SCROLL ANIMATIONS (Intersection Observer) ===== */
    function initAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: stop observing once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
        animatedElements.forEach(el => observer.observe(el));
    }

    window.addEventListener('load', initAnimations);

    /* ===== CUSTOM CURSOR ===== */
    if (cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    }

    /* ===== STICKY HEADER ===== */
    function handleHeaderScroll() {
        if (!header) return;
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    /* ===== SIDEBAR NAVIGATION ===== */
    function toggleNav() {
        if (navToggle) navToggle.classList.toggle('active');
        if (navBox) navBox.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (navBox && navBox.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleNav);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navBox && navBox.classList.contains('open')) {
                toggleNav();
            }
        });
    });

    /* ===== ACTIVE NAV LINK HIGHLIGHTING ===== */
    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ===== COMBINED SCROLL HANDLER ===== */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeaderScroll();
                highlightActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    /* ===== SMOOTH SCROLL ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                // scroll-margin-top in CSS handles the header offset automatically
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
