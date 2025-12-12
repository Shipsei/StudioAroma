// Formulario de Aromas - Studio Aroma
class AromaForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {
            equipmentId: null,
            installationType: null,
            preferredNotes: [],
            spaces: [],
            userName: '',
            userEmail: '',
            userPhone: '',
            userAddress: '',
            addressDetails: null
        };
        this.equipmentData = null;
        this.sessionId = null;
        this.apiBaseUrl = 'http://localhost:8080/api';
        
        // Datos estáticos para diferentes IDs
        this.staticData = {
            '1': {
                diffuserAddress: 'Av. Reforma 123, Col. Juárez, CDMX',
                diffuserType: 'Ultrasónico',
                model: 'StudioAroma Pro 500',
                location: 'Av. Reforma 123, Col. Juárez, CDMX',
                installationDate: '2024-01-15',
                aroma: {
                    id: 1,
                    name: 'Hotel',
                    description: 'Una fragancia floral fresca que evoca la elegancia y sofisticación de los hoteles de lujo.',
                    notes: [
                        { id: 1, name: 'Floral', icon: '🌸', inspiration: 'Inspira frescura y elegancia', category: 'Floral' },
                        { id: 2, name: 'Fresco', icon: '🌿', inspiration: 'Evoca naturaleza y vitalidad', category: 'Fresco' }
                    ]
                }
            },
            '2': {
                diffuserAddress: 'Calle Insurgentes 456, Col. Roma Norte, CDMX',
                diffuserType: 'Nebulización',
                model: 'StudioAroma Elite 300',
                location: 'Calle Insurgentes 456, Col. Roma Norte, CDMX',
                installationDate: '2024-02-20',
                aroma: {
                    id: 2,
                    name: 'Santal',
                    description: 'Una fragancia amaderada con notas de sándalo que evoca calma y espiritualidad.',
                    notes: [
                        { id: 3, name: 'Amaderado', icon: '🌳', inspiration: 'Transmite calma y profundidad', category: 'Amaderado' },
                        { id: 4, name: 'Oriental', icon: '🕌', inspiration: 'Despierta misterio y sensualidad', category: 'Oriental' }
                    ]
                }
            }
        };
        
        this.spaceTypes = [
            { id: 'recepcion', name: 'Recepción', icon: '🏢' },
            { id: 'oficina', name: 'Oficina', icon: '💼' },
            { id: 'consultorio', name: 'Consultorio', icon: '🩺' },
            { id: 'sala-juntas', name: 'Sala de Juntas', icon: '👥' },
            { id: 'pasillo', name: 'Pasillo', icon: '🚶' },
            { id: 'baño', name: 'Baño', icon: '🚻' },
            { id: 'cocina', name: 'Cocina', icon: '🍳' },
            { id: 'sala', name: 'Sala', icon: '🛋️' },
            { id: 'dormitorio', name: 'Dormitorio', icon: '🛏️' },
            { id: 'otro', name: 'Otro', icon: '🏠' }
        ];
        this.spaceSizes = [
            { id: 'pequeno', name: 'Hasta 50 m²', description: 'Espacios pequeños' },
            { id: 'mediano', name: '50 a 100 m²', description: 'Espacios medianos' },
            { id: 'grande', name: 'Más de 100 m²', description: 'Espacios grandes' },
            { id: 'no-se', name: 'No lo sé', description: 'Te ayudaremos' }
        ];
        this.aromaticNotes = [
            { id: 1, name: 'Floral', icon: '🌸', inspiration: 'Inspira frescura y elegancia', category: 'Floral' },
            { id: 2, name: 'Fresco', icon: '🌿', inspiration: 'Evoca naturaleza y vitalidad', category: 'Fresco' },
            { id: 3, name: 'Amaderado', icon: '🌳', inspiration: 'Transmite calma y profundidad', category: 'Amaderado' },
            { id: 4, name: 'Oriental', icon: '🕌', inspiration: 'Despierta misterio y sensualidad', category: 'Oriental' },
            { id: 5, name: 'Cítrico', icon: '🍋', inspiration: 'Energiza y revitaliza', category: 'Cítrico' },
            { id: 6, name: 'Especiado', icon: '🌶️', inspiration: 'Calienta y estimula', category: 'Especiado' },
            { id: 7, name: 'Marino', icon: '🌊', inspiration: 'Tranquiliza y refresca', category: 'Marino' },
            { id: 8, name: 'Herbal', icon: '🌱', inspiration: 'Purifica y equilibra', category: 'Herbal' },
            { id: 9, name: 'Dulce', icon: '🍯', inspiration: 'Conforta y endulza', category: 'Dulce' },
            { id: 10, name: 'Musgo', icon: '🍄', inspiration: 'Conecta con la tierra', category: 'Terroso' },
            { id: 11, name: 'Vainilla', icon: '🍦', inspiration: 'Acogedor y reconfortante', category: 'Dulce' },
            { id: 12, name: 'Lavanda', icon: '💜', inspiration: 'Relaja y calma', category: 'Floral' }
        ];
        
        this.init();
    }

    // Métodos para interactuar con la API
    async createSession(equipmentId = null) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/form-sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    equipment_id: equipmentId,
                    form_data: {}
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.sessionId = data.id;
            return data;
        } catch (error) {
            console.error('Error creating session:', error);
            throw error;
        }
    }

    async getEquipment(id) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/equipment/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching equipment:', error);
            throw error;
        }
    }

    async getAromaticNotes() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/aromatic-notes`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching aromatic notes:', error);
            throw error;
        }
    }

    async updateProgress(formData, currentStep) {
        if (!this.sessionId) {
            throw new Error('No session created');
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/form-sessions/${this.sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    form_data: formData,
                    current_step: currentStep
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    }

    async submitFormToAPI(formData) {
        if (!this.sessionId) {
            // Si no hay sesión, crear una nueva antes de enviar
            try {
                const session = await this.createSession(this.formData.equipmentId);
                this.sessionId = session.id;
            } catch (error) {
                console.warn('⚠️ No se pudo crear sesión, continuando sin ella');
            }
        }

        try {
            // Preparar datos completos para enviar
            const submissionData = {
                form_data: {
                    ...formData,
                    userName: this.formData.userName,
                    userEmail: this.formData.userEmail,
                    userPhone: this.formData.userPhone,
                    userAddress: this.formData.userAddress,
                    addressDetails: this.formData.addressDetails,
                    planType: this.getPlanTypeFromURL(),
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                },
                recommendation: this.generateRecommendation()
            };

            let result = null;
            
            // Intentar enviar a la API si hay sesión
            if (this.sessionId) {
                try {
                    const response = await fetch(`${this.apiBaseUrl}/form-sessions/${this.sessionId}/submit`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(submissionData)
                    });

                    if (response.ok) {
                        result = await response.json();
                        console.log('✅ Formulario enviado a la API:', result);
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                } catch (apiError) {
                    console.warn('⚠️ Error enviando a API, usando fallback:', apiError);
                }
            }
            
            // Enviar también a endpoint directo como respaldo
            try {
                const directResponse = await fetch(`${this.apiBaseUrl}/form-submissions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(submissionData.form_data)
                });
                
                if (directResponse.ok) {
                    const directResult = await directResponse.json();
                    console.log('✅ Formulario enviado a endpoint directo:', directResult);
                    if (!result) result = directResult;
                }
            } catch (directError) {
                console.warn('⚠️ Error en endpoint directo:', directError);
            }
            
            // Enviar webhook después del envío (siempre, incluso si la API falla)
            await this.sendWebhook(submissionData.form_data);
            
            return result || { success: true, message: 'Formulario procesado' };
        } catch (error) {
            console.error('Error submitting form to API:', error);
            // Enviar webhook de todas formas
            await this.sendWebhook(formData);
            throw error;
        }
    }
    
    // Obtener tipo de plan desde la URL
    getPlanTypeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('plan') || null;
    }

    // Enviar webhook con todos los datos del formulario
    async sendWebhook(formData) {
        const webhookUrl = 'https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c';
        
        try {
            // Preparar datos completos para el webhook
            const webhookData = {
                timestamp: new Date().toISOString(),
                session_id: this.sessionId,
                equipment_data: this.equipmentData,
                form_data: {
                    ...formData,
                    userName: this.formData.userName,
                    userEmail: this.formData.userEmail,
                    userPhone: this.formData.userPhone,
                    userAddress: this.formData.userAddress,
                    addressDetails: this.formData.addressDetails,
                    planType: this.getPlanTypeFromURL()
                },
                aromatic_notes: this.aromaticNotes,
                spaces: this.formData.spaces || [],
                preferred_notes: this.formData.preferredNotes || [],
                installation_type: this.formData.installationType,
                space_size: this.formData.spaceSize,
                recommendation: this.generateRecommendation(),
                url: window.location.href
            };

            console.log('📤 Enviando webhook con datos:', webhookData);

            // Enviar POST con JSON
            try {
                const success = await this.sendWebhookPost(webhookUrl, webhookData);
                if (success) {
                    console.log('✅ Webhook POST enviado exitosamente');
                } else {
                    console.warn('⚠️ Webhook falló, pero el formulario se procesó correctamente');
                }
            } catch (error) {
                console.warn('⚠️ Error en webhook:', error.message);
            }
            
        } catch (error) {
            console.error('❌ Error enviando webhook:', error);
            // No lanzar error para no interrumpir el flujo principal
        }
    }

    // Método POST para enviar webhook
    async sendWebhookPost(webhookUrl, webhookData) {
        return new Promise((resolve) => {
            try {
                console.log('📤 Enviando webhook POST con datos:', webhookData);
                
                // Método 1: sendBeacon con FormData (evita algunos problemas de CORS)
                if (navigator.sendBeacon) {
                    try {
                        const formData = new FormData();
                        formData.append('data', JSON.stringify(webhookData));
                        formData.append('timestamp', new Date().toISOString());
                        formData.append('method', 'post');
                        
                        const success = navigator.sendBeacon(webhookUrl, formData);
                        if (success) {
                            console.log('✅ Webhook enviado con sendBeacon + FormData');
                            resolve(true);
                            return;
                        }
                    } catch (error) {
                        console.log('⚠️ sendBeacon falló:', error.message);
                    }
                }
                
                // Método 2: fetch con POST (puede generar preflight pero es POST real)
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(webhookData)
                }).then(response => {
                    if (response.ok) {
                        console.log('✅ Webhook enviado con fetch POST');
                        resolve(true);
                    } else {
                        console.log('❌ fetch POST falló:', response.status);
                        resolve(false);
                    }
                }).catch(error => {
                    console.log('❌ fetch POST error:', error.message);
                    resolve(false);
                });
                
            } catch (error) {
                console.log('❌ Error en método POST:', error.message);
                resolve(false);
            }
        });
    }

    async init() {
        // Cargar datos desde la URL primero
        await this.loadDataFromURL();
        
        // Cargar información del plan desde la URL
        this.loadPlanFromURL();
        
        // Intentar cargar progreso guardado (solo si se solicita explícitamente)
        const progressLoaded = this.loadSavedProgress();
        
        await this.loadAromas();
        this.loadSpaces();
        this.setupEventListeners();
        this.updateProgress();
        
        // Inicializar Google Maps Autocomplete si está disponible
        this.initGoogleMapsAutocomplete();
        
        // Solo validar el paso actual si no se cargó progreso guardado
        if (!progressLoaded) {
            this.validateStep(this.currentStep);
        }
    }

    // Obtener ID del equipo desde la URL
    getEquipmentIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const equipmentId = urlParams.get('id');
        
        if (equipmentId) {
            this.formData.equipmentId = equipmentId;
            this.loadEquipmentData(equipmentId);
        }
    }

    // Cargar datos del equipo desde la base de datos
    async loadEquipmentData(equipmentId) {
        try {
            // Simulación de llamada a API - reemplazar con tu endpoint real
            const response = await fetch(`/api/equipment/${equipmentId}`);
            if (response.ok) {
                this.equipmentData = await response.json();
                this.displayEquipmentInfo();
            } else {
                // Datos de ejemplo para desarrollo
                this.equipmentData = {
                    id: equipmentId,
                    model: 'Diffuser Pro 500',
                    location: 'Oficina Principal',
                    installationDate: '2024-01-15',
                    currentAroma: 'Hotel',
                    status: 'active'
                };
                this.displayEquipmentInfo();
            }
        } catch (error) {
            console.error('Error loading equipment data:', error);
            // Datos de ejemplo para desarrollo
            this.equipmentData = {
                id: equipmentId,
                model: 'Diffuser Pro 500',
                location: 'Oficina Principal',
                installationDate: '2024-01-15',
                currentAroma: 'Hotel',
                status: 'active'
            };
            this.displayEquipmentInfo();
        }
    }

    // Mostrar información del equipo
    displayEquipmentInfo() {
        if (this.equipmentData) {
            // Usar datos del modelo de equipo si están disponibles
            const modelName = this.equipmentData.equipmentModel?.name || this.equipmentData.model;
            const modelDescription = this.equipmentData.equipmentModel?.description || '';
            const modelImage = this.equipmentData.equipmentModel?.image || '';
            
            // Actualizar texto
            document.getElementById('equipmentModel').textContent = modelName;
            document.getElementById('equipmentLocation').textContent = this.equipmentData.location;
            document.getElementById('equipmentDate').textContent = new Date(this.equipmentData.installationDate).toLocaleDateString('es-MX');
            document.getElementById('equipmentDescription').textContent = modelDescription;
            
            // Actualizar imagen
            const equipmentImage = document.getElementById('equipmentImage');
            if (modelImage) {
                equipmentImage.src = modelImage;
                equipmentImage.style.display = 'block';
                equipmentImage.onerror = () => {
                    console.warn('⚠️ No se pudo cargar la imagen:', modelImage);
                    equipmentImage.style.display = 'none';
                };
            } else {
                equipmentImage.style.display = 'none';
            }
            
            // Mostrar la tarjeta
            document.getElementById('equipmentInfo').style.display = 'block';
            
            // Log para debugging
            console.log('📱 Información del equipo mostrada:', {
                model: modelName,
                description: modelDescription,
                image: modelImage,
                location: this.equipmentData.location,
                installationDate: this.equipmentData.installationDate
            });
        }
    }

    // Cargar notas aromáticas en el grid
    async loadAromas() {
        const aromasGrid = document.getElementById('aromasGrid');
        aromasGrid.innerHTML = '';

        try {
            // Intentar obtener notas aromáticas desde la API
            const notes = await this.getAromaticNotes();
            this.aromaticNotes = notes;

            console.log('✅ Notas aromáticas cargadas desde la API:', notes);

            // Renderizar las notas
            this.renderAromaticNotes(notes);
        } catch (error) {
            console.error('❌ Error cargando notas aromáticas desde la API:', error);
            
            // Fallback a datos estáticos
            console.log('⚠️ Usando datos estáticos como fallback');
            this.renderAromaticNotes(this.aromaticNotes);
        }
    }

    // Renderizar notas aromáticas en el grid
    renderAromaticNotes(notes) {
        const aromasGrid = document.getElementById('aromasGrid');
        aromasGrid.innerHTML = '';

        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'aroma-card';
            noteCard.dataset.noteId = note.id;
            noteCard.innerHTML = `
                <div class="aroma-icon">${note.icon}</div>
                <div class="aroma-name">${note.name}</div>
                <div class="aroma-inspiration">${note.inspiration}</div>
            `;
            noteCard.addEventListener('click', () => this.toggleNoteSelection(note.id, noteCard));
            aromasGrid.appendChild(noteCard);
        });

        // Agregar opción "No estoy seguro"
        const unsureCard = document.createElement('div');
        unsureCard.className = 'aroma-card unsure-option';
        unsureCard.dataset.noteId = 'unsure';
        unsureCard.innerHTML = `
            <div class="aroma-icon">❓</div>
            <div class="aroma-name">No estoy seguro</div>
            <div class="aroma-inspiration">Te ayudaremos a elegir</div>
        `;
        unsureCard.addEventListener('click', () => this.toggleNoteSelection('unsure', unsureCard));
        aromasGrid.appendChild(unsureCard);
    }

    // Cargar espacios iniciales
    loadSpaces() {
        // Agregar un espacio inicial
        this.addSpace();
    }

    // Agregar nuevo espacio
    addSpace() {
        const spaceId = `space_${Date.now()}`;
        const space = {
            id: spaceId,
            type: null,
            size: null
        };
        
        this.formData.spaces.push(space);
        this.renderSpaces();
        this.validateStep(4);
    }

    // Remover espacio
    removeSpace(spaceId) {
        this.formData.spaces = this.formData.spaces.filter(space => space.id !== spaceId);
        this.renderSpaces();
        this.validateStep(4);
    }

    // Renderizar espacios
    renderSpaces() {
        const container = document.getElementById('spacesContainer');
        container.innerHTML = '';

        this.formData.spaces.forEach((space, index) => {
            const spaceElement = document.createElement('div');
            spaceElement.className = 'space-card';
            spaceElement.innerHTML = `
                <div class="space-header">
                    <h3>Espacio ${index + 1}</h3>
                    ${this.formData.spaces.length > 1 ? `<button class="btn-remove-space" onclick="removeSpace('${space.id}')"><i class="fas fa-times"></i></button>` : ''}
                </div>
                <div class="space-content">
                    <div class="space-type-section">
                        <label>Tipo de espacio</label>
                        <div class="space-type-search-container">
                            <div class="space-type-search-input" data-space-id="${space.id}" onclick="toggleSpaceTypeDropdown('${space.id}')">
                                <span class="search-value">${space.type ? this.spaceTypes.find(t => t.id === space.type)?.icon + ' ' + this.spaceTypes.find(t => t.id === space.type)?.name : 'Selecciona un tipo'}</span>
                                <i class="fas fa-chevron-down search-arrow"></i>
                            </div>
                            <div class="space-type-dropdown" id="dropdown-${space.id}" style="display: none;">
                                <div class="search-input-container">
                                    <i class="fas fa-search search-icon"></i>
                                    <input type="text" class="space-type-search" placeholder="Buscar tipo de espacio..." onkeyup="filterSpaceTypes('${space.id}', this.value)">
                                </div>
                                <div class="space-type-options" id="options-${space.id}">
                                    ${this.spaceTypes.map(type => `
                                        <div class="space-type-option ${space.type === type.id ? 'selected' : ''}" 
                                             data-type="${type.id}" 
                                             onclick="selectNoteType('${space.id}', '${type.id}')">
                                            <span class="option-icon">${type.icon}</span>
                                            <span class="option-text">${type.name}</span>
                                            ${space.type === type.id ? '<i class="fas fa-check option-check"></i>' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-size-section">
                        <label>Tamaño del espacio</label>
                        <div class="space-sizes-grid">
                            ${this.spaceSizes.map(size => `
                                <div class="space-size-card ${space.size === size.id ? 'selected' : ''}" 
                                     data-space-id="${space.id}" 
                                     data-size="${size.id}" 
                                     onclick="selectSpaceSize('${space.id}', '${size.id}')">
                                    <div class="space-size-name">${size.name}</div>
                                    <div class="space-size-description">${size.description}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(spaceElement);
        });
    }

    // Configurar event listeners
    setupEventListeners() {
        // Inputs de texto
        document.getElementById('userName').addEventListener('input', (e) => {
            this.formData.userName = e.target.value;
            this.validateStep(5);
        });

        document.getElementById('userEmail').addEventListener('input', (e) => {
            this.formData.userEmail = e.target.value;
            this.validateStep(5);
        });

        document.getElementById('userPhone').addEventListener('input', (e) => {
            this.formData.userPhone = e.target.value;
            this.validateStep(5);
        });


        // Opciones de selección
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const step = this.getCurrentStepElement();
                const value = card.dataset.value;
                
                // Remover selección anterior
                step.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                
                // Seleccionar nueva opción
                card.classList.add('selected');
                
                // Guardar datos según el paso
                if (this.currentStep === 2) {
                    this.formData.installationType = value;
                }
                
                this.validateStep(this.currentStep);
            });
        });
    }

    // Alternar selección de nota aromática
    toggleNoteSelection(noteId, card) {
        if (noteId === 'unsure') {
            // Si selecciona "No estoy seguro", limpiar otras selecciones
            this.formData.preferredNotes = ['unsure'];
            document.querySelectorAll('.aroma-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        } else {
            // Remover "No estoy seguro" si estaba seleccionado
            const unsureCard = document.querySelector('.aroma-card.unsure-option');
            if (unsureCard) unsureCard.classList.remove('selected');
            
            // Alternar selección de la nota
            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                this.formData.preferredNotes = this.formData.preferredNotes.filter(id => id !== noteId);
            } else {
                card.classList.add('selected');
                this.formData.preferredNotes.push(noteId);
            }
        }
        
        this.validateStep(3);
    }

    // Validar paso actual
    validateStep(step) {
        const continueBtn = this.getCurrentStepElement().querySelector('.btn-primary');
        
        let isValid = false;
        
        switch(step) {
            case 1:
                isValid = true; // El paso 1 no requiere validación
                break;
            case 2:
                isValid = this.formData.installationType !== null;
                break;
            case 3:
                isValid = this.formData.preferredNotes.length > 0;
                break;
            case 4:
                isValid = this.formData.spaces.length > 0 && 
                         this.formData.spaces.every(space => space.type !== null && space.size !== null);
                break;
            case 5:
                isValid = this.formData.userName.trim().length > 0 && 
                         this.isValidEmail(this.formData.userEmail) && 
                         this.isValidPhone(this.formData.userPhone) &&
                         this.formData.userAddress.trim().length > 0;
                break;
        }
        
        continueBtn.disabled = !isValid;
    }

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validar teléfono
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Obtener elemento del paso actual
    getCurrentStepElement() {
        return document.getElementById(`step${this.currentStep}`);
    }

    // Cargar datos desde la URL
    async loadDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (id) {
            try {
                // Intentar obtener datos del equipo desde la API
                const equipmentData = await this.getEquipment(id);
                
                this.equipmentData = {
                    id: equipmentData.id,
                    address: equipmentData.address,
                    type: equipmentData.type,
                    model: equipmentData.model,
                    location: equipmentData.location,
                    installationDate: equipmentData.installation_date,
                    equipmentModel: equipmentData.equipment_model,
                    aroma: equipmentData.aroma
                };

                this.formData.equipmentId = id;
                this.formData.preferredNotes = equipmentData.aroma?.notes || [];

                // Crear sesión en la API
                const session = await this.createSession(id);
                this.sessionId = session.id;

                console.log('✅ Datos del equipo cargados desde la API:', this.equipmentData);
                console.log('✅ Sesión creada:', session.session_id);

                this.showLoadedEquipmentInfo();
                this.displayEquipmentInfo();
            } catch (error) {
                console.error('❌ Error cargando datos desde la API:', error);
                
                // Fallback a datos estáticos si la API falla
                if (this.staticData[id]) {
                    const data = this.staticData[id];
                    
                    this.equipmentData = {
                        id: id,
                        address: data.diffuserAddress,
                        type: data.diffuserType,
                        model: data.model,
                        location: data.location,
                        installationDate: data.installationDate,
                        aroma: data.aroma
                    };
                    
                    this.formData.equipmentId = id;
                    // Usar la primera nota del aroma como fallback
                    this.formData.preferredNotes = data.aroma.notes.length > 0 ? [data.aroma.notes[0].id] : [];
                    
                    console.log('⚠️ Usando datos estáticos como fallback');
                    this.showLoadedEquipmentInfo();
                    this.displayEquipmentInfo();
                } else {
                    console.error('❌ No se encontraron datos para el ID:', id);
                }
            }
        } else {
            // Crear sesión sin equipo específico
            try {
                const session = await this.createSession();
                this.sessionId = session.id;
                console.log('✅ Sesión creada sin equipo específico:', session.session_id);
            } catch (error) {
                console.error('❌ Error creando sesión:', error);
            }
        }
    }

    // Mostrar información del equipo cargado
    showLoadedEquipmentInfo() {
        if (this.equipmentData && this.aromaticNotes) {
            
            // Las notas ya vienen como objetos completos desde la API
            const aromaNotes = this.equipmentData.aroma.notes;
            
            // Crear elemento para mostrar la información del aroma asignado
            const aromaInfoContainer = document.createElement('div');
            aromaInfoContainer.className = 'assigned-aroma-info';
            aromaInfoContainer.innerHTML = `
                <div class="assigned-aroma-card">
                    <div class="aroma-header">
                        <h3>Aroma del difusor: <span class="aroma-name-highlight">${this.equipmentData.aroma.name}</span></h3>
                    </div>
                    <div class="aroma-notes-section">
                        <div class="aroma-notes-grid">
                            ${aromaNotes.map(note => `
                                <div class="aroma-note-item">
                                    <span class="note-icon">${note.icon}</span>
                                    <span class="note-name">${note.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Guardar el contenedor para insertarlo cuando se muestre el paso 3
            this.aromaInfoContainer = aromaInfoContainer;
        }
    }

    // Insertar información del aroma cuando se muestre el paso 3
    insertAromaInfo() {
        if (this.aromaInfoContainer) {
            const step3Header = document.querySelector('#step3 .step-header');
            if (step3Header && !document.querySelector('.assigned-aroma-info')) {
                step3Header.insertAdjacentElement('afterend', this.aromaInfoContainer);
            }
        }
    }

    // Siguiente paso
    async nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            
            // Guardar progreso en la API
            if (this.sessionId) {
                try {
                    await this.updateProgress(this.formData, this.currentStep);
                    console.log('✅ Progreso guardado en la API');
                } catch (error) {
                    console.error('❌ Error guardando progreso en la API:', error);
                }
            }
            
            // Guardar progreso automáticamente en localStorage como fallback
            this.saveProgress();
            
            // Si llegamos al paso 3 y hay información de aroma cargada, mostrarla
            if (this.currentStep === 3) {
                this.insertAromaInfo();
            }
        }
    }

    // Paso anterior
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
        }
    }

    // Mostrar paso específico
    showStep(step) {
        // Ocultar todos los pasos
        document.querySelectorAll('.step-content').forEach(el => {
            el.classList.remove('active');
        });
        
        // Mostrar paso actual
        const currentStepEl = document.getElementById(`step${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Actualizar pasos en progress bar
        document.querySelectorAll('.step').forEach(el => {
            el.classList.remove('active');
        });
        
        const currentStepProgress = document.querySelector(`.step[data-step="${step}"]`);
        if (currentStepProgress) {
            currentStepProgress.classList.add('active');
        }
        
        // Si se muestra el paso 3 y hay información de aroma cargada, mostrarla
        if (step === 3) {
            this.insertAromaInfo();
        }
    }

    // Actualizar barra de progreso
    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    // Guardar selección en localStorage
    saveSelection() {
        const selectionData = {
            timestamp: new Date().toISOString(),
            formData: this.formData,
            equipmentData: this.equipmentData,
            sessionId: this.generateSessionId()
        };
        
        try {
            localStorage.setItem('studioAroma_selection', JSON.stringify(selectionData));
            console.log('Selección guardada:', selectionData);
        } catch (error) {
            console.error('Error al guardar selección:', error);
        }
    }

    // Cargar selección desde localStorage
    loadSelection() {
        try {
            const savedData = localStorage.getItem('studioAroma_selection');
            if (savedData) {
                const selectionData = JSON.parse(savedData);
                console.log('Selección cargada:', selectionData);
                return selectionData;
            }
        } catch (error) {
            console.error('Error al cargar selección:', error);
        }
        return null;
    }

    // Generar ID de sesión único
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Guardar progreso automáticamente
    saveProgress() {
        const progressData = {
            timestamp: new Date().toISOString(),
            currentStep: this.currentStep,
            formData: this.formData,
            equipmentData: this.equipmentData
        };
        
        try {
            localStorage.setItem('studioAroma_progress', JSON.stringify(progressData));
        } catch (error) {
            console.error('Error al guardar progreso:', error);
        }
    }

    // Cargar progreso guardado
    loadProgress() {
        try {
            const savedProgress = localStorage.getItem('studioAroma_progress');
            if (savedProgress) {
                const progressData = JSON.parse(savedProgress);
                console.log('Progreso cargado:', progressData);
                return progressData;
            }
        } catch (error) {
            console.error('Error al cargar progreso:', error);
        }
        return null;
    }

    // Limpiar datos guardados
    clearSavedData() {
        try {
            localStorage.removeItem('studioAroma_selection');
            localStorage.removeItem('studioAroma_progress');
            console.log('Datos guardados eliminados');
        } catch (error) {
            console.error('Error al limpiar datos:', error);
        }
    }

    // Cargar progreso guardado al inicializar
    loadSavedProgress() {
        // Solo cargar progreso si hay un parámetro específico en la URL
        const urlParams = new URLSearchParams(window.location.search);
        const continueSession = urlParams.get('continue') === 'true';
        
        if (continueSession) {
            const savedProgress = this.loadProgress();
            if (savedProgress) {
                console.log('Restaurando progreso guardado...');
                
                // Restaurar datos del formulario
                this.formData = { ...this.formData, ...savedProgress.formData };
                this.currentStep = savedProgress.currentStep;
                
                if (savedProgress.equipmentData) {
                    this.equipmentData = savedProgress.equipmentData;
                }
                
                // Mostrar el paso guardado
                this.showStep(this.currentStep);
                return true; // Indica que se cargó progreso
            }
        }
        
        return false; // No se cargó progreso
    }

    // Verificar si hay ID en la URL
    hasUrlId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') !== null;
    }

    // Cargar información del plan desde la URL
    loadPlanFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const planType = urlParams.get('plan');
        
        if (planType) {
            this.displayPlanInfo(planType);
        }
    }

    // Mostrar información del plan
    displayPlanInfo(planType) {
        const planInfoContainer = document.getElementById('planInfoContainer');
        const planInfoCard = planInfoContainer?.querySelector('.plan-info-card');
        const planInfoTitle = document.getElementById('planInfoTitle');
        const planInfoDetails = document.getElementById('planInfoDetails');
        
        if (!planInfoContainer || !planInfoTitle || !planInfoDetails) {
            return;
        }

        const planData = this.getPlanData(planType);
        
        if (planData) {
            planInfoTitle.textContent = planData.title;
            planInfoDetails.innerHTML = planData.details;
            
            // Agregar atributo data-plan para estilos específicos
            if (planInfoCard) {
                planInfoCard.setAttribute('data-plan', planType);
            }
            
            planInfoContainer.style.display = 'block';
            // Agregar clase al body para ajustar el margen del formulario
            document.body.classList.add('has-plan-info');
        }
    }

    // Obtener datos del plan según el tipo
    getPlanData(planType) {
        const plans = {
            'prueba': {
                title: 'Plan de Prueba',
                details: `
                    <div class="plan-detail-item">
                        <i class="fas fa-clock"></i>
                        <span>30 días de prueba con descuento especial</span>
                    </div>
                    <div class="plan-detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cobertura completa en Ciudad de México y área metropolitana</span>
                    </div>
                    <div class="plan-price">
                        <div class="plan-price-wrapper">
                            <span class="plan-price-amount">$260</span>
                            <span class="plan-price-period">+ IVA por 1 mes</span>
                        </div>
                    </div>
                `
            },
            'individual': {
                title: 'Plan Individual',
                details: `
                    <div class="plan-detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cobertura completa en Ciudad de México y área metropolitana</span>
                    </div>
                    <div class="plan-price">
                        <div class="plan-price-wrapper">
                            <span class="plan-price-amount">$1,299</span>
                            <span class="plan-price-period">+ IVA / mes</span>
                        </div>
                    </div>
                `
            },
            'corporativo': {
                title: 'Plan Corporativo',
                details: `
                    <div class="plan-detail-item">
                        <i class="fas fa-info-circle"></i>
                        <span>Mínimo 5 equipos en la misma ubicación</span>
                    </div>
                    <div class="plan-detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Cobertura completa en Ciudad de México y área metropolitana</span>
                    </div>
                    <div class="plan-price">
                        <div class="plan-price-wrapper">
                            <span class="plan-price-amount">$999</span>
                            <span class="plan-price-period">+ IVA / mes</span>
                        </div>
                    </div>
                `
            }
        };

        return plans[planType] || null;
    }

    // Generar recomendación basada en respuestas
    generateRecommendation() {
        const recommendation = {
            installationType: this.formData.installationType,
            spaceSize: this.formData.spaceSize,
            preferredNotes: this.formData.preferredNotes,
            spaces: this.formData.spaces,
            equipmentData: this.equipmentData
        };

        // Lógica de recomendación
        let recommendedAroma = 'Hotel';
        let recommendedDiffuser = 'Diffuser Pro 500';
        let recommendedPlan = 'Plan Individual';

        // Recomendar aroma basado en notas aromáticas preferidas
        if (recommendation.preferredNotes.includes('unsure')) {
            recommendedAroma = 'Hotel'; // Aroma por defecto
        } else {
            // Buscar notas más populares entre las selecciones
            const selectedNotes = this.aromaticNotes.filter(note => 
                recommendation.preferredNotes.includes(note.id)
            );
            
            if (selectedNotes.length > 0) {
                // Elegir la primera nota seleccionada como recomendación principal
                recommendedAroma = selectedNotes[0].name;
            }
        }

        // Recomendar difusor basado en espacios
        const totalSpaces = recommendation.spaces ? recommendation.spaces.length : 0;
        const hasLargeSpace = recommendation.spaces ? recommendation.spaces.some(space => space.size === 'grande') : false;
        
        if (totalSpaces === 1 && recommendation.spaces) {
            const space = recommendation.spaces[0];
            switch(space.size) {
                case 'pequeno':
                    recommendedDiffuser = 'Diffuser Compact 200';
                    break;
                case 'mediano':
                    recommendedDiffuser = 'Diffuser Pro 500';
                    break;
                case 'grande':
                    recommendedDiffuser = 'Diffuser Enterprise 1000';
                    recommendedPlan = 'Plan Corporativo';
                    break;
            }
        } else if (totalSpaces > 1) {
            recommendedDiffuser = 'Múltiples Difusores';
            recommendedPlan = 'Plan Corporativo';
        }

        // Recomendar plan basado en tipo de instalación y espacios
        if (recommendation.installationType === 'oficina' && (hasLargeSpace || totalSpaces > 1)) {
            recommendedPlan = 'Plan Corporativo';
        }

        return {
            aroma: recommendedAroma,
            diffuser: recommendedDiffuser,
            plan: recommendedPlan,
            price: this.getPlanPrice(recommendedPlan),
            features: this.getPlanFeatures(recommendedPlan)
        };
    }

    // Obtener precio del plan
    getPlanPrice(plan) {
        const prices = {
            'Plan Individual': '$1,299 + IVA',
            'Plan Corporativo': '$999 + IVA',
            'Plan de Prueba': '$260 + IVA'
        };
        return prices[plan] || '$1,299 + IVA';
    }

    // Obtener características del plan
    getPlanFeatures(plan) {
        const features = {
            'Plan Individual': [
                'Difusor de alta calidad',
                'Catálogo de 17 aromas premium',
                'Instalación profesional',
                'Recargas mensuales',
                'Soporte técnico'
            ],
            'Plan Corporativo': [
                'Múltiples difusores',
                'Catálogo completo de aromas',
                'Instalación en todas las áreas',
                'Recargas programadas',
                'Soporte prioritario',
                'Descuento especial'
            ],
            'Plan de Prueba': [
                'Difusor de prueba',
                'Selección de aromas',
                'Instalación básica',
                '30 días de prueba',
                '80% de descuento'
            ]
        };
        return features[plan] || features['Plan Individual'];
    }

    // Enviar formulario
    async submitForm() {
        // Validar que todos los campos requeridos estén completos
        if (!this.formData.userName || !this.formData.userEmail || !this.formData.userPhone) {
            this.showMessage('error', 'Campos Incompletos', 'Por favor completa todos los campos de contacto.');
            return;
        }
        
        if (!this.isValidEmail(this.formData.userEmail)) {
            this.showMessage('error', 'Email Inválido', 'Por favor ingresa un email válido.');
            return;
        }
        
        if (!this.isValidPhone(this.formData.userPhone)) {
            this.showMessage('error', 'Teléfono Inválido', 'Por favor ingresa un número de teléfono válido.');
            return;
        }
        
        this.showLoading(true);
        
        try {
            const recommendation = this.generateRecommendation();
            
            // Enviar datos a la API
            try {
                const result = await this.submitFormToAPI(this.formData);
                console.log('✅ Formulario enviado exitosamente:', result);
                
                // Guardar selección en localStorage como respaldo
                this.saveSelection();
                
                // Mostrar resultados
                this.showResults(recommendation);
                
            } catch (error) {
                console.error('❌ Error enviando formulario:', error);
                
                // Guardar en localStorage como fallback
                this.saveSelection();
                
                // Mostrar resultados de todas formas (mejor UX)
                const recommendation = this.generateRecommendation();
                this.showResults(recommendation);
                
                // Mostrar mensaje informativo
                this.showMessage('success', 'Formulario Guardado', 'Tu información se guardó localmente. Te contactaremos pronto.');
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showMessage('error', 'Error', 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.');
        } finally {
            this.showLoading(false);
        }
    }

    // Mostrar resultados
    showResults(recommendation) {
        const resultsCard = document.getElementById('recommendationCard');
        resultsCard.innerHTML = `
            <div class="recommendation-header">
                <h3>🎯 Tu Solución Personalizada</h3>
            </div>
            <div class="recommendation-content">
                <div class="recommendation-item">
                    <div class="recommendation-icon">🌸</div>
                    <div class="recommendation-details">
                        <h4>Aroma Recomendado</h4>
                        <p>${recommendation.aroma}</p>
                    </div>
                </div>
                <div class="recommendation-item">
                    <div class="recommendation-icon">📱</div>
                    <div class="recommendation-details">
                        <h4>Difusor Ideal</h4>
                        <p>${recommendation.diffuser}</p>
                    </div>
                </div>
                <div class="recommendation-item">
                    <div class="recommendation-icon">💼</div>
                    <div class="recommendation-details">
                        <h4>Plan Recomendado</h4>
                        <p>${recommendation.plan} - ${recommendation.price}</p>
                    </div>
                </div>
            </div>
            <div class="recommendation-features">
                <h4>Incluye:</h4>
                <ul>
                    ${recommendation.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="recommendation-actions">
                <button class="btn btn-primary" onclick="window.location.href='index.html#precios'">Ver Planes</button>
                <button class="btn btn-secondary" onclick="window.location.href='index.html#contacto'">Contactar</button>
            </div>
        `;
        
        // Mostrar paso de resultados
        document.querySelectorAll('.step-content').forEach(el => {
            el.classList.remove('active');
        });
        document.getElementById('results').classList.add('active');
    }

    // Mostrar loading
    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = show ? 'flex' : 'none';
    }

    // Mostrar mensaje
    showMessage(type, title, text) {
        const overlay = document.getElementById('messageOverlay');
        const icon = document.getElementById('messageIcon');
        const titleEl = document.getElementById('messageTitle');
        const textEl = document.getElementById('messageText');
        
        icon.innerHTML = type === 'success' ? '✅' : '❌';
        titleEl.textContent = title;
        textEl.textContent = text;
        
        overlay.style.display = 'flex';
    }

    // Cerrar mensaje
    closeMessage() {
        document.getElementById('messageOverlay').style.display = 'none';
    }

    // Inicializar Google Maps Autocomplete
    initGoogleMapsAutocomplete() {
        const addressInput = document.getElementById('userAddress');
        if (!addressInput) {
            return;
        }

        // Función para inicializar cuando Google Maps esté disponible
        const initAutocomplete = () => {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                console.warn('⚠️ Google Maps API no está disponible. El campo de dirección funcionará sin autocompletado.');
                // Permitir entrada manual aunque no haya autocomplete
                addressInput.addEventListener('input', (e) => {
                    this.formData.userAddress = e.target.value;
                    this.validateStep(5);
                });
                return;
            }

            try {
                // Configurar Autocomplete para México (CDMX y área metropolitana)
                const autocomplete = new google.maps.places.Autocomplete(addressInput, {
                    componentRestrictions: { country: 'mx' },
                    fields: ['formatted_address', 'geometry', 'address_components', 'place_id'],
                    types: ['address']
                });

                // Cuando se selecciona una dirección
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    
                    if (!place.geometry) {
                        console.warn('⚠️ No se encontró información de la dirección');
                        this.formData.userAddress = addressInput.value;
                        this.validateStep(5);
                        return;
                    }

                    // Guardar dirección completa
                    this.formData.userAddress = place.formatted_address || addressInput.value;
                    
                    // Guardar detalles adicionales
                    this.formData.addressDetails = {
                        formatted_address: place.formatted_address,
                        place_id: place.place_id,
                        geometry: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        },
                        address_components: place.address_components
                    };

                    console.log('✅ Dirección seleccionada:', this.formData.addressDetails);
                    
                    // Validar el paso
                    this.validateStep(5);
                });

                console.log('✅ Google Maps Autocomplete inicializado');
            } catch (error) {
                console.error('❌ Error inicializando Google Maps Autocomplete:', error);
            }
        };

        // Intentar inicializar inmediatamente
        if (window.google && window.google.maps && window.google.maps.places) {
            initAutocomplete();
        } else {
            // Esperar a que Google Maps se cargue
            window.addEventListener('google-maps-loaded', initAutocomplete);
            
            // También verificar periódicamente (fallback)
            let attempts = 0;
            const checkInterval = setInterval(() => {
                if (window.google && window.google.maps && window.google.maps.places) {
                    clearInterval(checkInterval);
                    initAutocomplete();
                }
                attempts++;
                if (attempts > 20) { // 10 segundos máximo
                    clearInterval(checkInterval);
                    console.warn('⚠️ Google Maps no se cargó después de 10 segundos');
                    initAutocomplete(); // Intentar de todas formas
                }
            }, 500);
        }

        // Guardar dirección cuando se escribe manualmente
        addressInput.addEventListener('input', (e) => {
            if (e.target.value.trim().length > 0) {
                this.formData.userAddress = e.target.value;
                this.validateStep(5);
            }
        });

        // Prevenir submit del formulario al presionar Enter en el autocomplete
        addressInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.value.trim().length > 0) {
                // Permitir Enter solo si hay texto
                setTimeout(() => {
                    this.validateStep(5);
                }, 100);
            }
        });
    }
}

// Funciones globales para los botones
function nextStep() {
    if (window.aromaForm) {
        window.aromaForm.nextStep();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function prevStep() {
    if (window.aromaForm) {
        window.aromaForm.prevStep();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function submitForm() {
    if (window.aromaForm) {
        window.aromaForm.submitForm();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function closeMessage() {
    if (window.aromaForm) {
        window.aromaForm.closeMessage();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function addSpace() {
    if (window.aromaForm) {
        window.aromaForm.addSpace();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function removeSpace(spaceId) {
    if (window.aromaForm) {
        window.aromaForm.removeSpace(spaceId);
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function selectSpaceType(spaceId, typeId) {
    if (window.aromaForm) {
        const space = window.aromaForm.formData.spaces.find(s => s.id === spaceId);
        if (space) {
            space.type = typeId;
            window.aromaForm.renderSpaces();
            window.aromaForm.validateStep(4);
        }
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function selectSpaceSize(spaceId, sizeId) {
    if (window.aromaForm) {
        const space = window.aromaForm.formData.spaces.find(s => s.id === spaceId);
        if (space) {
            space.size = sizeId;
            window.aromaForm.renderSpaces();
            window.aromaForm.validateStep(4);
        }
    } else {
        console.error('AromaForm no está inicializado');
    }
}

function toggleSpaceTypeDropdown(spaceId) {
    const dropdown = document.getElementById(`dropdown-${spaceId}`);
    const arrow = document.querySelector(`[data-space-id="${spaceId}"] .search-arrow`);
    
    // Cerrar otros dropdowns
    document.querySelectorAll('.space-type-dropdown').forEach(d => {
        if (d.id !== `dropdown-${spaceId}`) {
            d.style.display = 'none';
        }
    });
    
    // Toggle current dropdown
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        dropdown.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

function filterSpaceTypes(spaceId, searchTerm) {
    const options = document.getElementById(`options-${spaceId}`);
    const allOptions = options.querySelectorAll('.space-type-option');
    
    allOptions.forEach(option => {
        const text = option.querySelector('.option-text').textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            option.style.display = 'flex';
        } else {
            option.style.display = 'none';
        }
    });
}

function selectNoteType(spaceId, typeId) {
    if (window.aromaForm) {
        const space = window.aromaForm.formData.spaces.find(s => s.id === spaceId);
        if (space) {
            space.type = typeId;
            
            // Actualizar el valor mostrado
            const searchInput = document.querySelector(`[data-space-id="${spaceId}"] .search-value`);
            const selectedType = window.aromaForm.spaceTypes.find(t => t.id === typeId);
            searchInput.textContent = selectedType ? `${selectedType.icon} ${selectedType.name}` : 'Selecciona un tipo';
            
            // Cerrar dropdown
            const dropdown = document.getElementById(`dropdown-${spaceId}`);
            const arrow = document.querySelector(`[data-space-id="${spaceId}"] .search-arrow`);
            dropdown.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
            
            // Limpiar búsqueda
            const searchInputField = dropdown.querySelector('.space-type-search');
            searchInputField.value = '';
            filterSpaceTypes(spaceId, '');
            
            window.aromaForm.validateStep(4);
        }
    } else {
        console.error('AromaForm no está inicializado');
    }
}

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.space-type-search-container')) {
        document.querySelectorAll('.space-type-dropdown').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
        document.querySelectorAll('.search-arrow').forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }
});

// Función global para limpiar datos guardados
function clearStudioAromaData() {
    if (window.aromaForm) {
        window.aromaForm.clearSavedData();
    } else {
        console.error('AromaForm no está inicializado');
    }
}

// Función global para ver datos guardados
function viewStudioAromaData() {
    try {
        const selection = localStorage.getItem('studioAroma_selection');
        const progress = localStorage.getItem('studioAroma_progress');
        
        console.log('=== DATOS GUARDADOS ===');
        console.log('Selección:', selection ? JSON.parse(selection) : 'No hay datos');
        console.log('Progreso:', progress ? JSON.parse(progress) : 'No hay datos');
        console.log('=======================');
    } catch (error) {
        console.error('Error al mostrar datos:', error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.aromaForm = new AromaForm();
        console.log('AromaForm inicializado correctamente');
        console.log('Funciones disponibles:');
        console.log('- clearStudioAromaData() - Limpiar datos guardados');
        console.log('- viewStudioAromaData() - Ver datos guardados');
    } catch (error) {
        console.error('Error al inicializar AromaForm:', error);
    }
});
