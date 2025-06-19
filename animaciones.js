// animaciones.js - Versión corregida

document.addEventListener('DOMContentLoaded', function() {
    // Efecto de carga inicial
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Mejoras para los botones de pestañas
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        // Efecto hover mejorado
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
        
        // Efecto al hacer clic
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => {
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = 'none';
            });
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        });
    });

    // Animación para los elementos del menú
    const menuItems = document.querySelectorAll('#menu li');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Activar animación cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });

    // Animación para las imágenes de la galería
    const galleryImages = document.querySelectorAll('.galeria img');
    galleryImages.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Manejo de carga de imágenes
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.style.backgroundColor = '#f8d7da';
            });
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(img);
    });

    // Efecto para el botón de reserva
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        
        submitButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
        
        submitButton.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        submitButton.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    }

    // Efecto de scroll suave para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animación para los títulos de sección
    const sectionTitles = document.querySelectorAll('h2');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-20px)';
        title.style.transition = 'all 0.5s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });

    // Efecto de onda al hacer clic en los botones - CORREGIDO
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button')) {
            const button = e.target;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        }
    });

    // Efecto de parallax para la sección de inicio
    const inicioSection = document.getElementById('inicio');
    if (inicioSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            inicioSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});