<?php
/**
 * REST API Endpoints for Demosle Pay
 *
 * @package Demosle_Pay
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Demosle_Pay_API {

    /**
     * Register REST API routes
     */
    public static function register_routes() {
        // Get bank transfer details
        register_rest_route('demosle-pay/v1', '/bank-details', [
            'methods' => 'GET',
            'callback' => [__CLASS__, 'get_bank_details'],
            'permission_callback' => '__return_true'
        ]);
    }

    /**
     * Get bank transfer details
     */
    public static function get_bank_details($request) {
        $settings = get_option('demosle_pay_settings', []);

        // Ensure all fields exist
        $defaults = [
            'bank_name' => 'Banco de Chile',
            'account_type' => 'Cuenta Corriente',
            'account_number' => '',
            'account_holder' => '',
            'rut' => '',
            'email' => get_option('admin_email'),
            'phone' => '',
            'instructions' => 'Por favor realiza la transferencia bancaria y envíanos el comprobante indicando tu número de pedido.',
        ];

        $details = wp_parse_args($settings, $defaults);

        $response = rest_ensure_response([
            'success' => true,
            'bank_details' => $details
        ]);

        // Add CORS headers
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Content-Type');

        return $response;
    }
}
