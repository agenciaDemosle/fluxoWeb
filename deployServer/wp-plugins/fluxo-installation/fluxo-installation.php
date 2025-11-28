<?php
/**
 * Plugin Name: Fluxo - Costos de Instalación
 * Plugin URI: https://fluxo.cl
 * Description: Gestiona los costos de instalación de aires acondicionados por región en Chile
 * Version: 1.0.0
 * Author: Demosle
 * Author URI: https://demosle.cl
 * License: GPL v2 or later
 * Text Domain: fluxo-installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('FLUXO_INSTALLATION_VERSION', '1.0.0');
define('FLUXO_INSTALLATION_PATH', plugin_dir_path(__FILE__));
define('FLUXO_INSTALLATION_URL', plugin_dir_url(__FILE__));

/**
 * Main plugin class
 */
class Fluxo_Installation {

    /**
     * Instance
     */
    private static $instance = null;

    /**
     * Get instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct() {
        $this->includes();
        $this->init_hooks();
    }

    /**
     * Include required files
     */
    private function includes() {
        require_once FLUXO_INSTALLATION_PATH . 'includes/regions-data.php';
        require_once FLUXO_INSTALLATION_PATH . 'includes/api-endpoints.php';
        require_once FLUXO_INSTALLATION_PATH . 'admin/settings-page.php';
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('rest_api_init', ['Fluxo_Installation_API', 'register_routes']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            'Instalación Fluxo',
            'Instalación Fluxo',
            'manage_woocommerce',
            'fluxo-installation',
            ['Fluxo_Installation_Settings', 'render'],
            'dashicons-admin-tools',
            56
        );
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        if ('toplevel_page_fluxo-installation' !== $hook) {
            return;
        }

        wp_enqueue_style(
            'fluxo-installation-admin',
            FLUXO_INSTALLATION_URL . 'assets/css/admin.css',
            [],
            FLUXO_INSTALLATION_VERSION
        );

        wp_enqueue_script(
            'fluxo-installation-admin',
            FLUXO_INSTALLATION_URL . 'assets/js/admin.js',
            ['jquery'],
            FLUXO_INSTALLATION_VERSION,
            true
        );
    }
}

/**
 * Initialize plugin
 */
function fluxo_installation_init() {
    return Fluxo_Installation::get_instance();
}
add_action('plugins_loaded', 'fluxo_installation_init');
