// --- 1. Theme Toggle (defensive) ---
const htmlElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
let themeIcon = null;

if (themeToggle) {
    themeIcon = themeToggle.querySelector('i');

    // Apply saved theme if present
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-theme') || 'light';
        if (current === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
} else {
    console.warn('Theme toggle element not found: #theme-toggle');
}

// --- 2. Mobile Menu (accessible) ---
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.getElementById('site-nav');

function setMobileToggleState(isOpen) {
    if (!mobileToggle || !nav) return;
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = mobileToggle.querySelector('i');
    if (isOpen) {
        nav.classList.add('open');
        if (icon && icon.classList.contains('fa-bars')) icon.classList.replace('fa-bars', 'fa-times');
    } else {
        nav.classList.remove('open');
        if (icon && icon.classList.contains('fa-times')) icon.classList.replace('fa-times', 'fa-bars');
    }
}

if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        setMobileToggleState(isOpen);
    });

    // Keyboard support for mobile toggle (handle Enter and Space)
    mobileToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            mobileToggle.click();
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('#site-nav a').forEach(link => {
        link.addEventListener('click', () => {
            setMobileToggleState(false);
        });
    });
} else {
    if (!mobileToggle) console.warn('Mobile toggle not found: .mobile-toggle');
    if (!nav) console.warn('Navigation element not found: #site-nav');
}

// --- 3. Scroll Reveal Animation ---
// Include `.bento-card` (projects) and keep skill/service selectors
const revealElements = document.querySelectorAll('section > div, .bento-card, .skill-card, .services-grid');
if (revealElements && revealElements.length) {
    // Add reveal class initially
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

// --- 4. Scroll Spy (Active Nav Link) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

if (sections && sections.length && navLinks && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href') || '';
            if (href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// --- 5. Typing Effect for Tagline ---
// Simple implementation directly manipulating the DOM text
// Note: The h1 'Full Stack Developer' is static, but we can animate the subtext or parts of it if desired.
// For now, let's keep it clean as requested.

// --- 6. Skill Progress Animation Fix ---
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards && skillCards.length) {
    skillCards.forEach(card => {
        const percent = card.getAttribute('data-percent') || 0;
        card.style.setProperty('--percent', percent);
    });
}
