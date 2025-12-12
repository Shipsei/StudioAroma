// Aromas Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const aromaCards = document.querySelectorAll('.aroma-card');
    let isFiltering = false;
    
    // Initialize cards visibility and styles
    aromaCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Filter function
    function filterAromas(filterValue) {
        isFiltering = true;
        
        // Get visible cards count for staggered animation
        const visibleCards = Array.from(aromaCards).filter(card => {
            const category = card.getAttribute('data-category');
            return filterValue === 'all' || category === filterValue;
        });
        
        let visibleIndex = 0;
        
        aromaCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || category === filterValue;
            
            if (shouldShow) {
                // Show card with animation
                card.style.display = 'block';
                card.classList.remove('hidden');
                card.classList.add('visible');
                
                // Staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, visibleIndex * 30);
                
                visibleIndex++;
            } else {
                // Hide card with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                card.classList.add('hidden');
                card.classList.remove('visible');
                
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 400);
            }
        });
        
        // Reset filtering flag after animation
        setTimeout(() => {
            isFiltering = false;
        }, 500);
    }
    
    // Add click handlers to filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            filterAromas(filter);
        });
    });
    
    // Intersection Observer for initial animations (disabled during filtering)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        if (isFiltering) return; // Don't animate during filtering
        
        entries.forEach(entry => {
            if (entry.isIntersecting && 
                !entry.target.classList.contains('animated') && 
                !entry.target.classList.contains('hidden')) {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe aroma cards for initial animation
    aromaCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Smooth scrolling for navigation links
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
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Aroma selection functionality
    const selectButtons = document.querySelectorAll('.btn-select-aroma');
    
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedAroma = this.getAttribute('data-aroma');
            
            // Store the selected aroma in localStorage
            localStorage.setItem('selectedAroma', selectedAroma);
            
            // Show confirmation
            this.textContent = '¡Elegido!';
            this.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            this.style.color = '#ffffff';
            
            // Redirect to plans page with aroma parameter
            setTimeout(() => {
                window.location.href = `index.html#precios?aroma=${encodeURIComponent(selectedAroma)}`;
            }, 1000);
        });
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
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
