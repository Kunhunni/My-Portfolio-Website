// Initialize Vanta.js BIRDS background
function initVantaBG() {
    if (!window.VANTA || !VANTA.BIRDS) return;
    const vantaEl = document.getElementById('vanta-bg');
    if (!vantaEl) return;
    VANTA.BIRDS({
        el: vantaEl,
        mouseControls: true,
        touchControls: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x0a0a0a,
        color1: 0xff3c78,
        color2: 0xf0f0f0,
        birdSize: 1.5,
        wingSpan: 20,
        speedLimit: 4,
        separation: 50,
        alignment: 50,
        cohesion: 50,
        quantity: 4
    });
    Object.assign(vantaEl.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
    });
}

function openGmail() {
    const email = "anirudhrajeev5@gmail.com";
    const subject = encodeURIComponent("Hello from your website!");
    const body = encodeURIComponent("Hi Anirudh,\n\nI saw your portfolio and wanted to reach out.");
    window.open(`https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`, "_blank");
}

// Logo click refreshes page only (no scroll/fade effect)
function initLogoBehavior() {
    const logo = document.getElementById('main-logo');
    if (!logo) return;
    logo.style.opacity = 1;
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => window.location.reload());
}

// Logo animation on load
window.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('main-logo');
    if (logo) {
        logo.classList.remove('logo-animate');
        void logo.offsetWidth;
        logo.classList.add('logo-animate');
        logo.addEventListener('click', () => window.location.reload());
    }
});

// Hide logo on scroll
function handleLogoOnScroll() {
    const logo = document.getElementById('main-logo');
    if (!logo) return;
    const hide = window.scrollY > 10;
    logo.style.opacity = hide ? '0' : '1';
    logo.style.pointerEvents = hide ? 'none' : 'auto';
    logo.style.transition = 'opacity 0.4s';
}
window.addEventListener('scroll', handleLogoOnScroll);
window.addEventListener('DOMContentLoaded', handleLogoOnScroll);

// Initialize animations with GSAP
function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero h1', { duration: 1, opacity: 1, y: 0, ease: 'power3.out', delay: 0.3 });
    gsap.to('.hero p', { duration: 1, opacity: 1, y: 0, ease: 'power3.out', delay: 0.6 });
    gsap.to('.hero-btns', { duration: 1, opacity: 1, y: 0, ease: 'power3.out', delay: 0.9 });
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none none' },
            opacity: 0, y: 30, duration: 1, ease: 'power3.out'
        });
    });
    ['.project-card', '.skill-card'].forEach(selector => {
        gsap.utils.toArray(selector).forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
                opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', delay: i * 0.1
            });
        });
    });
    gsap.from('.about-img', {
        scrollTrigger: { trigger: '.about', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, x: -50, duration: 1, ease: 'power3.out'
    });
    gsap.from('.about-content', {
        scrollTrigger: { trigger: '.about', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, x: 50, duration: 1, ease: 'power3.out'
    });
    gsap.from('.contact-form', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, y: 50, duration: 1, ease: 'power3.out'
    });
}

// Hamburger menu toggle
const header = document.querySelector('header');
const nav = header.querySelector('nav');
const hamburgerBtn = document.createElement('button');
hamburgerBtn.className = 'hamburger';
hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
hamburgerBtn.setAttribute('aria-controls', 'main-nav');
hamburgerBtn.setAttribute('aria-expanded', 'false');
hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
nav.setAttribute('id', 'main-nav');
header.insertBefore(hamburgerBtn, nav);

function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    nav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
}
hamburgerBtn.addEventListener('click', toggleMenu);

document.addEventListener('click', e => {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
        hamburgerBtn.classList.remove('active');
        nav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
});
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            hamburgerBtn.classList.remove('active');
            nav.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('no-js');
    initVantaBG();
    initAnimations();
    initLogoBehavior();
    // Contact form UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
        });
    }
    // Smooth scrolling
    document.querySelectorAll('nav a, .hero-btns .btn-primary, .about .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    // Image modal
    const imgPlaceholder = document.querySelector('.img-placeholder');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.querySelector('#about-modal .close-btn');
    if (imgPlaceholder && modal && closeBtn) {
        imgPlaceholder.addEventListener('click', () => modal.classList.add('active'));
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});