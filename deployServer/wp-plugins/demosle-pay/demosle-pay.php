<?php
/**
 * Plugin Name: Demosle Pay
 * Plugin URI: https://demosle.cl
 * Description: Plugin simple para configurar datos bancarios chilenos y exponerlos vía API REST
 * Version: 1.0.0
 * Author: Demosle
 * Author URI: https://demosle.cl
 * Text Domain: demosle-pay
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('DEMOSLE_PAY_VERSION', '1.0.0');
define('DEMOSLE_PAY_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DEMOSLE_PAY_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once DEMOSLE_PAY_PLUGIN_DIR . 'includes/api-endpoints.php';
require_once DEMOSLE_PAY_PLUGIN_DIR . 'admin/settings-page.php';

/**
 * Initialize the plugin
 */
function demosle_pay_init() {
    // Register REST API routes
    add_action('rest_api_init', ['Demosle_Pay_API', 'register_routes']);

    // Add admin menu
    if (is_admin()) {
        add_action('admin_menu', ['Demosle_Pay_Admin', 'add_menu']);
        add_action('admin_init', ['Demosle_Pay_Admin', 'register_settings']);
    }
}
add_action('plugins_loaded', 'demosle_pay_init');

/**
 * Activation hook
 */
function demosle_pay_activate() {
    // Set default values
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

    add_option('demosle_pay_settings', $defaults);
}
register_activation_hook(__FILE__, 'demosle_pay_activate');

/**
 * Deactivation hook
 */
function demosle_pay_deactivate() {
    // Nothing to do on deactivation
}
register_deactivation_hook(__FILE__, 'demosle_pay_deactivate');
