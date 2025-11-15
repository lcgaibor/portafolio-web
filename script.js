// ========== CREAR BURBUJAS ==========
function createBubbles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(bubble);
    }
}

createBubbles('hero-bubbles', 10);
createBubbles('about-bubbles', 8);

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');
const lightIconMobile = document.getElementById('light-icon-mobile');
const darkIconMobile = document.getElementById('dark-icon-mobile');

const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
    lightIconMobile.style.display = 'none';
    darkIconMobile.style.display = 'block';
} else {
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
    lightIconMobile.style.display = 'block';
    darkIconMobile.style.display = 'none';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
        lightIconMobile.style.display = 'none';
        darkIconMobile.style.display = 'block';
    } else {
        localStorage.setItem('theme', 'light');
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
        lightIconMobile.style.display = 'block';
        darkIconMobile.style.display = 'none';
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
const body = document.body;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-sticky');
        body.classList.add('navbar-sticky-active');
    } else {
        navbar.classList.remove('navbar-sticky');
        body.classList.remove('navbar-sticky-active');
    }
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenu.style.animation = 'slideUp 0.3s ease-out';
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        mobileMenu.style.animation = 'slideDown 0.3s ease-out';
    }
});

const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========== CAROUSEL FUNCTIONALITY FOR CERTIFICATES ==========
const certificatesTrack = document.getElementById('certificates-track');
const certificatesIndicators = document.getElementById('certificates-indicators');
const certificateCards = certificatesTrack.querySelectorAll('.certificate-card');
const totalCertificates = certificateCards.length;
let currentCertificateIndex = 0;
const prevCertificateBtn = document.getElementById('certificates-prev');
const nextCertificateBtn = document.getElementById('certificates-next');

// Determinar cuántas tarjetas mostrar según el tamaño de pantalla
function getVisibleCards() {
    if (window.innerWidth <= 768) return 1; // Móvil - mostrar 1 tarjeta
    if (window.innerWidth <= 1024) return 2; // Tablet - mostrar 2 tarjetas
    return 3; // Desktop - mostrar 3 tarjetas
}

let visibleCards = getVisibleCards();

// Crear indicadores dinámicamente
function createIndicators() {
    certificatesIndicators.innerHTML = '';
    for (let i = 0; i < totalCertificates; i++) {
        const indicator = document.createElement('div');
        indicator.className = `w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
            i === 0 ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'
        }`;
        indicator.addEventListener('click', () => goToCertificateSlide(i));
        certificatesIndicators.appendChild(indicator);
    }
}

createIndicators();
const certificateIndicators = certificatesIndicators.querySelectorAll('div');

function updateCertificateIndicators() {
    certificateIndicators.forEach((indicator, index) => {
        if (index === currentCertificateIndex) {
            indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600');
            indicator.classList.add('bg-accent');
        } else {
            indicator.classList.remove('bg-accent');
            indicator.classList.add('bg-gray-300', 'dark:bg-gray-600');
        }
    });
}

function goToCertificateSlide(index) {
    currentCertificateIndex = index;
    const cardWidth = 336; // Fixed width: 320px card + 16px gap
    const position = -currentCertificateIndex * cardWidth;
    certificatesTrack.style.transform = `translateX(${position}px)`;
    updateCertificateIndicators();
}

// Funcionalidad de las flechas - Carrusel infinito
prevCertificateBtn.addEventListener('click', () => {
    currentCertificateIndex--;
    if (currentCertificateIndex < 0) {
        currentCertificateIndex = totalCertificates - 1;
    }
    goToCertificateSlide(currentCertificateIndex);
});

nextCertificateBtn.addEventListener('click', () => {
    currentCertificateIndex++;
    if (currentCertificateIndex >= totalCertificates) {
        currentCertificateIndex = 0;
    }
    goToCertificateSlide(currentCertificateIndex);
});

// Actualizar cuando cambie el tamaño de la ventana
window.addEventListener('resize', () => {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
        visibleCards = newVisibleCards;
        // Recrear indicadores si cambió el número visible
        createIndicators();
        // Asegurar que el índice actual sea válido
        if (currentCertificateIndex >= totalCertificates) {
            currentCertificateIndex = 0;
        }
        goToCertificateSlide(currentCertificateIndex);
    }
});

// Función para abrir modal de certificado
function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');

    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar modal
function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera de la imagen
document.getElementById('certificateModal').addEventListener('click', (e) => {
    if (e.target.id === 'certificateModal') {
        closeCertificateModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// ========== FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Formulario enviado:', { name, email, message });

    alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
    contactForm.reset();
});

// ========== FADE IN ANIMATION ON SCROLL ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
