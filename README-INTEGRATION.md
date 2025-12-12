# 🔗 Integración Formulario con API Laravel

El formulario de aromas ahora está integrado con la API de Laravel para obtener datos del difusor y guardar el progreso del formulario.

## 🚀 Funcionalidades Implementadas

### ✅ **1. Obtención de Datos del Difusor**
- **Endpoint**: `GET /api/equipment/{id}`
- **Funcionalidad**: Obtiene información del equipo desde la base de datos
- **Fallback**: Si la API falla, usa datos estáticos

### ✅ **2. Obtención de Notas Aromáticas**
- **Endpoint**: `GET /api/aromatic-notes`
- **Funcionalidad**: Carga las notas aromáticas desde la base de datos
- **Fallback**: Si la API falla, usa datos estáticos

### ✅ **3. Gestión de Sesiones**
- **Crear**: `POST /api/form-sessions`
- **Actualizar**: `PUT /api/form-sessions/{id}`
- **Enviar**: `POST /api/form-sessions/{id}/submit`

### ✅ **4. Guardado Automático**
- El progreso se guarda automáticamente en cada paso
- Se mantiene localStorage como fallback
- Los datos se envían al completar el formulario

## 🛠️ Configuración

### **1. Levantar la API de Laravel**
```bash
cd studio-aroma-laravel
docker-compose up -d
```

### **2. Verificar que la API esté funcionando**
```bash
curl http://localhost:8080/api/equipment/1
curl http://localhost:8080/api/aromatic-notes
```

### **3. Probar el formulario**
- Abrir `formulario-aromas.html?id=1` para probar con equipo específico
- Abrir `formulario-aromas.html` para probar sin equipo

## 🧪 Testing

### **Página de Pruebas**
Abrir `test-integration.html` para probar todos los endpoints de la API.

### **Pruebas Manuales**
1. **Con Equipo**: `formulario-aromas.html?id=1`
2. **Sin Equipo**: `formulario-aromas.html`
3. **Verificar Consola**: Abrir DevTools para ver logs

## 📊 Flujo de Datos

### **1. Carga Inicial**
```
URL con ID → API (equipment/{id}) → Mostrar datos del equipo
URL sin ID → Crear sesión vacía
```

### **2. Durante el Formulario**
```
Cada paso → API (update progress) → Guardar en localStorage (fallback)
```

### **3. Envío Final**
```
Completar → API (submit) → Mostrar resultados → Guardar en localStorage
```

## 🔧 Configuración de la API

### **URL Base**
```javascript
this.apiBaseUrl = 'http://localhost:8080/api';
```

### **Endpoints Utilizados**
- `GET /api/equipment/{id}` - Obtener equipo (incluye modelo)
- `GET /api/equipment-models` - Obtener modelos de equipos
- `GET /api/equipment-models/{id}` - Obtener modelo específico
- `GET /api/aromatic-notes` - Obtener notas
- `POST /api/form-sessions` - Crear sesión
- `PUT /api/form-sessions/{id}` - Actualizar progreso
- `POST /api/form-sessions/{id}/submit` - Enviar formulario

## 🚨 Manejo de Errores

### **Fallback Automático**
- Si la API no está disponible, usa datos estáticos
- Si falla el guardado en API, usa localStorage
- Logs detallados en consola para debugging

### **Logs de Consola**
```javascript
✅ Datos del equipo cargados desde la API
✅ Sesión creada: uuid-session-id
✅ Progreso guardado en la API
✅ Formulario enviado a la API
⚠️ Usando datos estáticos como fallback
❌ Error cargando datos desde la API
```

## 📝 Estructura de Datos

### **Datos del Equipo**
```json
{
  "id": 1,
  "address": "Av. Reforma 123, Col. Juárez, CDMX",
  "type": "Ultrasónico",
  "model": "StudioAroma Pro 500",
  "location": "Av. Reforma 123, Col. Juárez, CDMX",
  "installation_date": "2024-01-15",
  "equipment_model": {
    "id": 1,
    "name": "StudioAroma Pro 500",
    "image": "/images/equipment/pro-500.jpg",
    "description": "Difusor ultrasónico profesional de alta capacidad para espacios grandes",
    "type": "Ultrasónico",
    "specifications": {
      "capacidad": "500ml",
      "cobertura": "100m²",
      "funciones": ["Timer", "LED", "Humidificación"],
      "material": "Cerámica Premium"
    }
  },
  "aroma": {
    "id": 1,
    "name": "Hotel",
    "description": "Una fragancia floral fresca...",
    "category": "Floral",
    "tags": ["Floral", "Fresco", "Elegante"],
    "notes": ["floral", "fresco"]
  }
}
```

### **Datos del Formulario**
```json
{
  "equipmentId": 1,
  "installationType": "oficina",
  "preferredNotes": ["floral", "fresco"],
  "spaces": [
    {
      "type": "oficina",
      "size": "mediano"
    }
  ],
  "userName": "Juan Pérez",
  "userEmail": "juan@ejemplo.com",
  "userPhone": "+52 55 1234 5678"
}
```

## 🔍 Debugging

### **Verificar Conexión**
```javascript
// En la consola del navegador
fetch('http://localhost:8080/api/equipment/1')
  .then(r => r.json())
  .then(console.log);
```

### **Verificar Sesión**
```javascript
// En la consola del navegador
console.log(window.aromaForm.sessionId);
console.log(window.aromaForm.formData);
```

## 🆕 Nueva Funcionalidad: Modelos de Equipos

### **Tabla `equipment_models`**
Se agregó una nueva tabla para almacenar información detallada de los modelos de equipos:

- **`name`**: Nombre del modelo
- **`image`**: URL o ruta de la imagen
- **`description`**: Descripción del modelo
- **`type`**: Tipo de difusor (Ultrasónico, Nebulización, etc.)
- **`specifications`**: Especificaciones técnicas (JSON)
- **`active`**: Si está activo

### **Relación con `equipment`**
- Cada equipo ahora tiene `equipment_model_id` que referencia a `equipment_models`
- Permite reutilizar modelos para múltiples equipos
- Mantiene compatibilidad con el campo `model` existente

### **Beneficios**
- ✅ Información más detallada del equipo
- ✅ Especificaciones técnicas completas
- ✅ Imágenes para mostrar en el formulario
- ✅ Descripciones profesionales
- ✅ Reutilización de modelos para múltiples equipos

## 🚀 Próximos Pasos

1. **Implementar autenticación** para usuarios registrados
2. **Agregar validaciones** más robustas en el servidor
3. **Implementar sistema de recomendaciones** basado en IA
4. **Agregar analytics** y métricas de uso
5. **Optimizar rendimiento** con caché y compresión
6. **Agregar gestión de imágenes** para los modelos de equipos

---

**✅ Integración completada y funcionando correctamente**
**✅ Modelos de equipos implementados y funcionando**
