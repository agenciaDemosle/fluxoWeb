export const env = {
  // WooCommerce
  woo: {
    url: import.meta.env.VITE_WOO_URL || '',
    consumerKey: import.meta.env.VITE_WOO_CONSUMER_KEY || '',
    consumerSecret: import.meta.env.VITE_WOO_CONSUMER_SECRET || '',
  },

  // Site
  site: {
    name: import.meta.env.VITE_SITE_NAME || 'Fluxo',
    url: import.meta.env.VITE_SITE_URL || 'https://fluxo.cl',
    description:
      import.meta.env.VITE_SITE_DESCRIPTION ||
      'Aires acondicionados con instalación profesional en Chile',
  },

  // Installation
  installation: {
    extraPercent: parseFloat(
      import.meta.env.VITE_INSTALLATION_EXTRA_PERCENT || '0.25'
    ),
  },

  // Contact
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE || '+56912345678',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'contacto@fluxo.cl',
    whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || '56912345678',
  },

  // Social Media
  social: {
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '',
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || '',
    tiktok: import.meta.env.VITE_SOCIAL_TIKTOK || '',
    youtube: import.meta.env.VITE_SOCIAL_YOUTUBE || '',
  },

  // API Endpoints
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://fluxoclima.cl/api',
    shippingZones: import.meta.env.VITE_SHIPPING_ZONES_URL || 'https://fluxoclima.cl/api/get-shipping-zones.php',
    flowBridge: import.meta.env.VITE_FLOW_BRIDGE_URL || 'https://fluxoclima.cl/api/flow-bridge/process-flow-payment.php',
    bankDetails: import.meta.env.VITE_BANK_DETAILS_URL || 'https://franciscal57.sg-host.com/demosle/wp-json/demosle-pay/v1/bank-details',
    installationCosts: import.meta.env.VITE_INSTALLATION_COSTS_URL || 'https://franciscal57.sg-host.com/demosle/wp-json/fluxo/v1/installation-costs',
  },
} as const;
