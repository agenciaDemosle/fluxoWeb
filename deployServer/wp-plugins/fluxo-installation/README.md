# Fluxo - Costos de Instalación ❄️

**Versión:** 1.0.0
**Autor:** Demosle
**URL:** https://demosle.cl

Plugin de WordPress/WooCommerce para gestionar costos de instalación de aires acondicionados por región en Chile.

## Características

✅ **16 regiones de Chile** con costos personalizables
✅ **Interfaz simple** para configurar precios
✅ **REST API** para integración con frontend headless
✅ **100% compatible con WooCommerce**
✅ **Diseñado específicamente para Fluxo**

## Instalación

1. Sube la carpeta `fluxo-installation` a `/wp-content/plugins/`
2. Activa el plugin desde el panel de WordPress
3. Ve a **Instalación Fluxo** en el menú de administración
4. Configura los costos de instalación por región
5. Click en **"Guardar Costos de Instalación"**

## Uso

### Configurar Costos

1. Ve a **Instalación Fluxo** en el menú lateral del admin
2. Ingresa el costo de instalación para cada región (en pesos chilenos)
3. Deja en `0` las regiones donde no ofrezcas instalación
4. Guarda los cambios

### REST API

El plugin expone un endpoint REST para obtener los costos:

**GET** `/wp-json/fluxo/v1/installation-costs`

Respuesta:
```json
{
  "success": true,
  "costs": {
    "RM": {
      "region_code": "RM",
      "region_name": "Región Metropolitana",
      "installation_cost": 50000
    },
    "V": {
      "region_code": "V",
      "region_name": "Región de Valparaíso",
      "installation_cost": 60000
    },
    ...
  }
}
```

## Integración con Frontend

Para usar los costos en tu aplicación React/Vue:

```javascript
// Obtener costos de instalación
fetch('/wp-json/fluxo/v1/installation-costs')
  .then(r => r.json())
  .then(data => {
    const costs = data.costs;
    const rmCost = costs['RM'].installation_cost; // 50000
  });
```

## Regiones Soportadas

1. **XV** - Arica y Parinacota
2. **I** - Tarapacá
3. **II** - Antofagasta
4. **III** - Atacama
5. **IV** - Coquimbo
6. **V** - Valparaíso
7. **RM** - Región Metropolitana
8. **VI** - O'Higgins
9. **VII** - Maule
10. **XVI** - Ñuble
11. **VIII** - Biobío
12. **IX** - La Araucanía
13. **XIV** - Los Ríos
14. **X** - Los Lagos
15. **XI** - Aysén
16. **XII** - Magallanes

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

Desarrollado con ❤️ por [Demosle](https://demosle.cl) para [Fluxo](https://fluxo.cl)
