<?php
/**
 * Get Shipping Zones from WooCommerce
 * Returns regions and communes configured in WooCommerce shipping zones
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load WordPress
$wp_load_paths = [
    __DIR__ . '/../demosle/wp-load.php',           // From /api/ to /demosle/
    $_SERVER['DOCUMENT_ROOT'] . '/demosle/wp-load.php',
    __DIR__ . '/../../demosle/wp-load.php',
];

$wp_loaded = false;
foreach ($wp_load_paths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $wp_loaded = true;
        break;
    }
}

if (!$wp_loaded) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not load WordPress']);
    exit;
}

// Check WooCommerce is active
if (!function_exists('WC')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'WooCommerce not found']);
    exit;
}

// Get Chile states (regions) from WooCommerce
$chile_states = WC()->countries->get_states('CL');

// Format regions for frontend
$regions = [];
if ($chile_states && is_array($chile_states)) {
    foreach ($chile_states as $code => $name) {
        $regions[] = [
            'code' => $code,
            'name' => $name
        ];
    }
}

// Mapeo de códigos ISO de WooCommerce a nuestros códigos
$code_mapping = [
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

// Complete list of Chile regions with communes
$chile_regions_complete = [
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

// If WooCommerce doesn't have Chile states configured, use complete list
if (empty($regions)) {
    $regions = array_map(function($region) {
        return [
            'code' => $region['code'],
            'name' => $region['name'],
            'communes' => $region['communes']
        ];
    }, $chile_regions_complete);
} else {
    // Add communes to existing regions
    $regions = array_map(function($region) use ($chile_regions_complete, $code_mapping) {
        // WooCommerce uses codes like "CL-RM", we need to extract "RM"
        $woo_code = str_replace('CL-', '', $region['code']);

        // Map to our internal code (e.g., "TA" -> "I", "AN" -> "II")
        $internal_code = isset($code_mapping[$woo_code]) ? $code_mapping[$woo_code] : $woo_code;

        // Find matching region in complete list
        foreach ($chile_regions_complete as $complete_region) {
            if ($complete_region['code'] === $internal_code) {
                $region['communes'] = $complete_region['communes'];
                break;
            }
        }
        return $region;
    }, $regions);
}

// Get shipping zones with methods and costs
$shipping_zones = WC_Shipping_Zones::get_zones();
$zone_data = [];

foreach ($shipping_zones as $zone) {
    $zone_obj = new WC_Shipping_Zone($zone['id']);
    $zone_locations = $zone_obj->get_zone_locations();
    $shipping_methods = $zone_obj->get_shipping_methods();

    $zone_info = [
        'id' => $zone['id'],
        'name' => $zone['zone_name'],
        'regions' => [],
        'postcodes' => [],
        'shipping_methods' => [],
        'installation_cost' => null
    ];

    // Extract locations
    foreach ($zone_locations as $location) {
        if ($location->type === 'state') {
            // Extract region code from "CL:RM" format
            $parts = explode(':', $location->code);
            if (count($parts) === 2 && $parts[0] === 'CL') {
                $zone_info['regions'][] = $parts[1];
            }
        } elseif ($location->type === 'postcode') {
            $zone_info['postcodes'][] = $location->code;
        }
    }

    // Extract shipping methods and look for installation
    foreach ($shipping_methods as $method) {
        if ($method->enabled === 'yes') {
            $method_data = [
                'id' => $method->id,
                'method_id' => $method->id,
                'title' => $method->title,
                'enabled' => true
            ];

            // If it's flat_rate, get the cost
            if ($method->id === 'flat_rate') {
                $settings = $method->instance_settings;
                if (isset($settings['cost'])) {
                    $method_data['cost'] = floatval($settings['cost']);
                }

                // Check if this is for installation (by title)
                $title_lower = strtolower($method->title);
                if (strpos($title_lower, 'instalacion') !== false ||
                    strpos($title_lower, 'instalación') !== false) {
                    $zone_info['installation_cost'] = floatval($settings['cost'] ?? 0);
                }
            }

            $zone_info['shipping_methods'][] = $method_data;
        }
    }

    $zone_data[] = $zone_info;
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'regions' => $regions,
    'shipping_zones' => $zone_data
]);
