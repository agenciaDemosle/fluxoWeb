# Demosle Pay

Plugin simple de WordPress para configurar datos bancarios chilenos y exponerlos vía API REST.

## Características

- ✅ Panel de administración simple e intuitivo
- ✅ Configuración de datos bancarios chilenos
- ✅ API REST pública para consumir desde frontend
- ✅ Bancos chilenos pre-configurados
- ✅ Soporte para WhatsApp y Email
- ✅ Sin dependencias

## Instalación

1. Sube el plugin a `/wp-content/plugins/demosle-pay/`
2. Activa el plugin desde el panel de WordPress
3. Ve a "Demosle Pay" en el menú lateral
4. Configura tus datos bancarios

## API Endpoint

```
GET /wp-json/demosle-pay/v1/bank-details
```

### Respuesta de ejemplo:

```json
{
  "success": true,
  "bank_details": {
    "bank_name": "Banco de Chile",
    "account_type": "Cuenta Corriente",
    "account_number": "12345678-9",
    "account_holder": "Mi Empresa SpA",
    "rut": "76.XXX.XXX-X",
    "email": "pagos@miempresa.cl",
    "phone": "+56912345678",
    "instructions": "Por favor realiza la transferencia y envíanos el comprobante."
  }
}
```

## Uso en Frontend

```javascript
fetch('https://tudominio.com/wp-json/demosle-pay/v1/bank-details')
  .then(response => response.json())
  .then(data => {
    const bankDetails = data.bank_details;
    console.log(bankDetails);
  });
```

## Changelog

### 1.0.0
- Versión inicial
- Panel de administración
- Endpoint API REST
- Soporte para datos bancarios chilenos
