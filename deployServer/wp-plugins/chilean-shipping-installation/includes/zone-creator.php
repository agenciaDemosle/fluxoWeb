<?php
/**
 * Zone Creator
 * Creates and manages WooCommerce shipping zones
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_Zone_Creator {

    /**
     * Map WooCommerce region codes to traditional Chilean region codes
     */
    private static function get_wc_to_chile_region_map() {
        return [
            'RM' => 'RM',  // Región Metropolitana
            'TA' => 'I',   // Tarapacá
            'AN' => 'II',  // Antofagasta
            'AT' => 'III', // Atacama
            'CO' => 'IV',  // Coquimbo
            'VS' => 'V',   // Valparaíso
            'LI' => 'VI',  // O'Higgins
            'ML' => 'VII', // Maule
            'BI' => 'VIII', // Biobío
            'AR' => 'IX',  // Araucanía
            'LL' => 'X',   // Los Lagos
            'AI' => 'XI',  // Aysén
            'MA' => 'XII', // Magallanes
            'LR' => 'XIV', // Los Ríos
            'AP' => 'XV',  // Arica y Parinacota
            'NB' => 'XVI', // Ñuble
        ];
    }

    /**
     * Create shipping zone with installation
     */
    public static function create_zone($zone_config) {
        try {
            // Create zone
            $zone = new WC_Shipping_Zone();
            $zone->set_zone_name($zone_config['name']);
            $zone->set_zone_order(isset($zone_config['order']) ? $zone_config['order'] : 0);
            $zone_id = $zone->save();

            if (!$zone_id) {
                throw new Exception("Failed to create zone: {$zone_config['name']}");
            }

            // Add locations (regions)
            if (!empty($zone_config['regions'])) {
                $locations = [];
                foreach ($zone_config['regions'] as $region_code) {
                    $locations[] = [
                        'code' => 'CL:' . $region_code,
                        'type' => 'state',
                    ];
                }
                $zone->set_locations($locations);
                $zone->save();
            }

            $result = [
                'zone_id' => $zone_id,
                'name' => $zone_config['name'],
                'methods' => []
            ];

            // Add shipping method if configured
            if (!empty($zone_config['shipping_cost'])) {
                $shipping_instance = self::add_shipping_method($zone, 'Envío', $zone_config['shipping_cost']);
                $result['methods']['shipping'] = $shipping_instance;
            }

            // Add installation method if configured
            if (!empty($zone_config['installation_cost'])) {
                $install_instance = self::add_shipping_method($zone, 'Instalación Profesional', $zone_config['installation_cost']);
                $result['methods']['installation'] = $install_instance;
            }

            return [
                'success' => true,
                'data' => $result
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Add flat rate shipping method to zone
     */
    private static function add_shipping_method($zone, $title, $cost) {
        $instance_id = $zone->add_shipping_method('flat_rate');

        if ($instance_id) {
            $settings = [
                'title' => $title,
                'cost' => $cost,
                'tax_status' => 'none',
            ];

            update_option(
                'woocommerce_flat_rate_' . $instance_id . '_settings',
                $settings
            );

            return [
                'instance_id' => $instance_id,
                'title' => $title,
                'cost' => $cost
            ];
        }

        return null;
    }

    /**
     * Delete shipping zone
     */
    public static function delete_zone($zone_id) {
        try {
            $zone = new WC_Shipping_Zone($zone_id);
            $zone->delete();
            return ['success' => true];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Get all shipping zones
     */
    public static function get_zones() {
        $zones = WC_Shipping_Zones::get_zones();
        $formatted_zones = [];

        foreach ($zones as $zone) {
            $zone_obj = new WC_Shipping_Zone($zone['id']);
            $zone_locations = $zone_obj->get_zone_locations();
            $shipping_methods = $zone_obj->get_shipping_methods();

            $zone_info = [
                'id' => $zone['id'],
                'name' => $zone['zone_name'],
                'regions' => [],
                'shipping_methods' => [],
                'installation_cost' => null,
                'shipping_cost' => null
            ];

            // Extract locations
            $region_map = self::get_wc_to_chile_region_map();
            foreach ($zone_locations as $location) {
                if ($location->type === 'state') {
                    $parts = explode(':', $location->code);
                    if (count($parts) === 2 && $parts[0] === 'CL') {
                        $wc_code = $parts[1];
                        // Convert WooCommerce code to Chilean code
                        $chile_code = isset($region_map[$wc_code]) ? $region_map[$wc_code] : $wc_code;
                        $zone_info['regions'][] = $chile_code;
                    }
                }
            }

            // Extract shipping methods
            foreach ($shipping_methods as $method) {
                if ($method->enabled === 'yes' && $method->id === 'flat_rate') {
                    $settings = $method->instance_settings;
                    $cost = isset($settings['cost']) ? floatval($settings['cost']) : 0;

                    $method_data = [
                        'instance_id' => $method->instance_id,
                        'title' => $method->title,
                        'cost' => $cost
                    ];

                    $zone_info['shipping_methods'][] = $method_data;

                    // Detect installation vs shipping
                    $title_lower = strtolower($method->title);
                    if (strpos($title_lower, 'instalacion') !== false ||
                        strpos($title_lower, 'instalación') !== false) {
                        $zone_info['installation_cost'] = $cost;
                    } else {
                        $zone_info['shipping_cost'] = $cost;
                    }
                }
            }

            $formatted_zones[] = $zone_info;
        }

        return $formatted_zones;
    }

    /**
     * Bulk create zones from configuration array
     */
    public static function bulk_create_zones($zones_config) {
        $results = [];
        $errors = [];

        foreach ($zones_config as $zone_config) {
            $result = self::create_zone($zone_config);

            if ($result['success']) {
                $results[] = $result['data'];
            } else {
                $errors[] = [
                    'zone' => $zone_config['name'],
                    'error' => $result['error']
                ];
            }
        }

        return [
            'success' => empty($errors),
            'zones_created' => count($results),
            'zones' => $results,
            'errors' => $errors
        ];
    }

    /**
     * Delete all shipping zones
     */
    public static function delete_all_zones() {
        $zones = WC_Shipping_Zones::get_zones();
        $deleted = 0;

        foreach ($zones as $zone) {
            $result = self::delete_zone($zone['id']);
            if ($result['success']) {
                $deleted++;
            }
        }

        return [
            'success' => true,
            'deleted' => $deleted
        ];
    }
}
