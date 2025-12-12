# 🔑 Configuración de Google Maps API para Desarrollo Local

## Opciones para Restricciones de Referrer en Google Cloud Console

Cuando trabajas con archivos locales (`file://`), tienes varias opciones para configurar las restricciones de tu API Key:

### Opción 1: Sin Restricciones (Solo para Desarrollo)
**No recomendado para producción**, pero útil para desarrollo rápido:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto
3. Ve a **APIs & Services** > **Credentials**
4. Haz clic en tu API Key
5. En **Application restrictions**:
   - Selecciona **None** (sin restricciones)
6. Guarda los cambios

⚠️ **Advertencia**: Esto permite que cualquier sitio use tu API Key. Solo úsalo en desarrollo.

### Opción 2: Permitir Referrers Específicos (Recomendado)

Para archivos locales, puedes agregar estos referrers:

```
file://*
localhost/*
127.0.0.1/*
http://localhost/*
https://localhost/*
```

**Pasos:**
1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en tu API Key
3. En **Application restrictions**:
   - Selecciona **HTTP referrers (web sites)**
4. En **Website restrictions**, agrega:
   ```
   file://*
   localhost/*
   127.0.0.1/*
   http://localhost/*
   https://localhost/*
   http://localhost:8080/*
   http://localhost:3000/*
   ```
5. Guarda los cambios

### Opción 3: Usar Servidor Local (Mejor Práctica)

En lugar de usar `file://`, es mejor usar un servidor local:

**Con Python:**
```bash
cd /Users/moisessadovitch/Programaciones/StudioAroma
python3 -m http.server 8000
```
Luego accede a: `http://localhost:8000/formulario-aromas.html?plan=prueba`

**Con Node.js (http-server):**
```bash
npm install -g http-server
cd /Users/moisessadovitch/Programaciones/StudioAroma
http-server -p 8000
```

**Con PHP (si tienes Laravel/Sail):**
```bash
cd /Users/moisessadovitch/Programaciones/StudioAroma
php -S localhost:8000
```

Luego en Google Cloud Console, agrega:
```
http://localhost:8000/*
http://127.0.0.1:8000/*
```

### Opción 4: Para GitHub Pages (Producción)

Cuando publiques en GitHub Pages, agrega estos referrers:

```
https://shipsei.github.io/*
https://*.github.io/*
```

## Configuración Actual Recomendada

Para tu caso específico (`file:///Users/moisessadovitch/Programaciones/StudioAroma/...`):

1. **En Google Cloud Console:**
   - Application restrictions: **HTTP referrers (web sites)**
   - Website restrictions:
     ```
     file://*
     localhost/*
     127.0.0.1/*
     http://localhost/*
     https://localhost/*
     https://shipsei.github.io/*
     ```

2. **O mejor aún**, usa un servidor local y agrega:
   ```
   http://localhost:8000/*
   http://127.0.0.1:8000/*
   https://shipsei.github.io/*
   ```

## Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Busca errores relacionados con Google Maps
3. Si ves errores de "RefererNotAllowedMapError", necesitas agregar más referrers
4. Si funciona correctamente, verás "✅ Google Maps Autocomplete inicializado" en la consola

## Notas Importantes

- ⚠️ **Nunca compartas tu API Key públicamente**
- 🔒 Para producción, siempre usa restricciones de referrer
- 💰 Google Maps API tiene límites gratuitos, revisa tu uso en la consola
- 📝 Considera agregar restricciones de IP para mayor seguridad en producción
