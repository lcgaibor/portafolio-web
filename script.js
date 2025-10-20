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
    lightIcon.classList.add('hidden');
    darkIcon.classList.remove('hidden');
    lightIconMobile.classList.add('hidden');
    darkIconMobile.classList.remove('hidden');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
        lightIconMobile.classList.add('hidden');
        darkIconMobile.classList.remove('hidden');
    } else {
        localStorage.setItem('theme', 'light');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
        lightIconMobile.classList.remove('hidden');
        darkIconMobile.classList.add('hidden');
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-700');
    } else {
        navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-700');
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
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
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

// ========== CAROUSEL FUNCTIONALITY ==========
const carouselTrack = document.getElementById('carousel-track');
const carouselIndicators = document.getElementById('carousel-indicators');
const items = carouselTrack.querySelectorAll('.carousel-item');
const totalItems = items.length;
let currentIndex = 0;
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

const itemWidth = items[0].offsetWidth;
const gap = 20;
const trackItemOffset = itemWidth + gap;

for (let i = 0; i < totalItems; i++) {
    const indicator = document.createElement('div');
    indicator.className = `carousel-indicator ${i === 0 ? 'active' : 'inactive'}`;
    indicator.addEventListener('click', () => goToSlide(i));
    carouselIndicators.appendChild(indicator);
}

const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.remove('inactive');
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
            indicator.classList.add('inactive');
        }
    });
}

function goToSlide(index) {
    currentIndex = index;
    const position = -currentIndex * trackItemOffset;
    carouselTrack.style.transition = 'transform 0.3s ease';
    carouselTrack.style.transform = `translateX(${position}px)`;
    updateIndicators();
}
// Funcionalidad de las flechas
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    } else {
        goToSlide(totalItems - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        goToSlide(currentIndex + 1);
    } else {
        goToSlide(0);
    }
});

// Función para abrir modal de certificado
function openCertificateModal(certId) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');

    const certImages = {
        'cert1': 'img/certificado_contable.jpg',
        'cert2': 'img/certificado_vsc.jpg',
        'cert3': 'img/certificado_docker.jpg',
        'cert4': 'img/certificado_espe.jpg',
        'cert5': 'img/certificado_business.jpg'
    };

    modalImage.src = certImages[certId];
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

carouselTrack.addEventListener('touchstart', touchStart);
carouselTrack.addEventListener('touchend', touchEnd);
carouselTrack.addEventListener('touchmove', touchMove);
carouselTrack.addEventListener('mousedown', touchStart);
carouselTrack.addEventListener('mouseup', touchEnd);
carouselTrack.addEventListener('mouseleave', touchEnd);
carouselTrack.addEventListener('mousemove', touchMove);

function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    carouselTrack.style.cursor = 'grabbing';
    carouselTrack.style.transition = 'none';
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    carouselTrack.style.cursor = 'grab';

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < totalItems - 1) {
        currentIndex += 1;
    }

    if (movedBy > 50 && currentIndex > 0) {
        currentIndex -= 1;
    }

    goToSlide(currentIndex);
    prevTranslate = -currentIndex * trackItemOffset;
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
        requestAnimationFrame(animation);
    }
}

let autoplayInterval = setInterval(() => {
    if (currentIndex < totalItems - 1) {
        goToSlide(currentIndex + 1);
    } else {
        goToSlide(0);
    }
}, 4000);

carouselTrack.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselTrack.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        if (currentIndex < totalItems - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 4000);
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
