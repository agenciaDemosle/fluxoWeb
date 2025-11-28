<?php
/**
 * REST API Endpoints
 *
 * @package Fluxo_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Fluxo_Installation_API {

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        // Get installation costs
        register_rest_route('fluxo/v1', '/installation-costs', [
            'methods' => 'GET',
            'callback' => [__CLASS__, 'get_installation_costs'],
            'permission_callback' => '__return_true'
        ]);

        // Update installation costs (admin only)
        register_rest_route('fluxo/v1', '/installation-costs', [
            'methods' => 'POST',
            'callback' => [__CLASS__, 'update_installation_costs'],
            'permission_callback' => [__CLASS__, 'check_admin_permission']
        ]);
    }

    /**
     * Get installation costs
     */
    public static function get_installation_costs($request) {
        $costs = get_option('fluxo_installation_costs', []);
        $regions = Fluxo_Installation_Regions::get_regions();

        $response = [
            'success' => true,
            'costs' => []
        ];

        // Build costs array with region info
        foreach ($regions as $region) {
            $code = $region['code'];
            $cost = isset($costs[$code]) ? floatval($costs[$code]) : 0;

            $response['costs'][$code] = [
                'region_code' => $code,
                'region_name' => $region['name'],
                'installation_cost' => $cost
            ];
        }

        return rest_ensure_response($response);
    }

    /**
     * Update installation costs
     */
    public static function update_installation_costs($request) {
        $costs = $request->get_json_params();

        if (empty($costs)) {
            return new WP_Error(
                'invalid_data',
                'No costs data provided',
                ['status' => 400]
            );
        }

        update_option('fluxo_installation_costs', $costs);

        return rest_ensure_response([
            'success' => true,
            'message' => 'Installation costs updated successfully'
        ]);
    }

    /**
     * Check if user has admin permission
     */
    public static function check_admin_permission() {
        return current_user_can('manage_woocommerce');
    }
}
