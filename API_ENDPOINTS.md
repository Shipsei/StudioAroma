# 📡 Endpoints de API Necesarios

Este documento describe los endpoints que deben estar disponibles en tu API Laravel para que los formularios funcionen correctamente.

## 🔗 URL Base de la API

```
http://localhost:8080/api
```

## 📋 Endpoints Requeridos

### 1. Formulario de Contacto (index.html)

**Endpoint:** `POST /api/contact-submissions`

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+52 55 1234 5678",
  "business": "Mi Empresa",
  "message": "Mensaje del usuario",
  "source": "contact_form",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://shipsei.github.io/index.html"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Formulario de contacto enviado exitosamente",
  "submission_id": 123
}
```

### 2. Formulario de Aromas - Crear Sesión

**Endpoint:** `POST /api/form-sessions`

**Request Body:**
```json
{
  "equipment_id": 1,
  "form_data": {}
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-session-id",
  "equipment_id": 1,
  "created_at": "2024-01-15T10:30:00.000Z"
}
```

### 3. Formulario de Aromas - Actualizar Progreso

**Endpoint:** `PUT /api/form-sessions/{session_id}`

**Request Body:**
```json
{
  "form_data": {
    "installationType": "oficina",
    "preferredNotes": [1, 2, 3],
    "spaces": [...]
  },
  "current_step": 3
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-session-id",
  "form_data": {...},
  "current_step": 3,
  "updated_at": "2024-01-15T10:35:00.000Z"
}
```

### 4. Formulario de Aromas - Enviar Formulario (con sesión)

**Endpoint:** `POST /api/form-sessions/{session_id}/submit`

**Request Body:**
```json
{
  "form_data": {
    "equipmentId": 1,
    "installationType": "oficina",
    "preferredNotes": [1, 2, 3],
    "spaces": [
      {
        "id": "space_123",
        "type": "oficina",
        "size": "mediano"
      }
    ],
    "userName": "Juan Pérez",
    "userEmail": "juan@ejemplo.com",
    "userPhone": "+52 55 1234 5678",
    "userAddress": "Av. Reforma 123, CDMX",
    "addressDetails": {
      "formatted_address": "Av. Reforma 123, CDMX",
      "place_id": "ChIJ...",
      "geometry": {
        "lat": 19.4326,
        "lng": -99.1332
      }
    },
    "planType": "prueba",
    "timestamp": "2024-01-15T10:40:00.000Z",
    "url": "shipsei.github.io/formulario-aromas.html?plan=prueba"
  },
  "recommendation": {
    "aroma": "Hotel",
    "diffuser": "Diffuser Pro 500",
    "plan": "Plan de Prueba",
    "price": "$260 + IVA",
    "features": [...]
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Formulario enviado exitosamente",
  "submission_id": 456,
  "session_id": "uuid-session-id"
}
```

### 5. Formulario de Aromas - Enviar Formulario (directo, sin sesión)

**Endpoint:** `POST /api/form-submissions`

**Request Body:** (igual que el anterior, solo `form_data`)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Formulario enviado exitosamente",
  "submission_id": 789
}
```

## 🔄 Flujo de Envío

### Formulario de Contacto (index.html)
```
Usuario completa formulario
    ↓
Validación local
    ↓
POST /api/contact-submissions
    ↓
Si falla → Enviar a webhook como fallback
    ↓
Mostrar mensaje de éxito
```

### Formulario de Aromas (formulario-aromas.html)
```
Usuario completa todos los pasos
    ↓
Validación completa
    ↓
Intentar POST /api/form-sessions/{id}/submit
    ↓
Si falla → Intentar POST /api/form-submissions
    ↓
Si ambos fallan → Enviar a webhook
    ↓
Guardar en localStorage como respaldo
    ↓
Mostrar resultados
```

## 🛡️ Manejo de Errores

Los formularios tienen múltiples niveles de fallback:

1. **Primario**: Envío a API Laravel
2. **Secundario**: Envío a webhook (webhook.site)
3. **Terciario**: Guardado en localStorage

Esto asegura que los datos nunca se pierdan, incluso si la API no está disponible.

## 📝 Notas Importantes

- Todos los endpoints deben aceptar `Content-Type: application/json`
- Todos deben retornar JSON
- Los errores deben retornar códigos HTTP apropiados (400, 500, etc.)
- El webhook siempre se envía como respaldo adicional
- Los datos se guardan en localStorage como último recurso

## 🔍 Verificación

Para verificar que los endpoints funcionan:

1. Abre la consola del navegador (F12)
2. Completa un formulario
3. Revisa los logs en la consola:
   - ✅ = Éxito
   - ⚠️ = Advertencia (fallback usado)
   - ❌ = Error

## 🚀 Próximos Pasos

1. Crear los endpoints en Laravel según esta especificación
2. Configurar CORS si es necesario
3. Implementar validación en el backend
4. Configurar notificaciones por email
5. Configurar base de datos para guardar los datos
