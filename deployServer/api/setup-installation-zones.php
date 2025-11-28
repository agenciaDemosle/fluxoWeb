<?php
/**
 * Setup Installation Shipping Zones
 * Creates shipping zones with installation costs for Chilean regions
 */

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Load WordPress
$wp_load_paths = [
    __DIR__ . '/../demosle/wp-load.php',
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

// Configuration: Regions with installation costs
$zones_config = [
    [
        'name' => 'Región Metropolitana',
        'regions' => ['RM'],
        'installation_cost' => 150000,
    ],
    [
        'name' => 'Regiones V y VIII',
        'regions' => ['VS', 'BI'],
        'installation_cost' => 180000,
    ],
    [
        'name' => 'Regiones VI, VII, IX, XIV, X',
        'regions' => ['LI', 'ML', 'AR', 'LR', 'LL'],
        'installation_cost' => 200000,
    ],
    [
        'name' => 'Regiones III, IV',
        'regions' => ['AT', 'CO'],
        'installation_cost' => 220000,
    ],
    [
        'name' => 'Regiones I, II, XI, XII, XV',
        'regions' => ['TA', 'AN', 'AI', 'MA', 'AP'],
        'installation_cost' => 250000,
    ],
    [
        'name' => 'Región XVI (Ñuble)',
        'regions' => ['NB'],
        'installation_cost' => 200000,
    ],
];

$created_zones = [];
$errors = [];

try {
    foreach ($zones_config as $zone_config) {
        // Create zone
        $zone = new WC_Shipping_Zone();
        $zone->set_zone_name($zone_config['name']);
        $zone->set_zone_order(0);
        $zone_id = $zone->save();

        if (!$zone_id) {
            $errors[] = "Failed to create zone: {$zone_config['name']}";
            continue;
        }

        // Add locations (regions)
        $locations = [];
        foreach ($zone_config['regions'] as $region_code) {
            $locations[] = [
                'code' => 'CL:' . $region_code,
                'type' => 'state',
            ];
        }
        $zone->set_locations($locations);
        $zone->save();

        // Add Installation shipping method (Flat Rate)
        $instance_id = $zone->add_shipping_method('flat_rate');

        if ($instance_id) {
            // Get the shipping method instance
            $shipping_methods = $zone->get_shipping_methods();

            foreach ($shipping_methods as $method) {
                if ($method->instance_id == $instance_id) {
                    // Update settings
                    $settings = [
                        'title' => 'Instalación Profesional',
                        'cost' => $zone_config['installation_cost'],
                        'tax_status' => 'none',
                    ];

                    update_option(
                        'woocommerce_flat_rate_' . $instance_id . '_settings',
                        $settings
                    );
                    break;
                }
            }
        }

        $created_zones[] = [
            'id' => $zone_id,
            'name' => $zone_config['name'],
            'regions' => $zone_config['regions'],
            'installation_cost' => $zone_config['installation_cost'],
            'instance_id' => $instance_id,
        ];
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Shipping zones created successfully',
        'zones_created' => count($created_zones),
        'zones' => $created_zones,
        'errors' => $errors,
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'zones_created' => $created_zones,
        'errors' => $errors,
    ]);
}
