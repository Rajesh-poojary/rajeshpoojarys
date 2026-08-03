/* ============================================================
   PREMIUM PORTFOLIO JAVASCRIPT
   Handles all high-end interactions and animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. PAGE LOADER
    ------------------------------------------------------------ */
    const loader = document.getElementById('loader');
    
    // Hide loader after a short delay to ensure rendering
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Initialize AOS only after loader is hidden
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 800,
                        easing: 'ease-out-cubic',
                        once: true,
                        offset: 50
                    });
                }
            }, 600);
        }
    }, 800);

    /* ------------------------------------------------------------
       2. SCROLL PROGRESS BAR & NAVBAR
    ------------------------------------------------------------ */
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        
        // Navbar Scrolled State
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Active Nav Link
        const scrollPos = scrollTop + 100;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    /* ------------------------------------------------------------
       3. MOBILE MENU
    ------------------------------------------------------------ */
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ------------------------------------------------------------
       4. TYPING EFFECT (Hero Section)
    ------------------------------------------------------------ */
    const typedTextEl = document.getElementById('typed-text');
    if (typedTextEl) {
        const words = ['Senior Web Developer', 'Odoo ERP Developer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeEffect = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(typeEffect, typingSpeed);
        };
        
        setTimeout(typeEffect, 2000); // Start after load
    }

    /* ------------------------------------------------------------
       5. 3D MOUSE PARALLAX TILT EFFECT (Hero Image)
    ------------------------------------------------------------ */
    const tiltCard = document.getElementById('tilt-card');
    
    if (tiltCard && window.matchMedia('(hover: hover)').matches) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    /* ------------------------------------------------------------
       6. ANIMATED COUNTERS (About Section)
    ------------------------------------------------------------ */
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    };

    const statsSection = document.querySelector('.about-stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
                statsObserver.disconnect();
            }
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    /* ------------------------------------------------------------
       7. SKILL PROGRESS BARS
    ------------------------------------------------------------ */
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                // Small delay to ensure CSS transition is ready
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => skillsObserver.observe(bar));

    /* ------------------------------------------------------------
       8. SMOOTH SCROLL FOR ANCHOR LINKS
    ------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ------------------------------------------------------------
       9. FORM SUBMISSION HANDLER
    ------------------------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `<span>Sending...</span> <i class="fas fa-circle-notch fa-spin"></i>`;
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = `<span>Sent Successfully</span> <i class="fas fa-check"></i>`;
                btn.style.backgroundColor = '#10B981'; // Success Green
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }

});
