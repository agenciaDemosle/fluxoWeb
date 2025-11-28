<?php
/**
 * Chilean Regions and Communes Data
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_Regions_Data {

    /**
     * Get all Chilean regions with communes
     */
    public static function get_regions() {
        return [
            [
                'code' => 'RM',
                'name' => 'Región Metropolitana',
                'communes' => [
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
            ],
            [
                'code' => 'I',
                'name' => 'Región de Tarapacá',
                'communes' => ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica']
            ],
            [
                'code' => 'II',
                'name' => 'Región de Antofagasta',
                'communes' => ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena']
            ],
            [
                'code' => 'III',
                'name' => 'Región de Atacama',
                'communes' => ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco']
            ],
            [
                'code' => 'IV',
                'name' => 'Región de Coquimbo',
                'communes' => ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado']
            ],
            [
                'code' => 'V',
                'name' => 'Región de Valparaíso',
                'communes' => ['Valparaíso', 'Viña del Mar', 'Concón', 'Quintero', 'Puchuncaví', 'Casablanca', 'Juan Fernández', 'San Antonio', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo', 'Algarrobo', 'Quilpué', 'Villa Alemana', 'Limache', 'Olmué', 'Quillota', 'La Calera', 'Hijuelas', 'La Cruz', 'Nogales', 'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Isla de Pascua']
            ],
            [
                'code' => 'VI',
                'name' => 'Región del Libertador Bernardo O\'Higgins',
                'communes' => ['Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa', 'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente', 'Pichilemu', 'La Estrella', 'Litueche', 'Marchihue', 'Navidad', 'Paredones', 'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz']
            ],
            [
                'code' => 'VII',
                'name' => 'Región del Maule',
                'communes' => ['Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael', 'Cauquenes', 'Chanco', 'Pelluhue', 'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén', 'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas']
            ],
            [
                'code' => 'VIII',
                'name' => 'Región del Biobío',
                'communes' => ['Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé', 'Hualpén', 'Lebu', 'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Los Álamos', 'Tirúa', 'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío', 'Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay']
            ],
            [
                'code' => 'IX',
                'name' => 'Región de La Araucanía',
                'communes' => ['Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol', 'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria']
            ],
            [
                'code' => 'XIV',
                'name' => 'Región de Los Ríos',
                'communes' => ['Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno']
            ],
            [
                'code' => 'X',
                'name' => 'Región de Los Lagos',
                'communes' => ['Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas', 'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo', 'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena']
            ],
            [
                'code' => 'XI',
                'name' => 'Región de Aysén',
                'communes' => ['Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Cochrane', 'O\'Higgins', 'Tortel', 'Chile Chico', 'Río Ibáñez']
            ],
            [
                'code' => 'XII',
                'name' => 'Región de Magallanes',
                'communes' => ['Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio', 'Cabo de Hornos', 'Antártica', 'Porvenir', 'Primavera', 'Timaukel', 'Natales', 'Torres del Paine']
            ],
            [
                'code' => 'XV',
                'name' => 'Región de Arica y Parinacota',
                'communes' => ['Arica', 'Camarones', 'Putre', 'General Lagos']
            ],
            [
                'code' => 'XVI',
                'name' => 'Región del Ñuble',
                'communes' => ['Chillán', 'Bulnes', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay', 'Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Quirihue', 'Ránquil', 'Treguaco', 'Coihueco', 'Ñiquén', 'San Carlos', 'San Fabián', 'San Nicolás']
            ]
        ];
    }

    /**
     * Get WooCommerce region code mapping
     */
    public static function get_woo_code_mapping() {
        return [
            'RM' => 'RM',     // Región Metropolitana
            'TA' => 'I',      // Tarapacá
            'AN' => 'II',     // Antofagasta
            'AT' => 'III',    // Atacama
            'CO' => 'IV',     // Coquimbo
            'VS' => 'V',      // Valparaíso
            'LI' => 'VI',     // Libertador B. O'Higgins
            'ML' => 'VII',    // Maule
            'BI' => 'VIII',   // Biobío
            'AR' => 'IX',     // Araucanía
            'LR' => 'XIV',    // Los Ríos
            'LL' => 'X',      // Los Lagos
            'AI' => 'XI',     // Aysén
            'MA' => 'XII',    // Magallanes
            'AP' => 'XV',     // Arica y Parinacota
            'NB' => 'XVI'     // Ñuble
        ];
    }

    /**
     * Get region by code
     */
    public static function get_region_by_code($code) {
        $regions = self::get_regions();
        foreach ($regions as $region) {
            if ($region['code'] === $code) {
                return $region;
            }
        }
        return null;
    }

    /**
     * Get communes for a region
     */
    public static function get_communes($region_code) {
        $region = self::get_region_by_code($region_code);
        return $region ? $region['communes'] : [];
    }
}
