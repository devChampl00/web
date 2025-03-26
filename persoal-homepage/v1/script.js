// Preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('opacity-0');
    setTimeout(() => document.getElementById('preloader').style.display = 'none', 500);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.add('hidden');
    });
});

// Parallax Effect pada Hero
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

// Form Submission (Simulasi)
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pesan Anda telah terkirim!');
    form.reset();
});

// Animasi Fade-in saat scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
    });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(section => observer.observe(section));

// Typed Text di Hero
const typedText = document.getElementById('typed-text');
const texts = ['Nama Anda', 'Kreator Visioner', 'Desainer Premium'];
let index = 0, charIndex = 0, currentText = '';
function type() {
    if (charIndex < texts[index].length) {
        currentText += texts[index].charAt(charIndex);
        typedText.textContent = currentText;
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            currentText = '';
            index = (index + 1) % texts.length;
            type();
        }, 2000);
    }
}
type();

// Back-to-Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.remove('opacity-0');
    else backToTop.classList.add('opacity-0');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress-bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        portfolioCards.forEach(card => {
            card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none';
        });
        filterButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
        button.classList.add('bg-indigo-600', 'text-white');
    });
});
