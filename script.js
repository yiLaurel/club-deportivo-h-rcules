// ================================================================
// MENÚ MÓVIL - TOGGLE
// ================================================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar ícono del menú (opcional)
        const icon = mobileMenu.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        // Restaurar ícono si está abierto
        const icon = mobileMenu?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        const isClickInsideNav = navLinks.contains(e.target);
        const isClickOnToggle = mobileMenu?.contains(e.target);
        if (!isClickInsideNav && !isClickOnToggle) {
            navLinks.classList.remove('active');
            const icon = mobileMenu?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    }
});

// ================================================================
// HEADER CON EFECTO DE SCROLL
// ================================================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================================================================
// SCROLL SUAVE PARA ENLACES ANCLA
// ================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        // Ignorar si es solo "#"
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = header?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================================================
// ANIMACIONES AL SCROLL (Intersection Observer)
// ================================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: dejar de observar para mejorar rendimiento
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos a animar
const animateElements = document.querySelectorAll(
    '.categoria-detalle, .metodologia-item, .beneficio-item, ' +
    '.reglamento-item, .mvv-item, .objetivo-item, ' +
    '.noticia-card, .inscripcion-columna, .video-item'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// ================================================================
// EFECTO DE CARGA PARA EL HERO (opcional)
// ================================================================
// Ya está con CSS animation, pero podemos agregar un pequeño retraso
// a los elementos secundarios del hero para que aparezcan en cascada
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const children = heroContent.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.15}s`;
        });
    }
});

// ================================================================
// PREVENIR QUE EL VIDEO SE DETENGA AL HACER SCROLL (opcional)
// ================================================================
// Si hay videos, podemos pausarlos cuando no están visibles para ahorrar recursos
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            // Video visible: si estaba pausado, podemos reproducirlo (opcional)
            // video.play();
        } else {
            // Video fuera de vista: pausar para ahorrar recursos
            if (!video.paused) {
                video.pause();
            }
        }
    });
}, { threshold: 0.3 });

videos.forEach(video => {
    videoObserver.observe(video);
});