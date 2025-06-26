// Initialize Vanta.js BIRDS background
function initVantaBG() {
    if (typeof VANTA === 'undefined' || typeof VANTA.BIRDS === 'undefined') {
        console.error('Vanta.js BIRDS is not loaded!');
        return;
    }
    const vantaEl = document.getElementById('vanta-bg');
    if (!vantaEl) {
        console.error('Vanta background container not found!');
        return;
    }
    VANTA.BIRDS({
        el: vantaEl,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x0a0a0a, // matches your --primary
        color1: 0xff3c78, // accent color for birds
        color2: 0xf0f0f0, // light text color for contrast
        birdSize: 1.5,
        wingSpan: 20.0,
        speedLimit: 4.0,
        separation: 50.0,
        alignment: 50.0,
        cohesion: 50.0,
        quantity: 4 // number of birds
    });
    vantaEl.style.position = 'fixed';
    vantaEl.style.top = 0;
    vantaEl.style.left = 0;
    vantaEl.style.width = '100vw';
    vantaEl.style.height = '100vh';
    vantaEl.style.zIndex = 0;
}

// Open Gmail compose window with pre-filled details
// This function is called when the "Hire Me" button is clicked

function openGmail() {
    const email = "anirudhrajeev5@gmail.com"; // replace with your email
    const subject = encodeURIComponent("Hello from your website!");
    const body = encodeURIComponent("Hi Anirudh,\n\nI saw your portfolio and wanted to reach out.");
    const gmailURL = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailURL, "_blank");
  }

// Logo click refreshes page only (no scroll/fade effect)
function initLogoBehavior() {
    const logo = document.getElementById('main-logo');
    if (!logo) return;
    logo.style.opacity = 1;
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', function () {
        window.location.reload();
    });
}

// Logo animation on load
window.addEventListener('DOMContentLoaded', function () {
  var logo = document.getElementById('main-logo');
  function playLogoAnimation() {
    logo.classList.remove('logo-animate');
    // Force reflow to restart animation
    void logo.offsetWidth;
    logo.classList.add('logo-animate');
  }
  // Play only on load
  playLogoAnimation();
  // Refresh page on click
  logo.addEventListener('click', function() {
    window.location.reload();
  });
});

// Hide logo on scroll (fixed, robust)
function handleLogoOnScroll() {
  var logo = document.getElementById('main-logo');
  if (!logo) return;
  if (window.scrollY > 10) {
    logo.style.opacity = '0';
    logo.style.pointerEvents = 'none';
    logo.style.transition = 'opacity 0.4s';
  } else {
    logo.style.opacity = '1';
    logo.style.pointerEvents = 'auto';
    logo.style.transition = 'opacity 0.4s';
  }
}
window.addEventListener('scroll', handleLogoOnScroll);
window.addEventListener('DOMContentLoaded', handleLogoOnScroll);

// Initialize animations with GSAP
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animation (always on page load)
    gsap.to('.hero h1', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.to('.hero p', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.to('.hero-btns', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        delay: 0.9
    });

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1
        });
    });

    // Skill card animations
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1
        });
    });

    // About section animations
    gsap.from('.about-img', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });

    // Contact form animation
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
}

// Hamburger menu toggle
const hamburgerBtn = document.createElement('button');
hamburgerBtn.className = 'hamburger';
hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
hamburgerBtn.setAttribute('aria-controls', 'main-nav');
hamburgerBtn.setAttribute('aria-expanded', 'false');
hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';

const header = document.querySelector('header');
const nav = header.querySelector('nav');
nav.setAttribute('id', 'main-nav');
header.insertBefore(hamburgerBtn, nav);

function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    nav.classList.toggle('open');
    const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', String(!expanded));
}

hamburgerBtn.addEventListener('click', toggleMenu);

// Close menu when clicking outside or on a nav link (mobile UX)
document.addEventListener('click', function(e) {
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

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('no-js');
    // initThreeJS(); // Remove Three.js custom background
    initVantaBG(); // Use Vanta.js BIRDS background
    initAnimations();
    initLogoBehavior();
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Smooth scrolling for navigation links, hero View Projects button, and About Learn More button
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

    // Image modal functionality
    var imgPlaceholder = document.querySelector('.img-placeholder');
    var modal = document.getElementById('about-modal');
    var closeBtn = document.querySelector('#about-modal .close-btn');
    if (imgPlaceholder && modal && closeBtn) {
        imgPlaceholder.addEventListener('click', function () {
            modal.classList.add('active');
        });
        closeBtn.addEventListener('click', function () {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});