# 🔗 Implementación de Webhook - Studio Aroma

## 🎯 Objetivo

Implementar un webhook que envíe un POST con JSON a [https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c](https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c) cuando se cree un registro en el formulario.

## ✅ Implementación Realizada

### 1. Método `sendWebhook()`

```javascript
async sendWebhook(formData) {
    const webhookUrl = 'https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c';
    
    try {
        // Preparar datos completos para el webhook
        const webhookData = {
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            equipment_data: this.equipmentData,
            form_data: formData,
            aromatic_notes: this.aromaticNotes,
            spaces: this.formData.spaces || [],
            preferred_notes: this.formData.preferredNotes || [],
            installation_type: this.formData.installationType,
            space_size: this.formData.spaceSize,
            recommendation: this.generateRecommendation()
        };

        console.log('📤 Enviando webhook con datos:', webhookData);

        // Enviar POST con JSON
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
        });

        if (response.ok) {
            console.log('✅ Webhook enviado exitosamente');
        } else {
            console.warn('⚠️ Webhook falló, pero el formulario se procesó correctamente');
        }
        
    } catch (error) {
        console.error('❌ Error enviando webhook:', error);
        // No lanzar error para no interrumpir el flujo principal
    }
}
```

### 2. Integración en `submitFormToAPI()`

```javascript
const result = await response.json();

// Enviar webhook después del envío exitoso
await this.sendWebhook(formData);

return result;
```

## 📊 Estructura de Datos Enviados

### JSON del Webhook

```json
{
  "timestamp": "2025-10-16T17:35:00.000Z",
  "session_id": "uuid-session-id",
  "equipment_data": {
    "id": 1,
    "address": "Av. Reforma 123, Col. Juárez, CDMX",
    "type": "Ultrasónico",
    "model": "A1000",
    "location": "Av. Reforma 123, Col. Juárez, CDMX",
    "installationDate": "2024-01-15",
    "equipmentModel": {
      "id": 1,
      "name": "A1000",
      "image": "images/difusor_A1000/4.jpg",
      "description": "Difusor ultrasónico profesional...",
      "type": "Ultrasónico",
      "specifications": {...}
    },
    "aroma": {
      "id": 1,
      "name": "Hotel",
      "description": "Una fragancia floral fresca...",
      "notes": [
        {
          "id": 1,
          "name": "Floral",
          "icon": "🌸",
          "inspiration": "Inspira frescura y elegancia",
          "category": "Floral"
        }
      ]
    }
  },
  "form_data": {
    "equipmentId": "1",
    "preferredNotes": [1, 2],
    "spaces": [
      {
        "type": "oficina",
        "size": "mediano"
      }
    ],
    "installationType": "nueva",
    "spaceSize": "mediano"
  },
  "aromatic_notes": [
    {
      "id": 1,
      "name": "Floral",
      "icon": "🌸",
      "inspiration": "Inspira frescura y elegancia",
      "category": "Floral"
    }
  ],
  "spaces": [
    {
      "type": "oficina",
      "size": "mediano"
    }
  ],
  "preferred_notes": [1, 2],
  "installation_type": "nueva",
  "space_size": "mediano",
  "recommendation": {
    "aroma": "Hotel",
    "diffuser": "A1000",
    "plan": "Plan Básico",
    "spaces": [...]
  }
}
```

## 🔄 Flujo de Ejecución

### Proceso Completo

1. **Usuario completa el formulario**
2. **Se ejecuta `submitFormToAPI()`**
3. **Se envía a la API Laravel**
4. **API responde exitosamente**
5. **Se ejecuta `sendWebhook()`**
6. **Se preparan todos los datos**
7. **Se envía POST a webhook.site**
8. **Datos se registran en webhook.site**

### Características del Webhook

- **Método**: POST
- **Content-Type**: application/json
- **URL**: https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c
- **Datos**: JSON completo con toda la información del formulario
- **Timestamp**: Incluye fecha y hora del envío
- **Session ID**: Identificador único de la sesión

## 🛡️ Manejo de Errores

### Características de Seguridad

1. **No interrumpe el flujo principal**: Si el webhook falla, el formulario sigue funcionando
2. **Manejo silencioso**: Los errores se registran en consola pero no afectan al usuario
3. **Timeout implícito**: fetch() tiene timeout por defecto
4. **Logging completo**: Se registra el éxito o fallo del webhook

### Casos de Error

- **CORS**: Posible bloqueo por políticas de CORS
- **Red**: Problemas de conectividad
- **Servidor**: webhook.site temporalmente no disponible
- **Datos**: Errores en la serialización JSON

## 🧪 Testing

### Archivo de Test

- **`test-webhook.html`**: Test completo del webhook

### Casos de Prueba

1. **Test directo**: Envío directo al webhook
2. **Simulación**: Simulación del envío del formulario
3. **Estructura**: Verificación de la estructura de datos
4. **Implementación**: Verificación del código implementado

### Cómo Probar

1. **Test directo**: `test-webhook.html`
2. **Formulario real**: Completar y enviar el formulario
3. **webhook.site**: Verificar en la URL del webhook

## 📋 Datos Incluidos

### Información del Equipo
- ID, dirección, tipo, modelo
- Ubicación, fecha de instalación
- Modelo del equipo con imagen y especificaciones
- Aroma asignado con notas relacionadas

### Datos del Formulario
- ID del equipo
- Notas aromáticas preferidas
- Espacios configurados
- Tipo de instalación
- Tamaño del espacio

### Datos Adicionales
- Notas aromáticas disponibles
- Recomendación generada
- Timestamp del envío
- Session ID único

## ✅ Beneficios

1. **Trazabilidad**: Registro completo de cada envío
2. **Debugging**: Fácil identificación de problemas
3. **Integración**: Posibilidad de integrar con otros sistemas
4. **Monitoreo**: Seguimiento de uso del formulario
5. **Backup**: Respaldo de datos enviados

## 🎯 Resultado Final

**✅ Webhook implementado exitosamente**

- **Funcionalidad**: Envío automático al crear registro
- **Datos**: JSON completo con toda la información
- **URL**: https://webhook.site/b352e25f-4b2b-4f78-a27f-f3094eb4e14c
- **Método**: POST con Content-Type: application/json
- **Seguridad**: No interrumpe el flujo principal
- **Testing**: Archivo de test disponible

### Cómo Verificar

1. **Completar formulario**: `formulario-aromas.html?id=1`
2. **Enviar formulario**: Completar todos los pasos
3. **Verificar webhook**: Revisar en webhook.site
4. **Test directo**: `test-webhook.html`

---

**Estado**: ✅ **COMPLETADO** - El webhook se envía automáticamente al crear un registro con todos los datos del formulario.
