// Componente reutilizable de planes de precios
// Este componente puede ser usado en index.html y planes.html

class PricingPlans {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            showTitle: options.showTitle !== false, // Por defecto mostrar título
            redirectUrl: options.redirectUrl || 'formulario-aromas.html',
            selectedAroma: options.selectedAroma || null, // Aroma seleccionado desde aromas.html
            ...options
        };
        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`No se encontró el contenedor con ID: ${this.containerId}`);
            return;
        }
        this.render();
    }

    // Generar URL de redirección con parámetros
    getRedirectUrl(planType) {
        const params = new URLSearchParams();
        params.set('plan', planType);
        
        if (this.options.selectedAroma) {
            params.set('aroma', this.options.selectedAroma);
        }
        
        return `${this.options.redirectUrl}?${params.toString()}`;
    }

    // Renderizar los planes
    render() {
        const container = document.getElementById(this.containerId);
        
        let html = '';
        
        if (this.options.showTitle) {
            html += `
                <div class="section-header">
                    <h2 class="section-title">Nuestros Planes</h2>
                    <p class="section-subtitle">
                        Servicio completo de aromatización profesional
                    </p>
                </div>
            `;
        }

        html += `
            <div class="pricing-grid">
                <!-- Plan de Prueba -->
                <div class="pricing-card trial">
                    <div class="pricing-badge trial-badge">
                        <span>80% OFF</span>
                    </div>
                    <div class="pricing-header">
                        <h3>1 mes de prueba</h3>
                        <div class="price-container">
                            <div class="price-main">
                                <span class="currency">$</span>
                                <span class="amount">260</span>
                                <span class="period">+ IVA</span>
                            </div>
                            <div class="price-comparison">
                                <span class="original-price">Antes: $1,299</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pricing-features">
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Aroma personalizado para tu marca</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Equipos de difusión profesional</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Instalación y configuración</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Mantenimiento mensual incluido</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Reposición de fragancias</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Soporte técnico especializado</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Sin compromiso de permanencia</span>
                        </div>
                    </div>
                    
                    <div class="trial-info">
                        <i class="fas fa-clock"></i>
                        <span>30 días de prueba con descuento especial</span>
                    </div>
                    
                    <div class="coverage-info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cobertura: Ciudad de México y área metropolitana</span>
                    </div>
                    
                    <a href="${this.getRedirectUrl('prueba')}" class="btn btn-trial btn-full">¡Comenzar con Descuento!</a>
                </div>

                <!-- Plan Individual -->
                <div class="pricing-card">
                    <div class="pricing-header">
                        <h3>Plan Individual</h3>
                        <div class="price-container">
                            <div class="price-main">
                                <span class="currency">$</span>
                                <span class="amount">1,299</span>
                                <span class="period">+ IVA / mes</span>
                            </div>
                            <div class="price-comparison empty">
                                <span class="original-price"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pricing-features">
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Aroma personalizado para tu marca</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Equipos de difusión profesional</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Instalación y configuración</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Mantenimiento mensual incluido</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Reposición de fragancias</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Soporte técnico especializado</span>
                        </div>
                    </div>
                    
                    <div class="coverage-info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cobertura: Ciudad de México y área metropolitana</span>
                    </div>
                    
                    <a href="${this.getRedirectUrl('individual')}" class="btn btn-secondary btn-full">Comenzar Ahora</a>
                </div>

                <!-- Plan Corporativo -->
                <div class="pricing-card featured">
                    <div class="pricing-badge">
                        <span>MÁS POPULAR</span>
                    </div>
                    <div class="pricing-header">
                        <h3>Plan Corporativo</h3>
                        <div class="price-container">
                            <div class="price-main">
                                <span class="currency">$</span>
                                <span class="amount">999</span>
                                <span class="period">+ IVA / mes</span>
                            </div>
                            <div class="price-comparison">
                                <span class="original-price">Antes: $1,299</span>
                                <span class="discount-badge">23% OFF</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pricing-features">
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Aroma personalizado para tu marca</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Equipos de difusión profesional</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Instalación y configuración</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Mantenimiento mensual incluido</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Reposición de fragancias</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Soporte técnico especializado</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Gestión centralizada de múltiples equipos</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-check"></i>
                            <span>Reportes de uso y rendimiento</span>
                        </div>
                    </div>
                    
                    <div class="plan-requirements">
                        <i class="fas fa-info-circle"></i>
                        <span>Mínimo 5 equipos en la misma ubicación</span>
                    </div>
                    
                    <div class="coverage-whatsapp-container">
                        <div class="coverage-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Cobertura: Ciudad de México y área metropolitana</span>
                        </div>
                        <div class="whatsapp-contact">
                            <p class="whatsapp-text">¿Necesitas otra zona? Escríbenos</p>
                            <a href="https://wa.me/525537654650?text=Hola,%20necesito%20información%20sobre%20cobertura%20en%20otra%20zona" class="btn-whatsapp" target="_blank" rel="noopener noreferrer" title="Contactar por WhatsApp">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    
                    <a href="${this.getRedirectUrl('corporativo')}" class="btn btn-primary btn-full">Solicitar Cotización</a>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Método estático para obtener el aroma de la URL
    static getAromaFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('aroma') || null;
    }

    // Método estático para obtener el plan de la URL
    static getPlanFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('plan') || null;
    }
}
