/* ============================================
   ARNESH DORSATWAR - E-PORTFOLIO
   Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Typing Effect ──────────────────────────
    const typingEl = document.getElementById('typing-text');
    const phrases = [
        'Software Engineer',
        'LLM Fine-Tuning Specialist',
        'Custom Keyboard Designer',
        'Embedded Systems Developer',
        'Network Security Engineer',
        'Full-Stack Developer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 500;
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();

    // ── Nav Scroll Effect ──────────────────────
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    });

    // ── Mobile Nav Toggle ──────────────────────
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ── Scroll Reveal (AOS replacement) ────────
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Also observe stat cards for bar animation
    document.querySelectorAll('.stat-card').forEach(el => observer.observe(el));

    // ── Stat Counter Animation ─────────────────
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const num = entry.target;
                const target = parseInt(num.getAttribute('data-count'));
                animateCount(num, target);
                statObserver.unobserve(num);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

    function animateCount(el, target) {
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // ── Skill Bar Animation ────────────────────
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const level = fill.getAttribute('data-level');
                    fill.style.width = level + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

    // ── Keyboard Key Press Animation ───────────
    const keys = document.querySelectorAll('.key');
    let keyInterval;

    function randomKeyPress() {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        randomKey.style.background = 'var(--turquoise)';
        randomKey.style.color = 'var(--black)';
        randomKey.style.transform = 'translateY(2px)';
        randomKey.style.boxShadow = '0 2px 4px rgba(0,0,0,0.4), 0 0 20px rgba(0, 229, 199, 0.3)';

        setTimeout(() => {
            randomKey.style.background = '';
            randomKey.style.color = '';
            randomKey.style.transform = '';
            randomKey.style.boxShadow = '';
        }, 200);
    }

    keyInterval = setInterval(randomKeyPress, 800);

    // ── Smooth scroll for nav links ────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link on scroll ──────────────
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--turquoise)';
            }
        });
    });
});
