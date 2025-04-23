const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 60) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('text-blue-300');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-300');
        }
    });
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const fadeIns = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeIns.forEach(fade => observer.observe(fade));

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    form.reset();
});

const themeToggle = document.getElementById('theme-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

const typed = new Typed('#typed', {
    strings: ['[Your Profession]', 'Problem Solver', 'Creative Thinker'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
});

const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
