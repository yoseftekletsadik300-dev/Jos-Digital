// Settings Dropdown Toggle
const settingsToggle = document.getElementById('settingsToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

settingsToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

window.addEventListener('click', (e) => {
    if (!settingsToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

// Single Page View Switcher (Fixes scrolling and overlapping pages)
const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
const pageSections = document.querySelectorAll('.page-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');

        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        pageSections.forEach(sec => sec.classList.remove('active'));

        // Add active class to clicked target
        document.getElementById(targetId).classList.add('active');
        
        // Highlight corresponding nav link
        navLinks.forEach(l => {
            if(l.getAttribute('data-target') === targetId) {
                l.classList.add('active');
            }
        });

        window.scrollTo(0, 0);
    });
});

// Language Switcher Logic (Amharic & English)
const langSelect = document.getElementById('langSelect');
langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    const heroTitle = document.querySelector('.hero-title');
    const heroSub = document.querySelector('.hero-subtitle');

    if (lang === 'am') {
        heroTitle.innerText = heroTitle.getAttribute('data-am');
        heroSub.innerText = heroSub.getAttribute('data-am');
    } else {
        heroTitle.innerText = heroTitle.getAttribute('data-en');
        heroSub.innerText = heroSub.getAttribute('data-en');
    }
});

// PWA Install Prompt Handler (Fixes missing install button)
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        deferredPrompt = null;
        installBtn.style.display = 'none';
    }
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Jos Digital Center App Registered Successfully!', reg))
            .catch(err => console.log('App Registration Failed:', err));
    });
}