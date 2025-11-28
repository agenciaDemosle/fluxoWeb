import { useQuery } from '@tanstack/react-query';
import { env } from '../config/env';

interface Region {
  code: string;
  name: string;
  communes: string[];
}

interface ShippingZone {
  id: number;
  name: string;
  regions: string[];
  postcodes?: string[];
  shipping_cost?: number;
  installation_cost?: number;
  shipping_methods?: Array<{
    instance_id: number;
    title: string;
    cost: number;
  }>;
}

interface ShippingZonesResponse {
  success: boolean;
  regions: Region[];
  shipping_zones: ShippingZone[];
}

// Fallback data for when API is not available
const fallbackRegions: Region[] = [
  {
    code: 'RM',
    name: 'Región Metropolitana',
    communes: [
      'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea',
      'Ñuñoa', 'La Reina', 'Macul', 'Peñalolén', 'La Florida', 'San Joaquín',
      'La Granja', 'La Pintana', 'San Ramón', 'San Miguel', 'La Cisterna',
      'El Bosque', 'Pedro Aguirre Cerda', 'Lo Espejo', 'Estación Central',
      'Cerrillos', 'Maipú', 'Quinta Normal', 'Lo Prado', 'Pudahuel',
      'Cerro Navia', 'Renca', 'Quilicura', 'Conchalí', 'Huechuraba',
      'Recoleta', 'Independencia', 'San Bernardo', 'Puente Alto', 'Pirque',
      'San José de Maipo', 'Colina', 'Lampa', 'Til Til', 'Melipilla',
      'Alhué', 'Curacaví', 'María Pinto', 'San Pedro', 'Talagante',
      'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor', 'Buin',
      'Calera de Tango', 'Paine'
    ]
  },
  {
    code: 'V',
    name: 'Región de Valparaíso',
    communes: ['Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví', 'Casablanca', 'Juan Fernández', 'San Antonio', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'Algarrobo', 'Quilpué', 'Villa Alemana', 'Limache', 'Olmué', 'Quillota', 'La Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Isla de Pascua']
  },
  {
    code: 'VIII',
    name: 'Región del Biobío',
    communes: ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío', 'Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay']
  }
];

export const useShippingZones = () => {
  return useQuery({
    queryKey: ['shipping-zones'],
    queryFn: async (): Promise<ShippingZonesResponse> => {
      try {
        console.log('🌐 Fetching shipping zones from:', env.api.shippingZones);
        const response = await fetch(env.api.shippingZones);
        console.log('📡 Response status:', response.status, response.ok);

        if (!response.ok) {
          // Use fallback data if API fails
          console.warn('Shipping zones API not available, using fallback data');
          return {
            success: true,
            regions: fallbackRegions,
            shipping_zones: []
          };
        }

        const data = await response.json();
        return data;
      } catch (error) {
        // Use fallback data on network error
        console.warn('Shipping zones API error, using fallback data:', error);
        return {
          success: true,
          regions: fallbackRegions,
          shipping_zones: []
        };
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour - regions don't change often
    retry: 0, // Don't retry, use fallback immediately
  });
};

export type { Region, ShippingZone, ShippingZonesResponse };
