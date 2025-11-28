<?php
/**
 * Settings Page
 *
 * @package Fluxo_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class Fluxo_Installation_Settings {

    /**
     * Render settings page
     */
    public static function render() {
        // Handle form submission
        if (isset($_POST['fluxo_save_costs']) && check_admin_referer('fluxo_installation_costs')) {
            self::save_costs();
        }

        $costs = get_option('fluxo_installation_costs', []);
        $regions = Fluxo_Installation_Regions::get_regions();

        ?>
        <div class="wrap">
            <h1>❄️ Fluxo - Costos de Instalación</h1>
            <p class="description">
                Configura los costos de instalación de aires acondicionados por región de Chile.
            </p>

            <div class="notice notice-info">
                <p><strong>💡 Tip:</strong> Los costos se aplicarán automáticamente en el checkout cuando el cliente seleccione su región.</p>
            </div>

            <!-- Installation Costs Form -->
            <div class="card" style="max-width: 900px; margin: 20px 0;">
                <h2>Costos por Región</h2>
                <p>Define el costo de instalación para cada región de Chile (deja en 0 si no ofreces instalación en esa región).</p>

                <form method="post" action="">
                    <?php wp_nonce_field('fluxo_installation_costs'); ?>

                    <table class="form-table">
                        <?php foreach ($regions as $region): ?>
                            <?php
                            $code = $region['code'];
                            $current_cost = isset($costs[$code]) ? $costs[$code] : 0;
                            ?>
                            <tr>
                                <th scope="row">
                                    <label for="cost_<?php echo esc_attr($code); ?>">
                                        <?php echo esc_html($region['name']); ?>
                                        <span style="color: #999; font-weight: normal;">(<?php echo esc_html($code); ?>)</span>
                                    </label>
                                </th>
                                <td>
                                    $<input
                                        type="number"
                                        id="cost_<?php echo esc_attr($code); ?>"
                                        name="costs[<?php echo esc_attr($code); ?>]"
                                        value="<?php echo esc_attr($current_cost); ?>"
                                        min="0"
                                        step="1000"
                                        style="width: 150px;"
                                        required
                                    >
                                    <p class="description">Costo de instalación en <?php echo esc_html($region['name']); ?></p>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </table>

                    <p class="submit">
                        <button type="submit" name="fluxo_save_costs" class="button button-primary button-large">
                            💾 Guardar Costos de Instalación
                        </button>
                    </p>
                </form>
            </div>

            <!-- API Info -->
            <div class="card" style="max-width: 900px; margin: 20px 0;">
                <h2>📡 API Endpoint</h2>
                <p>Los costos están disponibles mediante REST API:</p>
                <code style="display: block; padding: 10px; background: #f5f5f5; border-radius: 4px; margin: 10px 0;">
                    GET <?php echo esc_html(rest_url('fluxo/v1/installation-costs')); ?>
                </code>
                <p class="description">Este endpoint devuelve todos los costos de instalación por región en formato JSON.</p>
            </div>

            <!-- Branding -->
            <div style="margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; max-width: 900px;">
                <h3 style="margin: 0 0 10px 0; color: white;">🚀 Desarrollado por Demosle</h3>
                <p style="margin: 0; opacity: 0.9;">
                    ¿Necesitas optimizar tus campañas digitales o desarrollar soluciones personalizadas?
                    <a href="https://demosle.cl" target="_blank" style="color: white; text-decoration: underline; font-weight: bold;">Contáctanos</a>
                </p>
            </div>
        </div>
        <?php
    }

    /**
     * Save costs
     */
    private static function save_costs() {
        if (!isset($_POST['costs']) || !is_array($_POST['costs'])) {
            echo '<div class="notice notice-error is-dismissible"><p>Error: No se recibieron datos de costos.</p></div>';
            return;
        }

        $costs = [];
        foreach ($_POST['costs'] as $code => $cost) {
            $costs[sanitize_text_field($code)] = floatval($cost);
        }

        update_option('fluxo_installation_costs', $costs);

        echo '<div class="notice notice-success is-dismissible"><p>✅ Costos de instalación guardados correctamente.</p></div>';
    }
}
