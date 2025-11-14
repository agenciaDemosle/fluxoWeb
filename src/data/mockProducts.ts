import type { Product } from '../types';

// Productos mock de aires acondicionados con imágenes de Unsplash
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Split Inverter 12000 BTU Samsung WindFree',
    slug: 'split-inverter-12000-samsung-windfree',
    description: 'Aire acondicionado Split con tecnología WindFree que distribuye el aire de manera uniforme sin corrientes directas. Cuenta con filtro PM1.0 que purifica el aire eliminando hasta el 99% de partículas ultrafinas. Diseño elegante y silencioso ideal para dormitorios y living.',
    shortDescription: 'Split 12000 BTU con tecnología WindFree y purificación de aire',
    price: 449990,
    regularPrice: 549990,
    salePrice: 449990,
    onSale: true,
    imageUrl: '/images/equipo_aire.jpg',
    images: [
      '/images/equipo_aire.jpg',
      '/images/equipo_aire2.jpg',
    ],
    sku: 'AC-SAMSUNG-12K-WF',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 1, name: 'Split Muro', slug: 'split-muro' }],
    attributes: [
      { name: 'Tipo', options: ['Split'] },
      { name: 'Potencia', options: ['12000 BTU'] },
    ],
    capacity: '12000 BTU (1 Tonelada)',
    energyRating: 'A++',
    inverter: true,
    installationPrice: 120000,
    featured: true,
    averageRating: '4.8',
    ratingCount: 124,
  },
  {
    id: 2,
    name: 'Split Inverter 18000 BTU LG Dual Cool',
    slug: 'split-inverter-18000-lg-dual-cool',
    description: 'Potente aire acondicionado de 18000 BTU con tecnología Dual Inverter que enfría más rápido y ahorra hasta 70% de energía. Sistema de purificación de aire con filtro de protección Gold Fin y función auto limpieza. Perfecto para espacios grandes hasta 40m².',
    shortDescription: 'Split 18000 BTU con Dual Inverter y purificador de aire',
    price: 629990,
    regularPrice: 629990,
    onSale: false,
    imageUrl: '/images/equipo_aire2.jpg',
    images: [
      '/images/equipo_aire2.jpg',
      '/images/equipo_aire.jpg',
    ],
    sku: 'AC-LG-18K-DC',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 1, name: 'Split Muro', slug: 'split-muro' }],
    attributes: [
      { name: 'Tipo', options: ['Split'] },
      { name: 'Potencia', options: ['18000 BTU'] },
    ],
    capacity: '18000 BTU (1.5 Toneladas)',
    energyRating: 'A+++',
    inverter: true,
    installationPrice: 150000,
    featured: true,
    averageRating: '4.9',
    ratingCount: 89,
  },
  {
    id: 3,
    name: 'Split Inverter 9000 BTU Midea',
    slug: 'split-inverter-9000-midea',
    description: 'Aire acondicionado compacto ideal para habitaciones de hasta 20m². Tecnología Inverter que reduce el consumo eléctrico hasta en 60%. Sistema de filtración multi-etapa y función deshumidificador. Bajo nivel de ruido (solo 19dB en modo nocturno).',
    shortDescription: 'Split compacto 9000 BTU ultrasilencioso',
    price: 329990,
    regularPrice: 389990,
    salePrice: 329990,
    onSale: true,
    imageUrl: '/images/equipo_aire.jpg',
    images: [
      '/images/equipo_aire.jpg',
      '/images/equipo_aire2.jpg',
    ],
    sku: 'AC-MIDEA-9K',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 1, name: 'Split Muro', slug: 'split-muro' }],
    attributes: [
      { name: 'Tipo', options: ['Split'] },
      { name: 'Potencia', options: ['9000 BTU'] },
    ],
    capacity: '9000 BTU (0.75 Toneladas)',
    energyRating: 'A+',
    inverter: true,
    installationPrice: 100000,
    featured: true,
    averageRating: '4.6',
    ratingCount: 156,
  },
  {
    id: 4,
    name: 'Split Inverter 24000 BTU Daikin Premium',
    slug: 'split-inverter-24000-daikin-premium',
    description: 'Aire acondicionado de alta gama con tecnología japonesa Daikin. 24000 BTU de potencia para espacios amplios. Sensor inteligente Coanda que distribuye el aire eficientemente. Filtro Flash Streamer que elimina virus y bacterias. Conectividad WiFi incluida.',
    shortDescription: 'Split premium 24000 BTU con WiFi y sensor inteligente',
    price: 899990,
    regularPrice: 899990,
    onSale: false,
    imageUrl: '/images/equipo_aire2.jpg',
    images: [
      '/images/equipo_aire2.jpg',
      '/images/equipo_aire.jpg',
    ],
    sku: 'AC-DAIKIN-24K-PR',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 1, name: 'Split Muro', slug: 'split-muro' }],
    attributes: [
      { name: 'Tipo', options: ['Split'] },
      { name: 'Potencia', options: ['24000 BTU'] },
      { name: 'WiFi', options: ['Sí'] },
    ],
    capacity: '24000 BTU (2 Toneladas)',
    energyRating: 'A+++',
    inverter: true,
    installationPrice: 180000,
    featured: true,
    averageRating: '5.0',
    ratingCount: 67,
  },
  {
    id: 5,
    name: 'Aire Portátil 10000 BTU Electrolux',
    slug: 'aire-portatil-10000-electrolux',
    description: 'Aire acondicionado portátil sin instalación. Perfecto para arriendos o espacios temporales. 3 en 1: enfría, deshumidifica y ventila. Ruedas para fácil movilidad. Kit de ventana incluido. Control remoto y temporizador 24 horas.',
    shortDescription: 'Aire portátil sin instalación, listo para usar',
    price: 279990,
    regularPrice: 279990,
    onSale: false,
    imageUrl: '/images/equipo_aire.jpg',
    images: [
      '/images/equipo_aire.jpg',
      '/images/equipo_aire2.jpg',
    ],
    sku: 'AC-ELUX-PORT-10K',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 3, name: 'Portátiles', slug: 'portatiles' }],
    attributes: [
      { name: 'Tipo', options: ['Portátil'] },
      { name: 'Potencia', options: ['10000 BTU'] },
    ],
    capacity: '10000 BTU',
    energyRating: 'A',
    inverter: false,
    installationPrice: 0, // No requiere instalación
    featured: false,
    averageRating: '4.3',
    ratingCount: 92,
  },
  {
    id: 6,
    name: 'Ventana 12000 BTU Carrier',
    slug: 'ventana-12000-carrier',
    description: 'Aire acondicionado de ventana tradicional, ideal para instalación en muros o ventanas. Tecnología mecánica confiable. 3 velocidades de ventilador. Termostato ajustable. Rejillas direccionales. Bajo consumo eléctrico.',
    shortDescription: 'AC de ventana clásico y económico',
    price: 249990,
    regularPrice: 299990,
    salePrice: 249990,
    onSale: true,
    imageUrl: '/images/equipo_aire2.jpg',
    images: [
      '/images/equipo_aire2.jpg',
      '/images/equipo_aire.jpg',
    ],
    sku: 'AC-CARRIER-WIN-12K',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 2, name: 'Ventana', slug: 'ventana' }],
    attributes: [
      { name: 'Tipo', options: ['Ventana'] },
      { name: 'Potencia', options: ['12000 BTU'] },
    ],
    capacity: '12000 BTU',
    energyRating: 'B',
    inverter: false,
    installationPrice: 80000,
    featured: false,
    averageRating: '4.4',
    ratingCount: 203,
  },
  {
    id: 7,
    name: 'Split Piso Techo 36000 BTU Fujitsu',
    slug: 'split-piso-techo-36000-fujitsu',
    description: 'Aire acondicionado comercial de piso-techo para grandes espacios. 36000 BTU de potencia. Distribución de aire en 4 direcciones. Ideal para oficinas, restaurantes y locales comerciales. Tecnología Inverter silenciosa. Instalación profesional incluida.',
    shortDescription: 'AC comercial piso-techo para grandes espacios',
    price: 1299990,
    regularPrice: 1299990,
    onSale: false,
    imageUrl: '/images/equipo_aire.jpg',
    images: [
      '/images/equipo_aire.jpg',
      '/images/equipo_aire2.jpg',
    ],
    sku: 'AC-FUJITSU-PC-36K',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 4, name: 'Piso-Techo', slug: 'piso-techo' }],
    attributes: [
      { name: 'Tipo', options: ['Piso-Techo'] },
      { name: 'Potencia', options: ['36000 BTU'] },
      { name: 'Uso', options: ['Comercial'] },
    ],
    capacity: '36000 BTU (3 Toneladas)',
    energyRating: 'A++',
    inverter: true,
    installationPrice: 250000,
    featured: true,
    averageRating: '4.7',
    ratingCount: 34,
  },
  {
    id: 8,
    name: 'Split Inverter 15000 BTU Mabe',
    slug: 'split-inverter-15000-mabe',
    description: 'Aire acondicionado Split de fabricación latinoamericana. 15000 BTU ideales para espacios de 25-30m². Tecnología Inverter con ahorro energético. Filtro antibacterial y modo Sleep. Diseño moderno color blanco. Garantía extendida disponible.',
    shortDescription: 'Split 15000 BTU con tecnología Inverter',
    price: 479990,
    regularPrice: 529990,
    salePrice: 479990,
    onSale: true,
    imageUrl: '/images/equipo_aire2.jpg',
    images: [
      '/images/equipo_aire2.jpg',
      '/images/equipo_aire.jpg',
    ],
    sku: 'AC-MABE-15K',
    stockStatus: 'instock',
    inStock: true,
    categories: [{ id: 1, name: 'Split Muro', slug: 'split-muro' }],
    attributes: [
      { name: 'Tipo', options: ['Split'] },
      { name: 'Potencia', options: ['15000 BTU'] },
    ],
    capacity: '15000 BTU (1.25 Toneladas)',
    energyRating: 'A+',
    inverter: true,
    installationPrice: 130000,
    featured: false,
    averageRating: '4.5',
    ratingCount: 78,
  },
];

// Función para obtener productos filtrados
export const getFilteredProducts = (params?: {
  featured?: boolean;
  on_sale?: boolean;
  category?: number;
  limit?: number;
}): Product[] => {
  let filtered = [...mockProducts];

  if (params?.featured) {
    filtered = filtered.filter(p => p.featured);
  }

  if (params?.on_sale) {
    filtered = filtered.filter(p => p.onSale);
  }

  if (params?.category) {
    filtered = filtered.filter(p =>
      p.categories.some(cat => cat.id === params.category)
    );
  }

  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }

  return filtered;
};

// Función para obtener un producto por slug
export const getProductBySlug = (slug: string): Product | null => {
  return mockProducts.find(p => p.slug === slug) || null;
};

// Función para obtener un producto por ID
export const getProductById = (id: number): Product | null => {
  return mockProducts.find(p => p.id === id) || null;
};
