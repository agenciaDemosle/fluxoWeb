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
} as const;
