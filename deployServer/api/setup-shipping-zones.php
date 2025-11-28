<?php
/**
 * Setup Shipping Zones for Chile in WooCommerce
 * Creates shipping zones for all regions of Chile
 *
 * Run this script ONCE to setup shipping zones in WooCommerce
 * Access: https://yourdomain.com/api/setup-shipping-zones.php
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

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
if (!function_exists('WC') || !class_exists('WC_Shipping_Zones')) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'WooCommerce not found']);
    exit;
}

// Regions of Chile with their communes
$chile_regions = [
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

// Setup cost for shipping (you can modify these)
$default_shipping_cost = 5000; // CLP

$results = [];
$created_zones = 0;
$existing_zones = 0;

try {
    // Get existing zones to avoid duplicates
    $existing_zones_data = WC_Shipping_Zones::get_zones();
    $existing_zone_names = array_column($existing_zones_data, 'zone_name');

    foreach ($chile_regions as $region) {
        $zone_name = $region['name'];

        // Check if zone already exists
        if (in_array($zone_name, $existing_zone_names)) {
            $results[] = "Zone '{$zone_name}' already exists, skipping...";
            $existing_zones++;
            continue;
        }

        // Create new shipping zone
        $zone = new WC_Shipping_Zone();
        $zone->set_zone_name($zone_name);
        $zone->set_zone_order(0);
        $zone->save();

        // Add region location to zone
        $zone->add_location('CL:' . $region['code'], 'state');
        $zone->save();

        // Add flat rate shipping method
        $instance_id = $zone->add_shipping_method('flat_rate');

        // Configure flat rate settings
        if ($instance_id) {
            update_option('woocommerce_flat_rate_' . $instance_id . '_settings', [
                'title' => 'Envío Standard',
                'tax_status' => 'taxable',
                'cost' => $default_shipping_cost,
            ]);
        }

        // Add free shipping method for orders over certain amount
        $free_shipping_id = $zone->add_shipping_method('free_shipping');
        if ($free_shipping_id) {
            update_option('woocommerce_free_shipping_' . $free_shipping_id . '_settings', [
                'title' => 'Envío Gratis',
                'requires' => 'min_amount',
                'min_amount' => 100000, // Free shipping for orders over 100,000 CLP
            ]);
        }

        $results[] = "Created zone: {$zone_name} (ID: {$zone->get_id()}) with {count($region['communes'])} communes";
        $created_zones++;
    }

    // Also register Chile states in WooCommerce if not already done
    $countries = WC()->countries;
    $chile_states_data = [];
    foreach ($chile_regions as $region) {
        $chile_states_data[$region['code']] = $region['name'];
    }

    // This will make regions available in checkout dropdowns
    add_filter('woocommerce_states', function($states) use ($chile_states_data) {
        $states['CL'] = $chile_states_data;
        return $states;
    });

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => "Shipping zones setup completed",
        'created' => $created_zones,
        'existing' => $existing_zones,
        'total_regions' => count($chile_regions),
        'details' => $results
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    error_log("[Setup Shipping Zones] Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
