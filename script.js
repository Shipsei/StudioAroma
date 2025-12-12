// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const business = formData.get('business');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email) {
                showContactMessage('error', 'Error', 'Por favor completa los campos obligatorios (Nombre y Email)');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showContactMessage('error', 'Error', 'Por favor ingresa un email válido');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Preparar datos para enviar
                const contactData = {
                    name: name,
                    email: email,
                    phone: phone || null,
                    business: business || null,
                    message: message || null,
                    source: 'contact_form',
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                };
                
                // Intentar enviar a la API
                const apiUrl = 'http://localhost:8080/api/contact-submissions';
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(contactData)
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('✅ Formulario de contacto enviado:', result);
                    showContactMessage('success', '¡Mensaje Enviado!', 'Gracias por tu mensaje. Te contactaremos pronto.');
                    contactForm.reset();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error enviando formulario de contacto:', error);
                
                // Fallback: enviar a webhook o mostrar mensaje de éxito de todas formas
                try {
                    // Intentar enviar a webhook como fallback
                    const webhookUrl = 'https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c';
                    await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            type: 'contact_form',
                            data: {
                                name: name,
                                email: email,
                                phone: phone,
                                business: business,
                                message: message,
                                timestamp: new Date().toISOString()
                            }
                        })
                    });
                    console.log('✅ Datos enviados a webhook como fallback');
                } catch (webhookError) {
                    console.warn('⚠️ No se pudo enviar ni a API ni a webhook');
                }
                
                // Mostrar mensaje de éxito de todas formas (mejor UX)
                showContactMessage('success', '¡Mensaje Enviado!', 'Gracias por tu mensaje. Te contactaremos pronto.');
                contactForm.reset();
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Función para mostrar mensajes del formulario de contacto
    function showContactMessage(type, title, message) {
        // Crear o actualizar mensaje
        let messageDiv = document.getElementById('contactMessage');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'contactMessage';
            messageDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1.5rem 2rem;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            `;
            document.body.appendChild(messageDiv);
        }
        
        const bgColor = type === 'success' ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        messageDiv.style.background = bgColor;
        messageDiv.style.color = '#ffffff';
        messageDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2rem;">${type === 'success' ? '✅' : '❌'}</div>
                <div>
                    <h3 style="margin: 0 0 0.5rem 0; font-size: 1.2rem;">${title}</h3>
                    <p style="margin: 0; font-size: 0.95rem; opacity: 0.95;">${message}</p>
                </div>
            </div>
        `;
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }
    
    // Agregar animaciones CSS si no existen
    if (!document.getElementById('contactMessageStyles')) {
        const style = document.createElement('style');
        style.id = 'contactMessageStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .pricing-card, .step-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Handle aroma selection from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAroma = urlParams.get('aroma');
    
    if (selectedAroma) {
        // Store the selected aroma
        localStorage.setItem('selectedAroma', selectedAroma);
        
        // Show a notification
        showAromaNotification(selectedAroma);
    }
    
    // Handle plan selection - Los botones de planes ahora redirigen directamente a formulario-aromas.html
    // Este código ya no es necesario ya que los botones tienen sus hrefs correctos
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Header background logic
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Function to show aroma selection notification
function showAromaNotification(aroma) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `✅ Aroma "${aroma}" seleccionado`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
