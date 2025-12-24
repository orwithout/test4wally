import translations from './translations.js';

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Internationalization Logic
let currentLang = localStorage.getItem('lang') || 'zh';

function updateContent() {
    const langData = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = langData[key];
            } else if (el.classList.contains('highlight-wrapper')) {
                // Special handling for highlighted text if needed
                el.innerHTML = langData[key];
            } else {
                el.innerHTML = langData[key];
            }
        }
    });
    document.documentElement.lang = currentLang;
    document.getElementById('lang-btn').textContent = currentLang === 'zh' ? 'EN' : '中文';
}

const langBtn = document.getElementById('lang-btn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', currentLang);
        updateContent();
    });
}

// Reveal animations on scroll
const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal');
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
}

// Close menu on link click
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Form submission placeholder
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = currentLang === 'zh' ? '感谢您的关注！我们将尽快与您联系。' : 'Thank you! We will contact you soon.';
        alert(msg);
        form.reset();
    });
}

// Initial update
window.addEventListener('DOMContentLoaded', updateContent);
window.addEventListener('load', revealOnScroll);
