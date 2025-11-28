<?php
/**
 * Settings Page
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_Settings_Page {

    /**
     * Render settings page
     */
    public static function render() {
        // Handle form submission
        if (isset($_POST['csi_save_settings']) && check_admin_referer('csi_settings')) {
            self::save_settings();
        }

        // Handle quick setup
        if (isset($_POST['csi_quick_setup']) && check_admin_referer('csi_quick_setup')) {
            self::quick_setup();
        }

        $settings = get_option('csi_settings', []);
        $zones = CSI_Zone_Creator::get_zones();

        ?>
        <div class="wrap">
            <h1>🇨🇱 Sistema Envíos Chile</h1>
            <p class="description">
                Gestiona zonas de envío para Chile con 340+ comunas. Plugin desarrollado por
                <a href="https://demosle.cl" target="_blank"><strong>Demosle</strong></a>
            </p>

            <div class="notice notice-info">
                <p><strong>📦 340+ comunas chilenas</strong> organizadas en 16 regiones</p>
            </p>
            </div>

            <!-- Current Zones -->
            <div class="card" style="max-width: 100%; margin: 20px 0;">
                <h2>Zonas de envío configuradas (<?php echo count($zones); ?>)</h2>

                <?php if (empty($zones)): ?>
                    <p>No hay zonas configuradas todavía.</p>
                <?php else: ?>
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th>Zona</th>
                                <th>Regiones</th>
                                <th>Costo de Envío</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($zones as $zone): ?>
                                <tr>
                                    <td><strong><?php echo esc_html($zone['name']); ?></strong></td>
                                    <td><?php echo esc_html(implode(', ', $zone['regions'])); ?></td>
                                    <td>
                                        <?php
                                        if ($zone['shipping_cost']) {
                                            echo '$' . number_format($zone['shipping_cost'], 0, ',', '.');
                                        } else {
                                            echo '<span style="color: #999;">No configurado</span>';
                                        }
                                        ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>

            <!-- Quick Setup -->
            <div class="card" style="max-width: 800px; margin: 20px 0;">
                <h2>⚡ Configuración Rápida</h2>
                <p>Define los costos de envío por zona y crea todas las zonas automáticamente.</p>

                <form method="post" action="">
                    <?php wp_nonce_field('csi_quick_setup'); ?>

                    <table class="form-table">
                        <tr>
                            <th scope="row" colspan="2">
                                <h3 style="margin: 0;">Costos de Envío por Zona</h3>
                                <p class="description">Ingresa el costo de envío para cada zona (deja en 0 para envío gratis).</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_rm">Región Metropolitana</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_rm" name="cost_rm" value="0" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">Costo de envío en RM</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_close">Regiones V y VIII</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_close" name="cost_close" value="5000" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">Valparaíso y Biobío</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_central">Regiones VI, VII, IX, XIV, X</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_central" name="cost_central" value="8000" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">O'Higgins, Maule, Araucanía, Los Ríos, Los Lagos</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_north_mid">Regiones III, IV</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_north_mid" name="cost_north_mid" value="10000" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">Atacama y Coquimbo</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_extreme">Regiones I, II, XI, XII, XV</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_extreme" name="cost_extreme" value="15000" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">Tarapacá, Antofagasta, Aysén, Magallanes, Arica y Parinacota</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="cost_nuble">Región XVI (Ñuble)</label>
                            </th>
                            <td>
                                $<input type="number" id="cost_nuble" name="cost_nuble" value="8000" min="0" step="1000" style="width: 150px;" required>
                                <p class="description">Costo de envío en Ñuble</p>
                            </td>
                        </tr>
                    </table>

                    <?php if (!empty($zones)): ?>
                        <div class="notice notice-warning inline">
                            <p>⚠️ Ya tienes zonas configuradas. Esta acción eliminará las zonas existentes y creará nuevas con los valores ingresados.</p>
                        </div>
                    <?php endif; ?>

                    <p class="submit">
                        <button type="submit" name="csi_quick_setup" class="button button-primary button-large">
                            <?php echo !empty($zones) ? 'Reconfigurar' : 'Configurar'; ?> Zonas Automáticamente
                        </button>
                    </p>
                </form>
            </div>

            <!-- Manual Configuration -->
            <div class="card" style="max-width: 800px; margin: 20px 0;">
                <h2>⚙️ Configuración Manual</h2>
                <p>Para configuración avanzada, usa las otras páginas:</p>
                <ul style="list-style: disc; margin-left: 20px;">
                    <li><a href="<?php echo admin_url('admin.php?page=chilean-shipping-import'); ?>">Importar CSV</a> - Sube una planilla con costos personalizados</li>
                    <li><a href="<?php echo admin_url('admin.php?page=chilean-shipping-zones'); ?>">Gestión de Zonas</a> - Edita zonas manualmente</li>
                    <li><a href="<?php echo admin_url('admin.php?page=wc-settings&tab=shipping'); ?>">WooCommerce Shipping</a> - Configuración avanzada de WooCommerce</li>
                </ul>
            </div>
        </div>
        <?php
    }

    /**
     * Save settings
     */
    private static function save_settings() {
        $settings = [
            'enable_installation' => isset($_POST['enable_installation']),
            'default_installation_cost' => floatval($_POST['default_installation_cost']),
            'installation_title' => sanitize_text_field($_POST['installation_title']),
        ];

        update_option('csi_settings', $settings);

        echo '<div class="notice notice-success is-dismissible"><p>Configuración guardada correctamente.</p></div>';
    }

    /**
     * Quick setup - Create zones with user-defined costs
     */
    private static function quick_setup() {
        // Get costs from form
        $cost_rm = floatval($_POST['cost_rm']);
        $cost_close = floatval($_POST['cost_close']);
        $cost_central = floatval($_POST['cost_central']);
        $cost_north_mid = floatval($_POST['cost_north_mid']);
        $cost_extreme = floatval($_POST['cost_extreme']);
        $cost_nuble = floatval($_POST['cost_nuble']);

        // Delete existing zones
        CSI_Zone_Creator::delete_all_zones();

        // Configuration with user-defined costs
        $zones_config = [
            [
                'name' => 'Región Metropolitana',
                'regions' => ['RM'],
                'shipping_cost' => $cost_rm,
                'installation_cost' => 0,
                'order' => 1
            ],
            [
                'name' => 'Regiones V y VIII',
                'regions' => ['V', 'VIII'],
                'shipping_cost' => $cost_close,
                'installation_cost' => 0,
                'order' => 2
            ],
            [
                'name' => 'Regiones VI, VII, IX, XIV, X',
                'regions' => ['VI', 'VII', 'IX', 'XIV', 'X'],
                'shipping_cost' => $cost_central,
                'installation_cost' => 0,
                'order' => 3
            ],
            [
                'name' => 'Regiones III, IV',
                'regions' => ['III', 'IV'],
                'shipping_cost' => $cost_north_mid,
                'installation_cost' => 0,
                'order' => 4
            ],
            [
                'name' => 'Regiones I, II, XI, XII, XV',
                'regions' => ['I', 'II', 'XI', 'XII', 'XV'],
                'shipping_cost' => $cost_extreme,
                'installation_cost' => 0,
                'order' => 5
            ],
            [
                'name' => 'Región XVI (Ñuble)',
                'regions' => ['XVI'],
                'shipping_cost' => $cost_nuble,
                'installation_cost' => 0,
                'order' => 6
            ],
        ];

        $result = CSI_Zone_Creator::bulk_create_zones($zones_config);

        if ($result['success']) {
            echo '<div class="notice notice-success is-dismissible"><p>✅ Zonas creadas correctamente: ' . $result['zones_created'] . ' zonas con los costos personalizados.</p></div>';
        } else {
            echo '<div class="notice notice-error is-dismissible"><p>❌ Error al crear zonas. Errores: ' . count($result['errors']) . '</p></div>';
        }
    }
}
