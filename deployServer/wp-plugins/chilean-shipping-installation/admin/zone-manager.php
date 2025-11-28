<?php
/**
 * Zone Manager
 *
 * @package Chilean_Shipping_Installation
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CSI_Zone_Manager {

    /**
     * Render zone management page
     */
    public static function render() {
        $zones = CSI_Zone_Creator::get_zones();

        ?>
        <div class="wrap">
            <h1>Gestión de Zonas</h1>
            <p class="description">Administra las zonas de envío e instalación configuradas.</p>

            <div class="card" style="max-width: 100%;">
                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de Zona</th>
                            <th>Regiones</th>
                            <th>Métodos de Envío</th>
                            <th>Costo Envío</th>
                            <th>Costo Instalación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($zones)): ?>
                            <tr>
                                <td colspan="7" style="text-align: center; padding: 40px;">
                                    No hay zonas configuradas.
                                    <br><br>
                                    <a href="<?php echo admin_url('admin.php?page=chilean-shipping'); ?>" class="button button-primary">
                                        Configurar Zonas
                                    </a>
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($zones as $zone): ?>
                                <tr>
                                    <td><?php echo esc_html($zone['id']); ?></td>
                                    <td><strong><?php echo esc_html($zone['name']); ?></strong></td>
                                    <td><?php echo esc_html(implode(', ', $zone['regions'])); ?></td>
                                    <td><?php echo count($zone['shipping_methods']); ?> métodos</td>
                                    <td>
                                        <?php
                                        if ($zone['shipping_cost']) {
                                            echo '$' . number_format($zone['shipping_cost'], 0, ',', '.');
                                        } else {
                                            echo '<span style="color: #999;">—</span>';
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <?php
                                        if ($zone['installation_cost']) {
                                            echo '$' . number_format($zone['installation_cost'], 0, ',', '.');
                                        } else {
                                            echo '<span style="color: #999;">—</span>';
                                        }
                                        ?>
                                    </td>
                                    <td>
                                        <a href="<?php echo admin_url('admin.php?page=wc-settings&tab=shipping&zone_id=' . $zone['id']); ?>" class="button button-small">
                                            Editar
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>

            <p style="margin-top: 30px;">
                <a href="<?php echo admin_url('admin.php?page=chilean-shipping'); ?>">&larr; Volver a Configuración</a>
                &nbsp;|&nbsp;
                <a href="<?php echo admin_url('admin.php?page=wc-settings&tab=shipping'); ?>">Ver en WooCommerce &rarr;</a>
            </p>
        </div>
        <?php
    }
}
