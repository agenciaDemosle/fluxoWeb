# Guía de Deployment - Fluxo eCommerce

## Pre-Deployment Checklist

### 1. Variables de Entorno
Asegúrate de que el archivo `.env` tiene las credenciales correctas de WooCommerce:

```env
VITE_WOO_URL=https://demosle.cl/demosle
VITE_WOO_CONSUMER_KEY=ck_e97648a1de2670871c70fc1a0431eecb67882cd6
VITE_WOO_CONSUMER_SECRET=cs_4d0de286448424ac211b8a40d83a3cadcbef5633
```

### 2. Build de Producción

```bash
npm run build
```

Este comando genera la carpeta `dist/` con:
- `index.html`
- `assets/` (JS, CSS, imágenes)
- `.htaccess` (para Apache/SiteGround)
- `robots.txt`
- `sitemap.xml`

### 3. Verificar el Build Localmente

```bash
npm run preview
```

Abre http://localhost:4173 y verifica que:
- La navegación funciona correctamente
- Los productos se cargan desde WooCommerce
- El carrito funciona
- El checkout se puede completar

## Deployment en SiteGround

### Opción A: FTP/SFTP

1. Conectar vía FTP/SFTP a tu servidor SiteGround
2. Navegar a `public_html/` o tu subdirectorio deseado
3. Subir **todo el contenido** de la carpeta `dist/`:
   - `index.html`
   - carpeta `assets/`
   - `.htaccess`
   - `robots.txt`
   - `sitemap.xml`

### Opción B: File Manager de SiteGround

1. Acceder al cPanel de SiteGround
2. Abrir File Manager
3. Navegar a `public_html/`
4. Subir archivos de `dist/` (puedes comprimir en .zip primero)
5. Si subiste .zip, extraer en el servidor

### Estructura Final en Servidor

```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [otras assets]
├── .htaccess
├── robots.txt
└── sitemap.xml
```

## Post-Deployment

### 1. Verificar .htaccess

El archivo `.htaccess` debe estar en la raíz y contener las reglas para SPA:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### 2. Actualizar sitemap.xml

Edita `/sitemap.xml` con tu dominio real:

```xml
<loc>https://fluxo.cl/</loc>
```

### 3. Probar la Integración WooCommerce

1. Visita tu sitio: `https://fluxo.cl` o `https://franciscal51.sg-host.com`
2. Verifica que los productos se cargan
3. Agrega un producto al carrito
4. Completa un pedido de prueba
5. Verifica que el pedido aparece en WooCommerce admin

### 4. Configurar Productos en WooCommerce

Para que el carrito smart funcione correctamente, agrega estos campos personalizados a tus productos:

1. Ve a WooCommerce → Productos
2. Edita un producto
3. En "Custom Fields", agrega:

```
_installation_price: 150000
_capacity: "12000 BTU"
_energy_rating: "A++"
_inverter: "yes"
```

## Troubleshooting

### Problema: Rutas no funcionan (404 en refresh)

**Solución**: Verifica que `.htaccess` está en la raíz y tiene las reglas de rewrite.

### Problema: Productos no cargan

**Solución**:
1. Verifica las credenciales de WooCommerce en `.env`
2. Confirma que la API REST está habilitada en WooCommerce
3. Revisa la consola del navegador para errores CORS

### Problema: CORS errors

**Solución**: En tu WordPress, instala el plugin "WP REST API Controller" o agrega esto a `wp-config.php`:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
```

### Problema: Estilos no cargan

**Solución**: Verifica que las rutas de assets son correctas. Vite genera hashes en los nombres.

## Optimizaciones Recomendadas

### 1. Caché del Navegador

El `.htaccess` ya incluye reglas de caché. Verifica que Apache tiene mod_expires habilitado.

### 2. Compresión

El `.htaccess` incluye compresión Gzip/Brotli. Verifica que están habilitados en Apache.

### 3. CDN (Opcional)

Considera usar Cloudflare para:
- CDN global
- Caché de assets
- Protección DDoS
- SSL gratuito

### 4. Imagen Optimización

Las imágenes de productos vienen de WooCommerce. Considera:
- Plugin de optimización de imágenes en WordPress
- WebP conversion
- Lazy loading (ya implementado en ProductCard)

## Actualizaciones Futuras

Para actualizar el sitio:

```bash
# 1. Hacer cambios en el código
# 2. Build
npm run build

# 3. Subir solo el contenido de dist/ al servidor
# NO borres .htaccess si hiciste cambios manuales
```

## Monitoreo

### Analytics
El proyecto está preparado para GA4/GTM. Ver `src/utils/tracking.ts` para configurar.

### Errores
Considera integrar Sentry para monitoreo de errores:

```bash
npm install @sentry/react
```

## Contacto y Soporte

Para issues técnicos, consulta:
- README.md
- GitHub Issues
- Equipo de desarrollo

---

**Última actualización**: Noviembre 14, 2025
