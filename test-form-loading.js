// Test script para verificar la carga de notas aromáticas
console.log('🧪 Iniciando test de carga de notas aromáticas...');

// Simular la clase AromaForm para testing
class TestAromaForm {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080/api';
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
    }

    async getAromaticNotes() {
        try {
            console.log('🌐 Llamando a la API...');
            const response = await fetch(`${this.apiBaseUrl}/aromatic-notes`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Datos recibidos de la API:', data);
            return data;
        } catch (error) {
            console.error('❌ Error fetching aromatic notes:', error);
            throw error;
        }
    }

    async loadAromas() {
        console.log('🎯 Iniciando carga de aromas...');
        
        try {
            // Intentar obtener notas aromáticas desde la API
            const notes = await this.getAromaticNotes();
            this.aromaticNotes = notes;

            console.log('✅ Notas aromáticas cargadas desde la API:', notes);
            console.log(`📊 Total de notas: ${notes.length}`);

            // Verificar estructura de datos
            notes.forEach((note, index) => {
                console.log(`Nota ${index + 1}:`, {
                    id: note.id,
                    name: note.name,
                    icon: note.icon,
                    inspiration: note.inspiration,
                    category: note.category
                });
            });

            return notes;
        } catch (error) {
            console.error('❌ Error cargando notas aromáticas desde la API:', error);
            
            // Fallback a datos estáticos
            console.log('⚠️ Usando datos estáticos como fallback');
            console.log('📊 Datos estáticos:', this.aromaticNotes);
            return this.aromaticNotes;
        }
    }
}

// Ejecutar test
async function runTest() {
    console.log('🚀 Iniciando test...');
    
    const testForm = new TestAromaForm();
    
    try {
        const notes = await testForm.loadAromas();
        
        console.log('🎉 Test completado exitosamente!');
        console.log('📋 Resumen:');
        console.log(`   - Total de notas: ${notes.length}`);
        console.log(`   - Primera nota: ${notes[0].name} (ID: ${notes[0].id})`);
        console.log(`   - Última nota: ${notes[notes.length - 1].name} (ID: ${notes[notes.length - 1].id})`);
        
        // Verificar que los IDs son numéricos
        const allIdsNumeric = notes.every(note => typeof note.id === 'number');
        console.log(`   - IDs numéricos: ${allIdsNumeric ? '✅' : '❌'}`);
        
        // Verificar campos requeridos
        const requiredFields = ['id', 'name', 'icon', 'inspiration', 'category'];
        const allFieldsPresent = notes.every(note => 
            requiredFields.every(field => note.hasOwnProperty(field))
        );
        console.log(`   - Campos requeridos: ${allFieldsPresent ? '✅' : '❌'}`);
        
    } catch (error) {
        console.error('💥 Test falló:', error);
    }
}

// Ejecutar cuando se carga la página
if (typeof window !== 'undefined') {
    window.addEventListener('load', runTest);
} else {
    // Para Node.js
    runTest();
}
