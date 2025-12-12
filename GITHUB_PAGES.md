# 📦 Guía para Publicar en GitHub Pages

## Paso 1: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `StudioAroma` (o el nombre que prefieras)
   - **Description**: "Sitio web de Studio Aroma - Servicio de aromatización profesional"
   - **Visibilidad**: Público (requerido para GitHub Pages gratuito)
   - **NO** marques "Initialize this repository with a README"
5. Haz clic en **"Create repository"**

## Paso 2: Conectar tu Repositorio Local con GitHub

Ejecuta estos comandos en tu terminal:

```bash
cd /Users/moisessadovitch/Programaciones/StudioAroma

# Agregar el repositorio remoto
git remote add origin https://github.com/Shipsei/StudioAroma.git

# Cambiar el nombre de la rama a main (si no lo has hecho)
git branch -M main

# Subir el código
git push -u origin main
```

## Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (Configuración)
3. En el menú lateral izquierdo, busca y haz clic en **"Pages"**
4. En la sección **"Source"**:
   - Selecciona **"Deploy from a branch"**
   - En **"Branch"**, selecciona **"main"**
   - En **"Folder"**, selecciona **"/ (root)"**
5. Haz clic en **"Save"**

## Paso 4: Esperar el Despliegue

- GitHub Pages tardará unos minutos en procesar tu sitio
- Verás un mensaje verde indicando que tu sitio está publicado
- Tu sitio estará disponible en: `https://shipsei.github.io/StudioAroma/`

## 🔄 Actualizar el Sitio

Cada vez que hagas cambios y quieras actualizar el sitio:

```bash
cd /Users/moisessadovitch/Programaciones/StudioAroma

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push origin main
```

Los cambios se reflejarán automáticamente en GitHub Pages en unos minutos.

## ⚠️ Notas Importantes

1. **Rutas de archivos**: Asegúrate de que todas las rutas en tus archivos HTML sean relativas (ej: `./styles.css` en lugar de `/styles.css`)

2. **API Local**: Si tu sitio usa una API local (`http://localhost:8080`), necesitarás:
   - Cambiar las URLs a una API pública, o
   - Usar un servicio como Netlify Functions o Vercel Functions

3. **Dominio personalizado**: Puedes agregar un dominio personalizado desde Settings > Pages

## 🐛 Solución de Problemas

- **El sitio no carga**: Verifica que el archivo `index.html` esté en la raíz del repositorio
- **Las imágenes no se ven**: Verifica que las rutas sean relativas y que las imágenes estén en el repositorio
- **Los estilos no cargan**: Verifica que los archivos CSS estén en el repositorio y las rutas sean correctas
