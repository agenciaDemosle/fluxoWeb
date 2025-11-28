<?php
/**
 * REST API Endpoints
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_API_Endpoints {

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        // Get shipping zones with installation costs
        register_rest_route('csi/v1', '/shipping-zones', [
            'methods' => 'GET',
            'callback' => [__CLASS__, 'get_shipping_zones'],
            'permission_callback' => '__return_true'
        ]);

        // Get regions and communes
        register_rest_route('csi/v1', '/regions', [
            'methods' => 'GET',
            'callback' => [__CLASS__, 'get_regions'],
            'permission_callback' => '__return_true'
        ]);

        // Get bank transfer details
        register_rest_route('csi/v1', '/bank-details', [
            'methods' => 'GET',
            'callback' => [__CLASS__, 'get_bank_details'],
            'permission_callback' => '__return_true'
        ]);

        // Create zones (admin only)
        register_rest_route('csi/v1', '/create-zones', [
            'methods' => 'POST',
            'callback' => [__CLASS__, 'create_zones'],
            'permission_callback' => [__CLASS__, 'check_admin_permission']
        ]);

        // Delete all zones (admin only)
        register_rest_route('csi/v1', '/delete-zones', [
            'methods' => 'DELETE',
            'callback' => [__CLASS__, 'delete_zones'],
            'permission_callback' => [__CLASS__, 'check_admin_permission']
        ]);
    }

    /**
     * Get shipping zones with installation costs
     */
    public static function get_shipping_zones($request) {
        $regions = CSI_Regions_Data::get_regions();
        $zones = CSI_Zone_Creator::get_zones();

        return rest_ensure_response([
            'success' => true,
            'regions' => $regions,
            'shipping_zones' => $zones
        ]);
    }

    /**
     * Get regions and communes
     */
    public static function get_regions($request) {
        $regions = CSI_Regions_Data::get_regions();

        return rest_ensure_response([
            'success' => true,
            'regions' => $regions
        ]);
    }

    /**
     * Get bank transfer details
     */
    public static function get_bank_details($request) {
        // Get BACS settings from WooCommerce
        $bacs_settings = get_option('woocommerce_bacs_settings', []);
        $bacs_accounts = get_option('woocommerce_bacs_accounts', []);

        // Default bank details if not configured
        $default_details = [
            'bank_name' => 'Banco de Chile',
            'account_type' => 'Cuenta Corriente',
            'account_number' => '12345678-9',
            'rut' => '76.XXX.XXX-X',
            'account_holder' => 'Fluxo SpA',
            'email' => 'pagos@fluxo.cl',
            'phone' => '+56912345678',
            'instructions' => 'Por favor realiza la transferencia y envíanos el comprobante por WhatsApp o email indicando tu número de pedido.'
        ];

        // If WooCommerce has configured accounts, use the first one
        if (!empty($bacs_accounts) && is_array($bacs_accounts)) {
            $first_account = reset($bacs_accounts);
            $details = [
                'bank_name' => $first_account['bank_name'] ?? $default_details['bank_name'],
                'account_type' => $first_account['account_type'] ?? $default_details['account_type'],
                'account_number' => $first_account['account_number'] ?? $default_details['account_number'],
                'rut' => $first_account['rut'] ?? $default_details['rut'],
                'account_holder' => $first_account['account_name'] ?? $default_details['account_holder'],
                'email' => get_option('admin_email', $default_details['email']),
                'phone' => get_option('woocommerce_store_phone', $default_details['phone']),
                'instructions' => $bacs_settings['instructions'] ?? $default_details['instructions']
            ];
        } else {
            $details = $default_details;
        }

        return rest_ensure_response([
            'success' => true,
            'bank_details' => $details
        ]);
    }

    /**
     * Create shipping zones
     */
    public static function create_zones($request) {
        $zones_config = $request->get_json_params();

        if (empty($zones_config)) {
            return new WP_Error(
                'invalid_data',
                'No zones configuration provided',
                ['status' => 400]
            );
        }

        $result = CSI_Zone_Creator::bulk_create_zones($zones_config);

        return rest_ensure_response($result);
    }

    /**
     * Delete all zones
     */
    public static function delete_zones($request) {
        $result = CSI_Zone_Creator::delete_all_zones();
        return rest_ensure_response($result);
    }

    /**
     * Check if user has admin permission
     */
    public static function check_admin_permission() {
        return current_user_can('manage_woocommerce');
    }
}
