# Sistema Envíos Chile by Demosle

**Versión:** 1.0.0
**Autor:** Demosle
**URL:** https://demosle.cl

Plugin de WordPress/WooCommerce para gestionar zonas de envío en Chile con 340+ comunas organizadas en 16 regiones.

## Características

✅ **340+ comunas chilenas** organizadas en 16 regiones
✅ **Configuración rápida** con un solo click
✅ **Importador CSV** para costos personalizados
✅ **REST API** para integración con headless/frontend
✅ **Costos de envío personalizables** por región
✅ **100% compatible con WooCommerce**

## Instalación

1. Sube la carpeta `chilean-shipping-installation` a `/wp-content/plugins/`
2. Activa el plugin desde el panel de WordPress
3. Ve a **Envíos Chile** en el menú de administración
4. Click en **"Configurar Zonas Automáticamente"**
5. ¡Listo!

## Uso

### Configuración Rápida

La forma más fácil de empezar es usar la configuración automática:

1. Ve a **Envíos Chile** en el menú
2. Ingresa los costos de envío para cada zona
3. Click en **"Configurar Zonas Automáticamente"**
4. Esto creará 6 zonas con los costos personalizados

### Importar desde CSV

Si tienes costos personalizados:

1. Ve a **Envíos Chile → Importar CSV**
2. Descarga la plantilla CSV
3. Llena los costos de envío
4. Sube el archivo

### REST API Endpoints

El plugin expone endpoints REST para integración:

**GET** `/wp-json/csi/v1/shipping-zones`
Obtiene todas las zonas con costos de envío

```json
{
  "success": true,
  "regions": [...],
  "shipping_zones": [...]
}
```

**GET** `/wp-json/csi/v1/regions`
Obtiene regiones y comunas de Chile

**POST** `/wp-json/csi/v1/create-zones` (admin only)
Crea zonas programáticamente

**DELETE** `/wp-json/csi/v1/delete-zones` (admin only)
Elimina todas las zonas

## Precios Sugeridos

Los precios de envío sugeridos son (totalmente personalizables):

- **Región Metropolitana:** Gratis
- **Regiones V y VIII:** $5.000
- **Regiones VI, VII, IX, XIV, X:** $8.000
- **Regiones III, IV:** $10.000
- **Regiones I, II, XI, XII, XV:** $15.000
- **Región XVI (Ñuble):** $8.000

## Formato CSV

```csv
region,nombre_zona,costo_envio
RM,Región Metropolitana,0
VS,Valparaíso,5000
BI,Biobío,5000
```

## Estructura del Plugin

```
chilean-shipping-installation/
├── chilean-shipping-installation.php  # Main plugin file
├── includes/
│   ├── regions-data.php              # Chilean regions & communes
│   ├── zone-creator.php              # Zone creation logic
│   └── api-endpoints.php             # REST API
├── admin/
│   ├── settings-page.php             # Main settings page
│   ├── csv-importer.php              # CSV import page
│   └── zone-manager.php              # Zone management page
├── templates/
│   └── shipping-template.csv         # CSV template
└── assets/
    ├── css/admin.css
    └── js/admin.js
```

## Requisitos

- WordPress 5.8+
- WooCommerce 5.0+
- PHP 7.4+

## Soporte

Para soporte o consultas:
- Web: https://demosle.cl
- Email: contacto@demosle.cl

## Licencia

GPL v2 or later

---

Desarrollado con ❤️ por [Demosle](https://demosle.cl)
