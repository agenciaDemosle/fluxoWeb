# Fluxo - eCommerce Headless de Aires Acondicionados

Proyecto de eCommerce headless conectado a WooCommerce, con carrito inteligente que permite elegir entre "Solo equipo" o "Equipo + instalación profesional".

## Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS 3.4.17** - Estilos
- **Zustand** - State management (carrito)
- **TanStack Query** - Data fetching
- **React Router 7** - Routing
- **React Hook Form + Zod** - Formularios y validación
- **Framer Motion** - Animaciones
- **React Helmet Async** - SEO
- **WooCommerce REST API** - Backend

## Estructura del Proyecto

```
fluxoWeb/
├── src/
│   ├── api/              # WooCommerce API client
│   ├── components/       # Componentes React
│   │   ├── common/       # Botones, Badges, Spinner
│   │   ├── layout/       # Navbar, Footer, Layout
│   │   ├── product/      # ProductCard, ProductGrid
│   │   ├── cart/         # SmartCartDrawer
│   │   └── landing/      # Hero, Benefits, etc.
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Páginas principales
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilidades y tracking
│   ├── config/           # Configuración
│   └── App.tsx           # App principal
├── public/
│   ├── .htaccess         # Config Apache para SPA
│   ├── robots.txt        # SEO
│   └── sitemap.xml       # Sitemap
└── .env                  # Variables de entorno
```

## Instalación

```bash
# Clonar el repositorio
cd fluxoWeb

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tus credenciales de WooCommerce

# Iniciar servidor de desarrollo
npm run dev
```

## Variables de Entorno

Copia `.env.example` a `.env` y configura:

```env
VITE_WOO_URL=https://demosle.cl/demosle
VITE_WOO_CONSUMER_KEY=tu_consumer_key
VITE_WOO_CONSUMER_SECRET=tu_consumer_secret
VITE_INSTALLATION_EXTRA_PERCENT=0.25
```

## Características Principales

### 1. Carrito Smart
- Selector de "Solo equipo" vs "Equipo + instalación"
- Cálculo automático de totales
- Persistencia en localStorage
- Drawer lateral con resumen

### 2. Integración WooCommerce
- Productos con meta_data personalizada
- Creación de pedidos con metadata de instalación
- Soporte para variaciones
- Tracking de eventos

### 3. Checkout
- Formulario con validación Zod
- Recolección de datos de instalación
- Integración con WooCommerce orders

### 4. SEO
- React Helmet Async para meta tags
- OpenGraph y Twitter Cards
- Sitemap.xml
- robots.txt
- Schema.org (JSON-LD) listo para implementar

## WooCommerce - Campos Personalizados

Para que el carrito smart funcione correctamente, agrega estos meta_data a tus productos en WooCommerce:

```php
// En el producto:
_installation_price: 150000  // Precio de instalación
_capacity: "12000 BTU"       // Capacidad
_energy_rating: "A++"        // Clasificación energética
_inverter: "yes"             // Es inverter?
```

## Build y Deploy

### Build de Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

### Deploy en SiteGround

1. **Build del proyecto:**
   ```bash
   npm run build
   ```

2. **Subir archivos:**
   - Sube el contenido de `dist/` a la raíz de tu dominio o subdirectorio
   - Asegúrate de subir el archivo `.htaccess`

3. **Configurar .htaccess:**
   - Ya está incluido en `public/.htaccess`
   - Se copia automáticamente a `dist/` en el build

4. **Variables de entorno en producción:**
   - Las variables `VITE_*` se compilan en build time
   - No necesitas archivo `.env` en producción
   - Las credenciales quedan embebidas en el JS (solo consumer key/secret públicos)

### Estructura de Deploy

```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── .htaccess
├── robots.txt
└── sitemap.xml
```

## Comandos Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter
```

## Tracking y Analytics

El sistema de tracking está preparado para integrar:

- Google Analytics 4
- Facebook Pixel
- TikTok Pixel

Ver `src/utils/tracking.ts` para configurar.

## Próximos Pasos

- [ ] Implementar página de producto individual
- [ ] Agregar filtros y búsqueda de productos
- [ ] Integrar Calendly/Cal.com para agendamiento de instalación
- [ ] Agregar calculadora de capacidad AC
- [ ] Implementar página FAQ con acordeón
- [ ] Agregar testimonios slider
- [ ] Integrar Google Analytics 4
- [ ] Agregar más métodos de pago

## Soporte

Para issues o preguntas, contacta al equipo de desarrollo.

## Licencia

Proyecto privado - Todos los derechos reservados.
