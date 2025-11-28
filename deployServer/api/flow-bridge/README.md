# Flow Bridge API - FluxoWeb

Este API actúa como puente entre el frontend React headless de FluxoWeb y Flow para procesar pagos.

## 🎯 ¿Cómo funciona?

1. Usuario completa el checkout en React
2. React crea la orden en WooCommerce
3. React llama al bridge de Flow (`process-flow-payment.php`)
4. El bridge crea el pago en Flow y retorna la URL de pago
5. Usuario es redirigido a Flow para pagar
6. Flow confirma el pago llamando a `confirm-payment.php`
7. Usuario es redirigido a la página de gracias

## 📋 Configuración

### 1. Obtener credenciales de Flow

1. Ve a [https://www.flow.cl/](https://www.flow.cl/)
2. Regístrate o inicia sesión
3. En tu panel, ve a **Configuración → API**
4. Copia:
   - API Key
   - Secret Key

### 2. Configurar los archivos PHP

Edita `process-flow-payment.php` y `confirm-payment.php` en las líneas 37-39:

```php
// Reemplaza estos valores con tus credenciales de Flow
$flowApiKey = 'TU_FLOW_API_KEY';
$flowSecretKey = 'TU_FLOW_SECRET_KEY';
$flowApiUrl = 'https://www.flow.cl/api'; // Producción
```

**Para pruebas (sandbox):**
```php
$flowApiUrl = 'https://sandbox.flow.cl/api';
```

### 3. Subir al servidor

Sube la carpeta `flow-bridge` a tu servidor en:
```
/tu-dominio/api/flow-bridge/
```

El endpoint estará disponible en:
```
https://tudominio.com/api/flow-bridge/process-flow-payment.php
```

### 4. Configurar el frontend

En tu archivo `.env` de React:

```env
VITE_FLOW_BRIDGE_URL=https://tudominio.com/api/flow-bridge/process-flow-payment.php
```

## 🔒 Seguridad

- ✅ Las credenciales de Flow NO están en el frontend
- ✅ Las credenciales están solo en el servidor PHP
- ✅ CORS está configurado para permitir requests desde tu dominio
- ✅ Flow valida el signature de cada request

## 🧪 Testing

### Credenciales de prueba (Sandbox)

Flow proporciona credenciales de sandbox para pruebas. Contacta con Flow para obtenerlas.

### Tarjetas de prueba

En modo sandbox, Flow proporciona tarjetas de prueba que puedes usar.

## 📤 Deploy

1. Asegúrate de tener las credenciales de producción de Flow
2. Configura `$flowApiUrl = 'https://www.flow.cl/api';` en producción
3. Sube los archivos PHP a tu servidor
4. Verifica que el endpoint esté accesible
5. Prueba con una orden real

## 🆘 Debugging

### Ver logs

```bash
# En tu servidor, revisa los logs de PHP
tail -f /var/log/php/error.log

# O si usas Apache
tail -f /var/log/apache2/error_log
```

### Errores comunes

**"Flow API error"**: Verifica tus credenciales de Flow

**"Missing required fields"**: Asegúrate de enviar `orderId`, `amount`, y `email`

**"cURL error"**: Verifica que tu servidor tenga cURL habilitado y pueda hacer requests HTTPS

## 📝 Integración con React

En tu hook `useCheckout.ts`:

```typescript
// Detectar si el método de pago es Flow
if (paymentMethod === 'flow') {
  // Llamar al bridge de Flow
  const flowResponse = await fetch(env.flowBridgeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: order.id,
      amount: grandTotal,
      email: formData.email,
      customerName: `${formData.firstName} ${formData.lastName}`
    })
  });

  const flowData = await flowResponse.json();

  if (flowData.success && flowData.redirect) {
    // Redirigir a Flow
    window.location.href = flowData.redirect;
  }
}
```

## 🌐 URLs importantes

- **Flow Producción**: https://www.flow.cl/api
- **Flow Sandbox**: https://sandbox.flow.cl/api
- **Documentación Flow**: https://www.flow.cl/docs/api.html
