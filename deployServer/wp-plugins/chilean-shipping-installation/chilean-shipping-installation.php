<?php
/**
 * Plugin Name: Sistema Envíos Chile by Demosle
 * Plugin URI: https://demosle.cl
 * Description: Gestión completa de zonas de envío para Chile. Importa costos desde CSV y maneja 340+ comunas chilenas organizadas en 16 regiones. Ideal para ecommerce con WooCommerce.
 * Version: 1.0.0
 * Author: Demosle
 * Author URI: https://demosle.cl
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: chilean-shipping
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * WC requires at least: 5.0
 * WC tested up to: 8.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('CSI_VERSION', '1.0.0');
define('CSI_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CSI_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CSI_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class Chilean_Shipping_Manager {

    /**
     * Single instance of the class
     */
    private static $instance = null;

    /**
     * Get single instance
     */
    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        // Check if WooCommerce is active
        if (!$this->is_woocommerce_active()) {
            add_action('admin_notices', [$this, 'woocommerce_missing_notice']);
            return;
        }

        // Include required files
        $this->includes();

        // Initialize hooks
        $this->init_hooks();
    }

    /**
     * Check if WooCommerce is active
     */
    private function is_woocommerce_active() {
        return in_array(
            'woocommerce/woocommerce.php',
            apply_filters('active_plugins', get_option('active_plugins'))
        );
    }

    /**
     * WooCommerce missing notice
     */
    public function woocommerce_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p>
                <strong>Chilean Shipping & Installation Manager</strong> requiere que WooCommerce esté instalado y activado.
            </p>
        </div>
        <?php
    }

    /**
     * Include required files
     */
    private function includes() {
        // Core includes
        require_once CSI_PLUGIN_DIR . 'includes/regions-data.php';
        require_once CSI_PLUGIN_DIR . 'includes/zone-creator.php';
        require_once CSI_PLUGIN_DIR . 'includes/api-endpoints.php';

        // Admin includes
        if (is_admin()) {
            require_once CSI_PLUGIN_DIR . 'admin/settings-page.php';
            require_once CSI_PLUGIN_DIR . 'admin/csv-importer.php';
            require_once CSI_PLUGIN_DIR . 'admin/zone-manager.php';
        }
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        // Declare WooCommerce feature compatibility
        add_action('before_woocommerce_init', [$this, 'declare_compatibility']);

        // Admin menu
        add_action('admin_menu', [$this, 'add_admin_menu']);

        // Enqueue scripts
        add_action('admin_enqueue_scripts', [$this, 'admin_scripts']);

        // REST API
        add_action('rest_api_init', 'CSI_API_Endpoints::register_routes');
    }

    /**
     * Plugin activation
     */
    public function activate() {
        // Create default options
        if (!get_option('csi_settings')) {
            add_option('csi_settings', [
                'enable_installation' => false,
                'default_installation_cost' => 0,
                'installation_title' => 'Instalación Profesional',
            ]);
        }

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Declare WooCommerce feature compatibility
     */
    public function declare_compatibility() {
        if (class_exists('\Automattic\WooCommerce\Utilities\FeaturesUtil')) {
            \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility(
                'custom_order_tables',
                __FILE__,
                true
            );
        }
    }

    /**
     * Plugin deactivation
     */
    public function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Envíos e Instalación Chile',
            'Envíos Chile',
            'manage_woocommerce',
            'chilean-shipping',
            'CSI_Settings_Page::render',
            'dashicons-location-alt',
            56
        );

        add_submenu_page(
            'chilean-shipping',
            'Importar Costos',
            'Importar CSV',
            'manage_woocommerce',
            'chilean-shipping-import',
            'CSI_CSV_Importer::render'
        );

        add_submenu_page(
            'chilean-shipping',
            'Gestión de Zonas',
            'Gestión Zonas',
            'manage_woocommerce',
            'chilean-shipping-zones',
            'CSI_Zone_Manager::render'
        );
    }

    /**
     * Enqueue admin scripts
     */
    public function admin_scripts($hook) {
        // Only load on our plugin pages
        if (strpos($hook, 'chilean-shipping') === false) {
            return;
        }

        wp_enqueue_style(
            'csi-admin-style',
            CSI_PLUGIN_URL . 'assets/css/admin.css',
            [],
            CSI_VERSION
        );

        wp_enqueue_script(
            'csi-admin-script',
            CSI_PLUGIN_URL . 'assets/js/admin.js',
            ['jquery'],
            CSI_VERSION,
            true
        );

        wp_localize_script('csi-admin-script', 'csiData', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('csi_nonce'),
        ]);
    }
}

/**
 * Initialize the plugin
 */
function csi_init() {
    return Chilean_Shipping_Manager::get_instance();
}

// Start the plugin
add_action('plugins_loaded', 'csi_init');
